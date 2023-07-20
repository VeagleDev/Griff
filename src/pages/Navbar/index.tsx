import { NavLink } from 'react-router-dom';
import './index.scss';

function Navbar() {
  return (
    <div className="fixed full-size-layer">
      <div className="top-nav">

      </div>
      <div className="navbar flex-col">
        <div className='vertical-stripe'></div>

        <button className="profile-section section flex-center">
          <div className="content flex">
            <div className="profile-picture img-ctnr">
              <img src="" />
            </div>

            <div className="flex-col">
              <h2>TheCrinten</h2>
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
                </svg>

                <h6>griff.veagle.fr</h6>
              </div>
            </div>
          </div>
          <div className='horizontal-stripe'></div>
        </button>

        <nav className="router-nav">
          <NavLink to="/" className="link flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>

            <h2>Boutique</h2>
          </NavLink>

          <NavLink to="/" className="link flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>

            <h2>Bibliothèque</h2>
          </NavLink>

          <NavLink to="/" className="link flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
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
            <button className="card ready-to-play">
              <div className="content flex">
                <div className="img-ctnr">
                  <img src="" />
                </div>
                
                <div className="flex-col right-content">
                  <h2>Forza Horizon 5</h2>
                  <h6>Prêt à jouer</h6>
                </div>
              </div>
            </button>

            <button className="card downloading">
              <div className="content flex">
                <div className="img-ctnr">
                  <img src="" />
                </div>
                
                <div className="flex-col right-content">
                  <h2>Forza Horizon 5</h2>
                  <h6>Installation ...</h6>
                </div>
              </div>

              <div className="loading-bar"></div>
            </button>
          </div>
        </div>
      </div>      
    </div>

  );
}

export default Navbar;
