import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddConsequence from '../mutations/AddConsequence';

class ConsequenceCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        listId: this.props.listId
      }
    }).then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="input-field">
          <input
            className={this.state.content ? "has-text" : "empty"}
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
          <label>Add a consequence</label>
        </div>
      </form>
    );
  }
}



export default graphql(AddConsequence)(ConsequenceCreate);
