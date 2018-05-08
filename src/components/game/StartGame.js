import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
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

  displayConsequences() {
    const game = this.props.data.game;
    if (!game || this.props.data.loading) { return; }

    const consequences = game[0] && game[0].lists.reduce((arr, list) => {
      return [ ...arr, ...list.consequences ]
    }, []);

    if (game.length === 0) { this.startGame(this.props.userId);}

    if (consequences === undefined) { return; }

    return consequences.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content}
        </li>
      );
    });

  }

  render() {
    return (
      <div className="content">
        <h2>Game</h2>
        <ul className="collection">
          {this.displayConsequences()}
        </ul>
        <Link className="standard-btn" to="/">Back</Link>
      </div>
    );
  }
}

export default graphql(mutation)(graphql(FetchGame, {
  options: props => ({ variables: { userId: props.userId } })
})(StartGame));
