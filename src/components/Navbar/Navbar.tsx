import React from 'react';
import "./Navbar.css";

const Navbar = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <nav>ポケモン図鑑</nav>
  )
}

export default Navbar