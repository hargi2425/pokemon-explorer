"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonHome() {
  const [pokemons, setPokemons] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => res.json())
      .then(async (data) => {
        const pokemonsArray = data.results;

        const results = await Promise.allSettled(
            pokemonsArray.map(async(pokemon,index) => {
                const res = await fetch(pokemon.url);
                const details = await res.json();
                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    image:details.sprites.other["official-artwork"].front_default || details.sprites.front_default,
                    id: index + 1
                };
            })
        )

        const pokemonWithImages = results.map((result, index) => result.status === "fulfilled" ? result.value : 
            {
                name: pokemonsArray[index].name,
                url: pokemonsArray[index].url,
                image: "/placeholder.png",
            }
        );
        setPokemons(pokemonWithImages);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon:", error)
      });
  }, []);

  const filterPokemeons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchData.toLowerCase()));
  
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Pokemon Explorer</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {filterPokemeons.map((pokemon, index) => (
          <Link key={index} href={`/pokemon/${pokemon.id}`}>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-52 h-52 mx-auto"
              />
              <h3 className="text-xl font-semibold capitalize text-center mt-4">{pokemon.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

}
