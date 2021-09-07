import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import config from "@/config";
const preLink = config.preLink;

ReactDOM.render(
  <HashRouter basename={`${preLink}/`}>
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route
          path={`/`}
          render={(routerProps) => {
            return <App {...routerProps} />;
          }}
        />
      </Switch>
    </Suspense>
  </HashRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
