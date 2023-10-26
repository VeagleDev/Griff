import "./index.scss";
import { OnlineGame } from "../../types/game.type";
import { GameContext } from "../layout";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';


function Tag({text}: {text: string}) {
  return (
    <div className="tag flex-center">
      <h5>{text}</h5>
    </div>
  );
}

function Game() {
  const games = useContext(GameContext);


  const location = useLocation();
  const id = location.state || 0;
  console.log(id);
  const game = games[id];
  console.log(game)

  return (
    <main>
      <div className="top-page">
        <div className="bg" style={{backgroundImage: `url(${games[id].props.background})`}}>

          <div className="gradient-h flex-content">
            <div className="content">
              <h1>{game.name}</h1>
              <div className="flex tag-ctnr">
                <Tag text="microsoft" />
                <Tag text="bac à sable" />
                <Tag text="course" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-page flex">
        <div className="left-content">
          <p>{game.props.description}</p>
          
          <div className="pannel">
            <h5>à savoir</h5>
            <div className="horizontal-stripe"></div>
            <p>La version du jeu est la {game.version} et une taille de {game.size} MB.</p>
          </div>
        </div> 

        <div className="right-content">
          <div className="game-pannel flex-col">
            <div className="img-ctnr">
              <img src={game.props.verticalIcon} alt="" />
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
