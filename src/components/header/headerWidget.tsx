import React from "react";
// import { Link } from "react-router-dom";
import "./headerWidget.less";
function HeaderWidget() {
  return (
    <div className="header">
      <div className="headerWidget">
        <h1>
          <a href="/" title="DontBuyRocks">
            {" "}
            DontBuyRocks
          </a>
        </h1>
        <div className="fr">
          <h2>
            <a
              href="https://twitter.com/DONOTBUYROCKS"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </h2>
          <h2>
            <a
              href="https://discord.gg/Yx6BCpxW"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </h2>
          {/* <h2>
            <Link to="/about">About Us</Link>
          </h2> */}
        </div>
      </div>
    </div>
  );
}
export default HeaderWidget;
