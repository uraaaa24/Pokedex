import React from "react";
import "./Modal.css";

const Modal = (props: any) => {
  //ポケモンのタイプを日本語化
  const japaneseType = {
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

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    {props.showFlag ? (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="overlay">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="modalContent">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="modalInfo">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className="modalClose" onClick={closeModal} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className="pokemonIndex">No.{props.pokemon.id}</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <h3>{props.japanesePokemonData.names[0].name}</h3>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>{props.japanesePokemonData.genera[0].genus}</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className="pokemonType">
              {props.pokemon.types.map((type: any, i: any) => {
                return (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <span key={i} style={{backgroundColor: japaneseType[type.type.name][1]}}>
                    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    {japaneseType[type.type.name][0]}{" "}
                  </span>
                );
              })}
            </p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>
              高さ：{props.pokemon.height / 10}m　重さ：
              {(props.pokemon.weight / 10).toFixed(1)}kg
            </p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="pokemonExplanation">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p>{flavorTexts[0].flavor_text}</p>
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="modalImg">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <></>
    )}
  </>;
};

export default Modal;
