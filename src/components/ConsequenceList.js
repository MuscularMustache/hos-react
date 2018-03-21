import React, { Component } from 'react';

class ConsequenceList extends Component {
  renderConsequences() {
    // destructuring id and content off of each consequence
    return this.props.consequences.map(({id, content}) => {
      return (
        <li key={id} className="collection-item">
          {content}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderConsequences()}
      </ul>
    )
  }
}

export default ConsequenceList;
