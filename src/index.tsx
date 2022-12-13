import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// @ts-expect-error TS(6142): Module './App' was resolved to '/Users/yutourashim... Remove this comment to see the full error message
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <React.StrictMode>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Router basename={process.env.PUBLIC_URL}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <App />
    </Router>
  </React.StrictMode>
);
