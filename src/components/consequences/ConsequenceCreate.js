import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import AddConsequence from '../../mutations/AddConsequence';
import EditConsequence from '../../mutations/EditConsequence';
import '../../styles/consequences.css';

class ConsequenceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', errors: [] };
  }

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      // According to react docs this is fine
      this.setState({ content: this.props.content }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  onSubmit() {
    // When adding consequence from game
    if (!this.props.listId) {
      this.addConsequenceMidGame();
      return;
    }

    if (this.props.editId) {
      this.editConsequence();
      return;
    }

    this.props.AddConsequence({
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

  addConsequenceMidGame() {
    if (!this.state.content) {
      this.setState({ errors: ['Consequence cannot be blank'] });
      return;
    }

    const localItems = ['activeGame', 'tempConsequences'];
    /* eslint-disable no-undef */
    localItems.forEach(item => {
      const arr = JSON.parse(localStorage.getItem(item)) || [];
      arr.push({ content: this.state.content });
      localStorage.setItem(item, JSON.stringify(arr));
    });
    /* eslint-enable no-undef */
    this.setState({ content: '', errors: [] });
    this.props.closeAddConsequence();
  }

  editConsequence() {
    // NOTE: the editconsequence and addConsequence mutation .then && .catch are identical, try to combine them
    this.props.EditConsequence({
      variables: {
        content: this.state.content,
        id: this.props.editId
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
    const title = `${this.props.editId ? 'Edit' : 'Create New'} Consequence`;
    if (!this.props.isOpen) {
      return <div className="hidden" />;
    }

    return (
      <div className="add-consequence">
        <div className="bg-cover" />

        <div className="add-content">
          <h2>{`${!this.props.listId ? 'Add Consequence to game' : title}`}</h2>
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
              {this.props.editId ? 'edit' : 'add' }
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(AddConsequence, { name: 'AddConsequence' }),
  graphql(EditConsequence, { name: 'EditConsequence' })
)(ConsequenceCreate);
