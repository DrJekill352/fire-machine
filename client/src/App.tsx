import React, { useMemo } from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Home } from 'routes/Home';
import { TopBar } from 'components/TopBar';
import { useStore } from 'stores';

const browserHistory = createBrowserHistory();

export function App() {
  const { routerStore } = useStore();

  const history = useMemo(
    () => syncHistoryWithStore(browserHistory, routerStore),
    [routerStore]
  );

  return (
    <Router history={history}>
      <TopBar />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
