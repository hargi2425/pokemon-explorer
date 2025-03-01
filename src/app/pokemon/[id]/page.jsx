"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PokemonDetail() {
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (!params || !params.id) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon details:", error)
      });
  }, [params]);

  if (!params || !params.id) {
    return <p className="text-center mt-10">Loading route parameters...</p>;
  }

  if (!pokemon) {
    return <p className="text-center mt-10">Loading Pokemon details...</p>;
  }
  

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center capitalize">{pokemon.name}</h1>

        <div className="flex justify-center my-4">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default || "/placeholder.png"}
            alt={pokemon.name}
            className="w-64 h-64 object-contain"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-lg">
          <div>
            <h2 className="font-semibold">Pokemon ID:</h2>
            <p>#{pokemon.id}</p>
          </div>
          <div>
            <h2 className="font-semibold">Height:</h2>
            <p>{pokemon.height / 10} m</p>
          </div>
          <div>
            <h2 className="font-semibold">Weight:</h2>
            <p>{pokemon.weight / 10} kg</p>
          </div>
          <div>
            <h2 className="font-semibold">Base Experience:</h2>
            <p>{pokemon.base_experience}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Types</h2>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm capitalize"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Abilities</h2>
          <ul className="list-disc pl-5 mt-2">
            {pokemon.abilities.map((abilityObj) => (
              <li key={abilityObj.ability.name} className="capitalize">{abilityObj.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Base Stats</h2>
          <div className="space-y-2 mt-2">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex justify-between items-center">
                <span className="capitalize">{stat.stat.name}</span>
                <div className="bg-gray-200 h-4 w-40 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: `${stat.base_stat}%` }}
                  ></div>
                </div>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Moves</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {pokemon.moves.slice(0, 10).map((move) => (
              <span
                key={move.move.name}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                {move.move.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
