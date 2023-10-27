import Flickity from "flickity";
import "./index.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { OnlineGame } from "../../types/game.type";
import { GameContext } from "../layout";
import { useContext } from "react";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Home() {
  const flickityRef = useRef(null);
  const games = useContext(GameContext);
  const game = games[getRandomInt(games.length)];

  useEffect(() => {
    flickityRef.current = new Flickity(".carousel", {
      cellAlign: "left",
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
    });
  }, []);

  return (
    <main className="home pad-auto">
      <div className="landing-page">
        <div className="flex-col">
          <h2 className="top-title">recommandation du moment</h2>
          <h1>{game.name}</h1>
          <p>{game.props.description}</p>
          <Link to="/game" state={game.id} className="cta">
            <h2>télécharger</h2>
          </Link>
        </div>

        <div
          className="bg"
          style={{ backgroundImage: `url(${game.props.background})` }}
        >
          <div className="gradient-h"></div>
          <div className="gradient-w"></div>
        </div>
      </div>

      <div className="flex-col carousel-ctnr">
        <h2>Recommandés</h2>

        <div className="carousel">
          {games.map((gameCell: OnlineGame) => (
            <Link
              to="/game"
              state={gameCell.id}
              className="carousel-cell"
              key={gameCell.id}
            >
              <div className="img-ctnr">
                <img src={gameCell.props.background} />
              </div>

              <h5>Multijoueur</h5>
              <h2>{gameCell.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
