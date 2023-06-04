import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ darkMode }) => {
  const [activeNavlink, setActiveNavlink] = useState(null);

  return (
    <nav className={`${styles.nav} ${darkMode ? styles.dark : ""} `}>
      <NavLink
        className={`${styles.navlink} ${
          activeNavlink === 1 ? styles.active : ""
        } ${darkMode ? styles.dark : ""}`}
        to="/"
        onClick={() => setActiveNavlink(1)}
      >
        <span>Home</span>
      </NavLink>
      <NavLink
        className={`${styles.navlink} ${
          activeNavlink === 2 ? styles.active : ""
        } ${darkMode ? styles.dark : ""}`}
        to="about"
        onClick={() => setActiveNavlink(2)}
      >
        <span>About</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
