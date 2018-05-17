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
  constructor(props) {
    super(props);

    this.state = { addConsequenceOpen: false };
  }

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
        <ConsequenceCreate
          listId={list.id}
          isOpen={this.state.addConsequenceOpen}
          closeAddConsequence={() => this.setState({ addConsequenceOpen: false })}
        />
        <Menu>
          <a icon="delete_forever" className="standard-btn" onClick={() => this.onListDelete(list)}><span>delete list</span></a>
          <a icon="add" className="standard-btn"
            onClick={() => this.setState({ addConsequenceOpen: true })}><span>create new consequence</span></a>
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
