import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import FetchLists from '../../queries/FetchLists';
import AddList from '../../mutations/AddList';

class ListCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '', errors: [] };
  }

  onSubmit() {
    this.props.mutate({
      variables: {
        title: this.state.title,
        userId: this.props.userId
      },
      refetchQueries: [{
        query: FetchLists,
        variables: { userId: this.props.userId }
      }]
    }).then(() => {
      this.setState({ title: '', errors: [] });
      this.props.closeAddList();
    }).catch(res => {
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }

  cancel() {
    this.props.closeAddList();
    this.setState({ title: '', errors: [] });
  }

  render() {
    if (!this.props.isOpen) {
      return <div className="hidden"/>
    }

    return (
      <div className="add-list">
        <div className="bg-cover" />

        <div className="add-content">
          <h2>Create New List</h2>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
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
              add list
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(AddList)(ListCreate);
