import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './login';
import Mesaages from './messages';
import Home from './home';

export const Pages = () => {
  const userID = window.localStorage.getItem('userID');

  return (
    <Switch>
      <Route
        path="/login"
        exact
        render={({ history }) => <Login history={history} />}
      />
      <Route
        path="/:id/messages"
        render={({ location }) => <Mesaages location={location} />}
      />
      <Route
        path="/(home)?"
        exact
        render={({ history }) => <Home history={history} />}
      />
      <Route
        render={({ location }) => (
          <h1>
            <mark>
              Wrong address {location.pathname}?
            </mark>
          </h1>
        )}
      />
      {
        !userID && <Redirect from="/:id/messages" to="/home" />
      }
    </Switch>
  );
};
