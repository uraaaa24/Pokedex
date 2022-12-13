//すべてのポケモンデータを取得
export const getAllPokemon = (url) => {
  //resolve: 成功した時, reject: 失敗した時
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json()) //取得してきたデータをjson形式で返す
      .then((data) => resolve(data)); //返ってきたデータをdataとして返す
  });
};

//各ポケモンの詳細なデータを取得
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json()) //取得してきたデータをjson形式で返す
      .then((data) => resolve(data)); //返ってきたデータをdataとして返す
  });
};
