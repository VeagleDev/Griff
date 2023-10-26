import "./index.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <div className="landing-page">
        <div className="flex-col">
          <h2 className="top-title">#1 top tendance</h2>
          <h1>forza horizon 5</h1>
          <p>
            Forza Horizon 5 est un jeu de course en monde ouvert développé par
            Playground Games. Il prend place dans les villes et magnifiques
            décors du Mexique.
          </p>
          <Link to="/game" className="cta">
            <h2>télécharger</h2>
          </Link>
        </div>

        <div className="bg">
          <div className="img-ctnr">
            <img src="" />
          </div>

          <div className="gradient-h"></div>
          <div className="gradient-w"></div>
        </div>
      </div>

      <div className="flex-col carousel-ctnr">
        <h2>Recommandés</h2>

        <div className="carousel">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
      </div>
    </main>
  );
}

export default Home;
