import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddConsequence from '../../mutations/AddConsequence';
import '../../styles/consequences.css';

class ConsequenceCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '', errors: [] };
  }

  onSubmit() {
    this.props.mutate({
      variables: {
        content: this.state.content,
        listId: this.props.listId
      }
    }).then(() => {
      this.setState({ content: '', errors: [] });
      this.props.closeAddConsequence();
    }).catch(res => {
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }

  cancel() {
    this.props.closeAddConsequence();
    this.setState({ content: '', errors: [] });
  }

  render() {
    if (!this.props.isOpen) {
      return <div className="hidden" />;
    }

    return (
      <div className="add-consequence">
        <div className="bg-cover" />

        <div className="add-content">
          <h2>Create New Consequence</h2>
          <textarea
            onChange={event => this.setState({ content: event.target.value })}
            value={this.state.content}
            className="standard-input"
          />
          <div className="errors">
            {this.state.errors.map(error => <p className="error" key={error}>{error}</p>)}
          </div>
          <div className="flex-row">
            <a className="submit-btn cancel no-select" onClick={() => this.cancel()}>
              <i className="material-icons">close</i>
              cancel
            </a>
            <a className="submit-btn no-select" onClick={() => this.onSubmit()}>
              add
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}


export default graphql(AddConsequence)(ConsequenceCreate);
