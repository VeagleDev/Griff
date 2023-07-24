import "./index.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <div className="landing-page">
        <div>
          <h2 className="top-title">#1 top tendance</h2>
          <h1>forza horizon 5</h1>
          <p>
            Forza Horizon 5 est un jeu de course en monde ouvert développé par
            Playground Games. Il prend place dans les villes et magnifiques
            décors du Mexique.
          </p>
          <Link to="/" className="cta">
            <h2>télécharger</h2>
          </Link>
        </div>

        <div className="bg">
          <div className="img-ctnr">
            <img src="" alt="" />
          </div>

          <div className="gradient"></div>
          <div className="gradient"></div>
        </div>
      </div>
    </main>
  );
}

export default Home;
