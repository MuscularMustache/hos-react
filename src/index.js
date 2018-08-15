import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';

import App from './components/App';
import Login from './components/login/Auth0Login';
import UserNav from './components/UserNav';
import Settings from './components/settings/Settings';
import ListGroup from './components/lists/ListGroup';
import ListDetail from './components/lists/ListDetail';
import StartGame from './components/game/StartGame';
import requireAuth from './components/requireAuth';
import Callback from './components/Callback';
import { AppProvider } from './components/AppProvider';
import registerServiceWorker from './registerServiceWorker';

import history from './history';
import Auth from './Auth/Auth'; // eslint-disable-line

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};


// NOTE: if i pass id back from requests
// - dataIdFromObject will update data without having to re-request it
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <div>
        <AppProvider>
          <Switch>
            <App
              auth={auth}
              client={client}
              render={props => <App {...props} />}
            >
              <Route path="/" exact component={requireAuth(UserNav)} />
              <Route path="/login" render={props => <Login auth={auth} {...props} />} />
              <Route
                path="/callback"
                render={props => {
                  handleAuthentication(props);
                  return <Callback {...props} auth={auth} />;
                }}
              />
              <Route path="/settings" component={requireAuth(Settings)} />
              <Route path="/lists" exact component={requireAuth(ListGroup)} />
              <Route path="/lists/:id" component={requireAuth(ListDetail)} />
              <Route path="/game" component={requireAuth(StartGame)} />
            </App>
          </Switch>
        </AppProvider>
      </div>
    </Router>
  </ApolloProvider>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
