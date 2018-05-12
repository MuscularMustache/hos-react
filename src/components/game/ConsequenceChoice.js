import React, { Component } from 'react';
import hat from '../../assets/images/hat.svg';

class ConsequenceChoice extends Component {
  constructor(props) {
    super(props);
    // when i used storedConsequences as the state then edited the state
    //- it cleared the consequence out immediately on click
    this.state = {
      randomNumbers: [],
      unselectedConsequence: false,
      activeConsequence: false
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
    this.setState({
      randomNumbers: arr,
      unselectedConsequence: true,
      consequences: storedConsequences,
      activeConsequence: false });
  }

  displayConsequences() {
    const { randomNumbers, consequences } = this.state;
    if (randomNumbers.length !== 0) {
      return randomNumbers.map(i => {
        return (<li
          key={i}
          onClick={() => this.selectConsequence(i)}
          className={ this.state.activeConsequence === i ? "game-consequence active" : "game-consequence" }>
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

    this.setState({ activeConsequence: i });
    // NOTE: set timeout is just so people don't tab a consequence and immediately choose something else
    // - increase time when done testing
    setTimeout(() => {
      this.setState({ unselectedConsequence: false })
    }, 100);
  }

  render() {
    return (
      <div className="game-consequences">
        <ul className={ this.state.activeConsequence !== false ? "collection active-consequence" : "collection" }>
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
