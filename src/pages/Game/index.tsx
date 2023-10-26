import "./index.scss";

interface propsTag {
  text: string
}

function Tag(props:propsTag) {
  return (
    <div className="tag flex-center">
      <h5>{props.text}</h5>
    </div>
  );
}

function Game() {
  return (
    <main>
      <div className="top-page">
        <div className="bg">
          <img src="" alt="" />

          <div className="gradient-h flex-content">
            <div className="content pad-auto">
              <h1>Forza Horizon 5</h1>
              <div className="flex tag-ctnr">
                <Tag text="microsoft" />
                <Tag text="bac à sable" />
                <Tag text="course" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-page flex pad-auto">
        <div className="left-content">
          <p>Forza Horizon 5 est un jeu de course en monde ouvert développé par Playground Games. Il prend place dans les villes et magnifiques décors du Mexique.</p>
          
          <div className="pannel">
            <h5>à savoir</h5>
            <div className="horizontal-stripe"></div>
            <p>Cette version contient l'entièreté du jeu ainsi que tous ses DLC. Ce jeu est développé par Playground Games et disponible sur le Microsoft Store à partir de 49€99.</p>
          </div>
        </div> 

        <div className="right-content">
          <div className="game-pannel flex-col">
            <div className="img-ctnr">
              <img src="" alt="" />
            </div>

            <div className="flex tag-ctnr">
                <Tag text="microsoft" />
            </div>

            <button className="fill cta">
              <h2>télécharger</h2>
            </button>

            <button className="border cta">
              <h2>laissez un avis</h2>
            </button>
          </div>
        </div>       
      </div>
    </main>
  );
}

export default Game;
