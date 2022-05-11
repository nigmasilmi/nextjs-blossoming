import React from "react";
import Link from "next/link";
import classes from "./main-header.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Next Events</Link>
      </div>
      <nav>
        <ul className={classes.navigation}>
          <li>
            <Link href="/events">Browse Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
