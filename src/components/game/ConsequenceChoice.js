import React, { Component } from 'react';
import hat from '../../assets/images/hat.svg';

class ConsequenceChoice extends Component {
  constructor(props) {
    super(props);

    // const storedConsequences = JSON.parse(localStorage.getItem('activeGame'));

    // when i used storedConsequences as the state then edited the state it cleared the consequence out immediately on click
    // conequences isn't used at all anymore
    this.state = {
      consequences: [],
      randomNumbers: [],
      unselectedConsequence: false
    };
  }

  // TODO: REFACTOR THIS
  getRandomConsequences() {
    const storedConsequences = JSON.parse(localStorage.getItem('activeGame'));
    let whileLength = 2;

    // if no more consequences then go to "end game screen"
    if (storedConsequences.length < whileLength) {
      whileLength = storedConsequences.length;
    }

    let arr = [];
    while(arr.length < whileLength) {
      const randomnumber = Math.floor(Math.random()*storedConsequences.length);
      if (arr.indexOf(randomnumber) > -1) { continue };
      arr[arr.length] = randomnumber;
    }

    arr.sort(function(a, b){return b - a});
    this.setState({ randomNumbers: arr, unselectedConsequence: true, consequences: storedConsequences });
  }

  displayConsequences() {
    const { randomNumbers, consequences } = this.state;
    if (randomNumbers.length !== 0) {
      return randomNumbers.map(i => {
        return (<li
          key={i}
          onClick={() => this.selectConsequence(i)}
          className="collection-item game-consequence">
          {consequences[i].content}
        </li>);
      });
    } else {
      return (
        <div className="game-directions">
          <p>tap on the hat to draw <br/> a consequence for sucking...</p>
          <p>...at whatever you're doing right now</p>
          <p>ya scrub</p>
        </div>
      );
    }
  }

  selectConsequence(i) {
    const storedConsequences = JSON.parse(localStorage.getItem('activeGame'));
    storedConsequences.splice(i, 1);
    localStorage.setItem('activeGame', JSON.stringify(storedConsequences));

    // NOTE: set timeout is just so people don't tab a consequence and immediately choose something else
    // - increase time when done testing
    setTimeout(() => {
      this.setState({ unselectedConsequence: false })
    }, 100);
  }

  render() {
    return (
      <div className="game-consequences">
        <ul className="collection">
          {this.displayConsequences()}
        </ul>
        <a
          onClick={() => this.getRandomConsequences()}
          disabled={this.state.unselectedConsequence}
          className="hat-btn"
        >
          <img src={hat} alt="logo" />
        </a>
      </div>
    );
  }
}

export default ConsequenceChoice;
