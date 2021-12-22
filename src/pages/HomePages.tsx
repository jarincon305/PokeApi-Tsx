import React, { useState } from "react";
import { Loading } from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";

export const HomePages = () => {
  const { isLoading, pokemons } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filterdPokemons = (): Pokemon[] => {
    if (search.length === 0) {
      return pokemons.slice(currentPage, currentPage + 5);
    }
    // si hay algo en la caja de texto
    const filtered = pokemons.filter((poke) => poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (
      pokemons.filter((poke) => poke.name.includes(search)).length >
      currentPage + 5
    )
      setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div className="mt-5">
      <h2>Listado</h2>
      <hr />
      <input
        type="text"
        className="mb-2 form-control"
        placeholder="Buscar pókemon"
        value={search}
        onChange={onSearchChange}
      />
      <button className="btn btn-primary" onClick={prevPage}>
        Anteriores
      </button>
      &nbsp;
      <button className="btn btn-primary" onClick={nextPage}>
        Siguientes
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {filterdPokemons().map(({ id, name, pic }) => (
            <tr key={id}>
              <td style={{ width: 100 }}>{id}</td>
              <td style={{ width: 150 }}>{name}</td>
              <td>
                <img src={pic} alt={name} style={{ height: 75 }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <Loading />}
    </div>
  );
};
