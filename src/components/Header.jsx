import React from 'react';
import { NavLink } from 'react-router-dom';
// import styles from './Header.module.css'
const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          {/* <li className={styles.listLink}><Link to="/">Home</Link></li> */}
          {/* <li className={styles.listLink}><Link to="/movies">Movies</Link></li> */}
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/movies">Movies</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
