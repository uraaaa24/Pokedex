import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "../src/utils/pokemon.js";
// @ts-expect-error TS(6142): Module './components/Card/Card.js' was resolved to... Remove this comment to see the full error message
import Card from "./components/Card/Card.js";
// @ts-expect-error TS(6142): Module './components/Navbar/Navbar.js' was resolve... Remove this comment to see the full error message
import Navbar from "./components/Navbar/Navbar.js";
// @ts-expect-error TS(6142): Module './components/Modal/Modal' was resolved to ... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      loadPokemon(res.results);
      // console.log(res);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      setNextURL(res.next);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      setPrevURL(res.previous); //null
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  //各ポケモンの詳細なデータを取得
  const loadPokemon = async (data: any) => {
    //Promise.all(): 「すべてのタスクが完了したら」
    let _pokemonData = await Promise.all(
      data.map((pokemon: any) => {
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
    // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
    setPokemonData(_pokemonData);
    // @ts-expect-error TS(2345): Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
    setjapanesePokemonData(_japanesePokemonData);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    await loadPokemon(data.results);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    setNextURL(data.next);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;

    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    await loadPokemon(data.results);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    setNextURL(data.next);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Navbar />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="App">
        {loading ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Modal
              showFlag={showModalFlag}
              setShowModalFlag={setShowModalFlag}
              showModalFlag={showModalFlag}
              pokemon={pokemonData[pressNumber]}
              japanesePokemonData={japanesePokemonData[pressNumber]}
              pressNumber={pressNumber}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="pokemonCardConteainer">
              {pokemonData.map((pokemon, i) => {
                return (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div key={i}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="btn">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button onClick={handlePrevPage}>前へ</button>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
