import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Pokemon, getAll, getByName } from "./API";

import "./styles.css";

const calculatePower = (pokemon) =>
  pokemon.hp +
  pokemon.attack +
  pokemon.defense +
  pokemon.special_attack +
  pokemon.special_defense +
  pokemon.speed;

let tableRender = 0;
const PokemonTable = ({ pokemon }) => {
  console.log(`tableRender = ${tableRender++}`);
  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Image</td>
          <td>Name</td>
          <td>Power</td>
        </tr>
      </thead>
      <tbody>
        {pokemon.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              />
            </td>
            <td>{p.name}</td>
            <td>{p.power}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MemoedPokemonTable = React.memo(PokemonTable);

let appRender = 0;
export default function PocketMon() {
  const [pokemon, setPokemon] = useState([]);
  const [threshold, setThreshold] = useState(0);
  const [search, setSearch] = useState("");
  const [dummy, setDummy] = useState("");
  const onSetSearch = useCallback((evt) => setSearch(evt.target.value), []);

  useEffect(() => {
    getByName(search).then(setPokemon);
  }, [search]);

  console.time("render");
  const pokemonWithPower = useMemo(
    () =>
      pokemon
        .map((p) => ({
          ...p,
          power: calculatePower(p),
        }))
        .filter((p) => p.power >= threshold),
    [pokemon, threshold]
  );
  const onSetThreshold = useCallback(
    (evt) => setThreshold(parseInt(evt.target.value, 10)),
    []
  );

  const countOverThreshold = useMemo(
    () => pokemonWithPower.filter((p) => p.power > threshold).length,
    [pokemonWithPower, threshold]
  );

  const min = useMemo(
    () => Math.min(...pokemonWithPower.map((p) => p.power)),
    [pokemonWithPower]
  );
  const max = useMemo(
    () => Math.max(...pokemonWithPower.map((p) => p.power)),
    [pokemonWithPower]
  );

  console.timeEnd("render");

  return (
    <div>
      <div className='top-bar'>
        <div>Search</div>
        <input type='text' value={search} onChange={onSetSearch}></input>
        <div>Power threshold</div>
        <input
          type='text'
          value={threshold || 0}
          onChange={onSetThreshold}
        ></input>
        <input
          type='text'
          value={dummy}
          onChange={(e) => setDummy(e.target.value)}
        />
        <div>Count over threshold: {countOverThreshold}</div>
      </div>
      <div className='two-column'>
        <MemoedPokemonTable pokemon={pokemonWithPower} />
        <div>
          <div>Min: {min}</div>
          <div>Max: {max}</div>
        </div>
      </div>
    </div>
  );
}
