import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import FetchList from '../queries/FetchList';
import FetchLists from '../queries/FetchLists';
import DeleteList from '../mutations/DeleteList';
import { Link } from 'react-router-dom';
import ConsequenceList from './ConsequenceList';
import LoadingIndicator from './LoadingIndicator';

class ListDetail extends Component {
  onListDelete(id) {
    this.props.mutate({
        variables: { id },
        refetchQueries: [{ query: FetchLists }]
      })
      .then(() => {
        // NOTE: not sure if this is the right way to do it
        this.props.history.push('/lists');
      });
  }

  render() {
    const { list } = this.props.data;

    if (!list) { return <LoadingIndicator />; }

    return (
      <div className="content">
        <h2>{list.title}</h2>
        <a onClick={() => this.onListDelete(list.id)}>delete list</a>
        <ConsequenceList consequences={list.consequences} />
        <Link className="standard-btn" to="/lists">Back</Link>
      </div>
    );
  }
}

export default graphql(DeleteList)(graphql(FetchList, {
  options: (props) => { return { variables: { id: props.match.params.id } } }
})(ListDetail));
