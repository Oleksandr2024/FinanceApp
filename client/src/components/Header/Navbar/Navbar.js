import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import clsx from "clsx";

const Navbar = ({ darkMode }) => {
  const [activeNavlink1, setActiveNavlink1] = useState(false);
  const [activeNavlink2, setActiveNavlink2] = useState(false);

  return (
    <nav className={clsx(styles.nav, { [styles.dark]: darkMode })}>
      <NavLink
        className={clsx(styles.navlink, {
          [styles.active]: activeNavlink1,
          [styles.dark]: darkMode,
        })}
        to="/"
        onClick={() => {
          setActiveNavlink1(true);
          setActiveNavlink2(false);
        }}
      >
        <span>Home</span>
      </NavLink>
      <NavLink
        className={clsx(styles.navlink, {
          [styles.active]: activeNavlink2,
          [styles.dark]: darkMode,
        })}
        to="/about"
        onClick={() => {
          setActiveNavlink1(false);
          setActiveNavlink2(true);
        }}
      >
        <span>About</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
