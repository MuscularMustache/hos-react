import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import FetchList from '../../queries/FetchList';
import FetchLists from '../../queries/FetchLists';
import DeleteList from '../../mutations/DeleteList';
import { Link } from 'react-router-dom';
import ConsequenceList from '../consequences/ConsequenceList';
import ConsequenceCreate from '../consequences/ConsequenceCreate';
import LoadingIndicator from '../LoadingIndicator';
import Menu from '../menu/Menu';

class ListDetail extends Component {
  onListDelete({ id, title }) {
    const confirmed = window.confirm(`Are you sure you want to delete the ${title} list?`);
    if (!confirmed) { return; }
    this.props.mutate({
        variables: { id },
        refetchQueries: [{
          query: FetchLists,
          variables: { userId: this.props.userId }
        }]
      })
      .then(() => {
        this.props.history.push('/lists');
      });
  }

  render() {
    const { list } = this.props.data;

    if (!list) { return <LoadingIndicator />; }

    return (
      <div className="content">
        <h2>{list.title}</h2>
        <ConsequenceList consequences={list.consequences} refetchConequences={() => this.props.data.refetch() } />
        <ConsequenceCreate listId={list.id} />
        <Menu>
          <a icon="delete_forever" className="standard-btn" onClick={() => this.onListDelete(list)}><span>delete list</span></a>
          <Link icon="add" className="standard-btn" to="/"><span>placeholder - create new consequence</span></Link>
          <Link icon="first_page" className="standard-btn" to="/lists"><span>back to lists</span></Link>
          <Link icon="arrow_back" className="standard-btn" to="/"><span>back to menu</span></Link>
        </Menu>
      </div>
    );
  }
}

export default graphql(DeleteList)(graphql(FetchList, {
  options: props => ({ variables: { id: props.match.params.id } })
})(ListDetail));
