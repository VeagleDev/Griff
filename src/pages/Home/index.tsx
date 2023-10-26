import Flickity from 'flickity';
import "./index.scss";
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import {OnlineGame} from "../../types/game.type";
import {GameContext} from "../layout";
import {useContext} from "react";


function Home() {
  const flickityRef = useRef(null);

  const games = useContext(GameContext);
  const [ranId, setRandId] = useState(0);

  const generateRandomNumber = () => {
    const min = 0;
    const max = 5;
    const randomNum = Math.floor(Math.random() * (games.length - 0 + 1)) + 0;
    setRandId(randomNum);
  };

  useEffect(() => {
    generateRandomNumber();

    flickityRef.current = new Flickity('.carousel', {
      cellAlign: 'left',
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false
    });
  }, []);

  return (
    <main className="home pad-auto">
      <div className="landing-page">
        <div className="flex-col">
          <h2 className="top-title">#1 top tendance</h2>
          <h1>{games[ranId].name}</h1>
          <p>
            {games[ranId].props.description}
          </p>
          <Link to="/game" state={games[ranId].id} className="cta">
            <h2>télécharger</h2>
          </Link>
        </div>

        <div className="bg" style={{backgroundImage: `url(${games[ranId].props.background})`}}>
          <div className="gradient-h"></div>
          <div className="gradient-w"></div>
        </div>
      </div>

      <div className="flex-col carousel-ctnr">
        <h2>Recommandés</h2>

        <div className="carousel">        
          {games.map((game: OnlineGame) => (
            <Link to="/game" state={game.id} className="carousel-cell" key={game.id}>
              <div className="img-ctnr">
                <img src={game.props.background} />
              </div>

              <h5>multijoueur</h5>
              <h2>{game.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
