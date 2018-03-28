import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import FetchLists from '../queries/FetchLists';
import AddList from '../mutations/AddList';

class ListCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title,
        userId: this.props.userId
      },
      refetchQueries: [{
        query: FetchLists,
        variables: { userId: this.props.userId }
      }]
    }).then(() => this.setState({ title: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="input-field">
          <input
            className={this.state.title ? "has-text" : "empty"}
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
          <label>Create New List</label>
        </div>
      </form>
    );
  }
}

export default graphql(AddList)(ListCreate);
