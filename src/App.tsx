import React, { useCallback, useRef, useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "../src/utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import { ColorRing } from "react-loader-spinner";
import { useIntersectionObserver } from "./hooks/InfiniteScroll";

function App() {
  const [loading, setLoading] = useState(true);
  const [nextLoading, setNextLoading] = useState(true);
  let [pokemonData, setPokemonData] = useState<string[]>([]);
  let [japanesePokemonData, setjapanesePokemonData] = useState<string[]>([]);
  const [showModalFlag, setShowModalFlag] = useState(false); // Modalコンポーネントの表示の状態を定義する
  const [pressNumber, setPressNumber] = useState(0);
  const [intersected, setIntersected] = useState<boolean>(true);

  const initialURL = "https://pokeapi.co/api/v2/pokemon?_limit=20";
  const target = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const intersection = useIntersectionObserver(target);

  useEffect(() => {
    //すべてのポケモンデータを取得
    const fetchPokemonData = async () => {
      let res: any = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  //各ポケモンの詳細なデータを取得
  const loadPokemon = async (data: any) => {
    //Promise.all(): 「すべてのタスクが完了したら」
    let _pokemonData: any = await Promise.all(
      data.map((pokemon: any) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    let _japanesePokemonData: any = await Promise.all(
      _pokemonData.map((pokemon: any) => {
        let pokemonRecord = getPokemon(pokemon.species.url);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
    setjapanesePokemonData(_japanesePokemonData);
  };

  const loadNextPokemon = async (data: any) => {
    let _pokemonData: any = await Promise.all(
      data.map((pokemon: any) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    let _japanesePokemonData: any = await Promise.all(
      _pokemonData.map((pokemon: any) => {
        let pokemonRecord = getPokemon(pokemon.species.url);
        return pokemonRecord;
      })
    );
  
    setPokemonData([...pokemonData, ..._pokemonData]);
    setjapanesePokemonData([...japanesePokemonData, ..._japanesePokemonData]);

  }

  //次のページに遷移
  const handleNextData = useCallback(async () => {
  let nextURL = "https://pokeapi.co/api/v2/pokemon?offset=" + pokemonData.length + "&limit=20";

    setNextLoading(true);
    let data: any = await getAllPokemon(nextURL);
    await loadNextPokemon(data.results);
    setNextLoading(false);
  }, [pokemonData]);

  useEffect(() => {
    setIntersected(intersection);
  }, [intersection]);

  useEffect(() => {
    if (intersected) {
      handleNextData();
    pokemonData = Array.from(new Set(pokemonData))
    }
  }, [intersected]);

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
            <div ref={target} style={{ width: 200, height: 200 }}></div>
            {nextLoading ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : ""}
          </>
        )}
      </div>
    </>
  );
}

export default App;
