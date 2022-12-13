import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "../src/utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";
import Modal from "./components/Modal/Modal";
import { ColorRing } from "react-loader-spinner";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon?limit=21";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [japanesePokemonData, setjapanesePokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [showModalFlag, setShowModalFlag] = useState(false); // Modalコンポーネントの表示の状態を定義する
  const [pressNumber, setPressNumber] = useState(0);

  useEffect(() => {
    //すべてのポケモンデータを取得
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous); //null
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  //各ポケモンの詳細なデータを取得
  const loadPokemon = async (data) => {
    //Promise.all(): 「すべてのタスクが完了したら」
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    let _japanesePokemonData = await Promise.all(
      _pokemonData.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.species.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
    setjapanesePokemonData(_japanesePokemonData);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;

    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          <>
            <Modal
              showFlag={showModalFlag}
              setShowModalFlag={setShowModalFlag}
              showModalFlag={showModalFlag}
              pokemon={pokemonData[pressNumber]}
              japanesePokemonData={japanesePokemonData[pressNumber]}
              pressNumber={pressNumber}
            />
            <div className="pokemonCardConteainer">
              {pokemonData.map((pokemon, i) => {
                return (
                  <div key={i}>
                    <Card
                      index={i}
                      setShowModalFlag={setShowModalFlag}
                      setPressNumber={setPressNumber}
                      showModalFlag={showModalFlag}
                      japanesePokemonData={japanesePokemonData[i]}
                      pokemon={pokemon}
                      pressNumber={pressNumber}
                    />
                  </div>
                );
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
