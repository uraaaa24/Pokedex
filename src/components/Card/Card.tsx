import React from "react";
import "./Card.css";

const Card = (props) => {
  //モーダルを表示する
  const showModal = () => {
    props.setShowModalFlag(true);
    props.setPressNumber(props.index);
  };

  return (
    <>
      <button className="card" onClick={showModal}>
        <div className="cardImg">
          {props.pokemon.sprites.other['official-artwork'].front_default ? 
          <img src={props.pokemon.sprites.other['official-artwork'].front_default} alt="" /> :
          <img src={props.pokemon.sprites.front_default} alt="" />
          }
          </div>
        <h3 className="cardName">{props.japanesePokemonData.names[0].name}</h3>
        <div className="cardData">
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
