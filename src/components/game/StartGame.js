import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ResetGame from './ResetGame';
import ConsequenceChoice from './ConsequenceChoice';
import ConsequenceCreate from '../consequences/ConsequenceCreate';
import Menu from '../menu/Menu';
import mutation from '../../mutations/StartGame';
import FetchGame from '../../queries/FetchGame';
import '../../styles/game.css';

class StartGame extends Component {
  constructor(props) {
    super(props);

    this.state = { addConsequenceOpen: false };
  }

  // TODO: REFACTOR THIS - still looks like crap
  componentDidUpdate() {
    const { game, loading } = this.props.data;
    // eslint-disable-next-line no-undef
    const storedConsequences = JSON.parse(localStorage.getItem('activeGame')) || [];

    // prevents game from resetting whenever leaving and coming back
    if (!game || loading || storedConsequences.length !== 0) { return; }

    if (game.length === 0) { this.startGame(this.props.userId); }

    const consequences = _.get(game, '[0].lists', []).reduce((arr, list) => [...arr, ...list.consequences], []);

    if (consequences === undefined) { return; }

    // eslint-disable-next-line no-undef
    localStorage.setItem('activeGame', JSON.stringify(consequences));
  }

  startGame(userId) {
    this.props.mutate({
      variables: { userId },
      refetchQueries: [{
        query: FetchGame,
        variables: { userId }
      }]
    }).catch(() => {
      // gotta handle errors - I should be doing this everywhere
    });
  }

  // remove game and go back to menu - currently doesn't clear out cache and it probably should
  resetGame() {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('activeGame');
    this.props.history.push('/');
    this.props.data.refetch();
  }

  // NOTE: menu items need to be .standard-btn and have inner spans along with an icon class
  render() {
    return (
      <div className="content">
        <ConsequenceChoice game={this.props.data.game} />
        <ConsequenceCreate
          isOpen={this.state.addConsequenceOpen}
          closeAddConsequence={() => this.setState({ addConsequenceOpen: false })}
        />
        <Menu>
          <a icon="add" className="standard-btn" onClick={() => this.setState({ addConsequenceOpen: true })}><span>add consequence</span></a>
          <ResetGame icon="sync" game={this.props.data.game} refetchGame={() => this.resetGame()} />
          <Link icon="arrow_back" className="standard-btn" to="/"><span>back to menu</span></Link>
        </Menu>
      </div>
    );
  }
}

export default graphql(mutation)(graphql(FetchGame, {
  options: props => ({ variables: { userId: props.userId } })
})(StartGame));
