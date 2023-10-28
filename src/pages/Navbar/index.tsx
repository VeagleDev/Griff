import {NavLink} from "react-router-dom";
import "./index.scss";
import {useContext} from "react";
import {ConfigContext} from "../../main";
import {GameContext} from "../layout";
import {DownloadInfosContext} from "../../main";
import {DownloadInfo} from "../../types/downloads.type";

function Navbar() {
  const games = useContext(GameContext);
  const installingGames = useContext(DownloadInfosContext);
  const config = useContext(ConfigContext);

  const game = games.find((gameElement) => gameElement.id === props.id) || "Inconnu";

  return (
    <div className="fixed">
      <div className="top-nav"></div>
      <div className="navbar flex-col">
        <div className="vertical-stripe"></div>

        <button className="profile-section section flex-center">
          <div className="content flex">
            <div className="profile-picture img-ctnr">
              <svg
                className="svg-icon"
                style={{
                  width: "2em",
                  height: "2em",
                  verticalAlign: "middle",
                  fill: "currentColor",
                  overflow: "hidden",
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
              </svg>
            </div>

            <div className="flex-col">
              <h2>{config.username || "Utilisateur"}</h2>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
                  />
                </svg>

                <h6>{config.serverName || "Serveur Griff"}</h6>
              </div>
            </div>
          </div>
          <div className="horizontal-stripe"></div>
        </button>

        <nav className="router-nav">
          <NavLink to="/" className="link flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="nav-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6z"
              />
            </svg>

            <h2>Boutique</h2>
          </NavLink>

          <NavLink to="/" className="link flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="nav-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>

            <h2>Bibliothèque</h2>
          </NavLink>

          <NavLink to="/" className="link flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="nav-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>

            <h2>Téléchargements</h2>
          </NavLink>
        </nav>

        <div className="game-center">
          <div className="flex-col section header">
            <h5>centre de jeux</h5>
            <div className="horizontal-stripe"></div>
          </div>

          <div className="flex-col card-list">
            {/* <button className="card ready-to-play">
              <div className="content flex">
                <div className="img-ctnr">
                  <img src="" alt="" />
                </div>

                <div className="flex-col right-content">
                  <h2>Forza Horizon 5</h2>
                  <h6>Prêt à jouer</h6>
                </div>
              </div>
            </button> */}

            {installingGames.map((props: DownloadInfo) => (
              <button className="card downloading">
              <div className="content flex">
                <div className="img-ctnr">
                  <img src={games[parseInt(props.gid) - 1].props.verticalIcon} alt="" />
                </div>

                <div className="flex-col right-content">
                  <h2>{games[parseInt(props.gid) - 1].name}</h2>
                  <h6>Installation ...</h6>
                </div>
              </div>

              <div className="loading-bar"></div>
            </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
