import React, { Component } from 'react';
import hat from '../../assets/images/hat.svg';

class ConsequenceChoice extends Component {
  constructor(props) {
    super(props);
    // when i used storedConsequences as the state then edited the state
    // - it cleared the consequence out immediately on click
    this.state = {
      consequences: [],
      randomNumbers: [],
      unselectedConsequence: false,
      activeConsequence: false
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

    while (arr.length < whileLength) {
      const randomnumber = Math.floor(Math.random() * storedConsequences.length);

      // NOTE: come back to this continue
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
          className={ this.state.activeConsequence === i ? "game-consequence active" : "game-consequence" }>
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

  render() {
    return (
      <div className="game-consequences">
        <ul className={this.state.activeConsequence !== false ? 'collection active-consequence' : 'collection'}>
          {this.displayConsequences()}
        </ul>
        <button
          onClick={() => this.getRandomConsequences()}
          disabled={this.state.unselectedConsequence}
          className="hat-btn no-select"
        >
          <img src={hat} alt="logo" />
        </button>
      </div>
    );
  }
}

export default ConsequenceChoice;
