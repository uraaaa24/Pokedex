import React from "react";
import "./Modal.css";

const Modal = (props: any) => {
  //ポケモンのタイプを日本語化
  const japaneseType:{ [key: string]: [string, string] } = {
    normal: ["ノーマル", "#aea886"],
    fire: ["ほのお", "#f45c19"],
    water: ["みず", "#4a96d6"],
    electric: ["でんき", "#eaa317"],
    grass: ["くさ", "#28b25c"],
    ice: ["こおり", "#808080"],
    fighting: ["かくとう", "#9a3d3e"],
    poison: ["どく", "#8f5b98"],
    ground: ["じめん", "#916d3c"],
    flying: ["ひこう", "#7e9ecf"],
    psychic: ["エスパー", "#d56d8b"],
    bug: ["むし", "#989001"],
    rock: ["いわ", "#878052"],
    ghost: ["ゴースト", "#555fa4"],
    dragon: ["ドラゴン", "#454ba6"],
    dark: ["あく", "#7a0049"],
    steel: ["はがね", "#9b9b9b"],
    fairy: ["フェアリー", "#ffbbff"],
  };

  //モーダルを閉じる
  const closeModal = () => {
    props.setShowModalFlag(false);
  };

  let flavorTexts = [];
  if (props.showFlag) {
    flavorTexts = props.japanesePokemonData.flavor_text_entries.filter(
      (data: any) => {
        return data.language.name === "ja";
      }
    );
  }

  return <>
    {props.showFlag ? (
      <div className="overlay">
        <div className="modalContent">
          <div className="modalInfo">
            <button className="modalClose" onClick={closeModal} />
            <p className="pokemonIndex">No.{props.pokemon.id}</p>
            <h3>{props.japanesePokemonData.names[0].name}</h3>
            <p>{props.japanesePokemonData.genera[0].genus}</p>
            <p className="pokemonType">
              {props.pokemon.types.map((type: any, i: any) => {
                return (
                  <span key={i} style={{ backgroundColor: japaneseType[type.type.name][1] }}>
                    {japaneseType[type.type.name][0]}{" "}
                  </span>
                );
              })}
            </p>
            <p>
              高さ：{props.pokemon.height / 10}m　重さ：
              {(props.pokemon.weight / 10).toFixed(1)}kg
            </p>
            <div className="pokemonExplanation">
              <p>{flavorTexts[0].flavor_text}</p>
            </div>
          </div>
          <div className="modalImg">
            <img
              src={
                props.pokemon.sprites.other["official-artwork"].front_default
              }
              alt=""
            />
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
  </>;
};

export default Modal;
