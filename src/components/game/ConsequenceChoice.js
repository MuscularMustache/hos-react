import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import hat from '../../assets/images/hat.svg';
import EndGame from './EndGame';
import DeleteGame from '../../mutations/DeleteGame';
import { AppProvider, AppContext } from '../AppProvider';

class ConsequenceChoice extends Component {
  constructor(props) {
    super(props);
    // when i used storedConsequences as the state then edited the state
    // - it cleared the consequence out immediately on click
    this.state = {
      consequences: [],
      randomNumbers: [],
      unselectedConsequence: false,
      activeConsequence: false,
      endGame: false
    };
  }

  // TODO: REFACTOR THIS
  getRandomConsequences() {
    // eslint-disable-next-line no-undef
    const storedConsequences = JSON.parse(localStorage.getItem('activeGame'));
    const arr = [];
    let whileLength = 2;

    // if no more consequences then go to "end game screen"
    if (storedConsequences.length < whileLength) {
      whileLength = storedConsequences.length;
    }

    if (whileLength === 0) {
      this.setState({ endGame: true });
    }

    while (arr.length < whileLength) {
      const randomnumber = Math.floor(Math.random() * storedConsequences.length);
      // eslint-disable-next-line no-continue
      if (arr.indexOf(randomnumber) > -1) { continue; }
      arr[arr.length] = randomnumber;
    }

    arr.sort((a, b) => b - a);

    this.setState({
      consequences: storedConsequences,
      randomNumbers: arr,
      unselectedConsequence: true,
      activeConsequence: false
    });
  }

  displayConsequences() {
    const { randomNumbers, consequences } = this.state;
    if (randomNumbers.length !== 0) {
      return randomNumbers.map(i => (
        <li
          key={i}
          onClick={() => this.selectConsequence(i)}
          className={`game-consequence ${this.state.activeConsequence === i ? 'active' : ''}`}
        >
          {consequences[i].content}
        </li>
      ));
    }
    return (
      <div className="game-directions">
        <p>tap on the hat to draw <br /> a consequence for sucking...</p>
        <p>...at whatever you&apos;re doing right now</p>
        <p>ya scrub</p>
      </div>
    );
  }

  selectConsequence(i) {
    /* eslint-disable no-undef */
    const storedConsequences = JSON.parse(localStorage.getItem('activeGame'));
    storedConsequences.splice(i, 1);
    localStorage.setItem('activeGame', JSON.stringify(storedConsequences));
    /* eslint-enable no-undef */

    this.setState({ activeConsequence: i });
    // NOTE: set timeout is just so people don't tab a consequence then immediately
    // - choose something else, increase time when done testing
    setTimeout(() => {
      this.setState({ unselectedConsequence: false });
    }, 100);
  }

  gameBoard() {
    if (this.state.endGame) {
      const { id } = this.props.game[0];

      this.props.mutate({ variables: { id } });
      return <EndGame />;
    }
    return (
      <ul className={`collection ${this.state.activeConsequence !== false ? 'active-consequence' : ''}`}>
        {this.displayConsequences()}
      </ul>
    );
  }

  hatBtn() {
    const message = 'you must select a consequence before pulling from the hat again';
    if (this.state.unselectedConsequence) {
      return (
        <AppContext.Consumer>
          {context => (
            <button
              onClick={context.updateMessage.bind(AppProvider, message)}
              data-disabled={this.state.unselectedConsequence}
              className="hat-btn no-select"
            >
              <img src={hat} alt="logo" />
            </button>
          )}
        </AppContext.Consumer>
      );
    }
    return (
      <button
        onClick={() => this.getRandomConsequences()}
        data-disabled={this.state.unselectedConsequence}
        className="hat-btn no-select"
      >
        <img src={hat} alt="logo" />
      </button>
    );
  }

  render() {
    return (
      <div className="game-consequences">
        {this.gameBoard()}
        {this.hatBtn()}
      </div>
    );
  }
}

export default graphql(DeleteGame)(ConsequenceChoice);
