import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ResetGame from './ResetGame';
import ConsequenceChoice from './ConsequenceChoice';
import mutation from '../../mutations/StartGame';
import FetchGame from '../../queries/FetchGame';
import '../../styles/game.css';

class StartGame extends Component {
  startGame(userId) {
    this.props.mutate({
      variables: { userId },
      refetchQueries: [{
        query: FetchGame,
        variables: { userId }
      }]
    }).catch(res => {
      // gotta handle errors - I should be doing this everywhere
    });
  }

  // remove game and go back to menu - currently doesn't clear out cache and it probably should
  resetGame() {
    localStorage.removeItem('activeGame');
    this.props.history.push('/');
    // this.props.data.refetch();
  }

  // TODO: REFACTOR THIS - looks like crap
  initializeGame() {
    const { game, loading } = this.props.data;
    const storedConsequences = JSON.parse(localStorage.getItem('activeGame'));

    if (!game || loading) { return; }

    if (game.length === 0) { this.startGame(this.props.userId);}

    // NOTE: the only reason this isn't consolodated with the !game || loading if is because if theres no game but there are stored consequences reset game doesn't appare (only happens if i manually delete the game out of the database)
    if (storedConsequences && storedConsequences.length !== 0) { return; }

    const consequences = game[0] && game[0].lists.reduce((arr, list) => {
      return [ ...arr, ...list.consequences ];
    }, []);

    if (consequences === undefined) { return; }

    localStorage.setItem('activeGame', JSON.stringify(consequences));
  }

  render() {
    return (
      <div className="content">
        {this.initializeGame()}
        <ConsequenceChoice />
        <ResetGame game={this.props.data.game} refetchGame={() => this.resetGame()} />
        <Link className="standard-btn" to="/">Back</Link>
      </div>
    );
  }
}

export default graphql(mutation)(graphql(FetchGame, {
  options: props => ({ variables: { userId: props.userId } })
})(StartGame));
