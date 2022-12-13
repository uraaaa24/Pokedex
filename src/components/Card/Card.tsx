import React from "react";
import "./Card.css";

const Card = (props: any) => {
  //モーダルを表示する
  const showModal = () => {
    props.setShowModalFlag(true);
    props.setPressNumber(props.index);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <button className="card" onClick={showModal}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="cardImg">
          {props.pokemon.sprites.other['official-artwork'].front_default ? 
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={props.pokemon.sprites.other['official-artwork'].front_default} alt="" /> :
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={props.pokemon.sprites.front_default} alt="" />
          }
          </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <h3 className="cardName">{props.japanesePokemonData.names[0].name}</h3>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="cardData">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p>{props.japanesePokemonData.genera[0].genus}</p>
        </div>
        {/* <div className="cardTypes">
          <div>タイプ</div>
          {props.pokemon.types.map((type, i) => {
            return (
              <div key={i}>
                <span className="typeName">{japaneseType[type.type.name]}</span>
              </div>
            );
          })}
        </div> */}
      </button>
    </>
  );
};

export default Card;
