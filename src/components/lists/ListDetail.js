import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import FetchList from '../../queries/FetchList';
import FetchLists from '../../queries/FetchLists';
import DeleteList from '../../mutations/DeleteList';
import ToggleList from '../../mutations/ToggleList';
import ConsequenceList from '../consequences/ConsequenceList';
import ConsequenceCreate from '../consequences/ConsequenceCreate';
import LoadingIndicator from '../LoadingIndicator';
import ListToggle from './ListToggle';
import Menu from '../menu/Menu';
import { AppProvider, AppContext } from '../AppProvider';
import '../../styles/list-detail.css';

class ListDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { addConsequenceOpen: false };
  }

  onListDelete({ id, title }) {
    // eslint-disable-next-line no-alert, no-undef
    const confirmed = window.confirm(`Are you sure you want to delete the ${title} list?`);
    if (!confirmed) { return; }
    this.props.DeleteList({
      variables: { id },
      refetchQueries: [{
        query: FetchLists,
        variables: { userId: this.props.userId }
      }]
    }).then(() => {
      this.props.history.push('/lists');
    });
  }

  onToggleList(id) {
    this.props.ToggleList({
      variables: { id },
      refetchQueries: [{
        query: FetchList,
        variables: { id }
      }]
    }).catch(() => {
      // gotta handle errors - I should be doing this everywhere
    });
  }

  render() {
    const { list } = this.props.data;

    if (!list) { return <LoadingIndicator />; }

    return (
      <div className="content">
        <header className="flex-row mb">
          <AppContext.Consumer>
            {context => (
              <ListToggle
                pullForGame={list.pullForGame}
                AppProvider={AppProvider}
                context={context}
                listType={list.listType}
                onToggleList={() => this.onToggleList(list.id)}
              />
            )}
          </AppContext.Consumer>

          <h3>{list.title}</h3>
        </header>
        <ConsequenceList
          consequences={list.consequences}
          refetchConequences={() => this.props.data.refetch()}
        />
        <ConsequenceCreate
          listId={list.id}
          isOpen={this.state.addConsequenceOpen}
          closeAddConsequence={() => this.setState({ addConsequenceOpen: false })}
        />
        <Menu highlight={!list.consequences.length}>
          <a icon="add" className="standard-btn" onClick={() => this.setState({ addConsequenceOpen: true })}><span>create new consequence</span></a>
          <a icon="delete_forever" className="standard-btn" onClick={() => this.onListDelete(list)}><span>delete list</span></a>
          <Link icon="first_page" className="standard-btn" to="/lists"><span>back to lists</span></Link>
          <Link icon="arrow_back" className="standard-btn" to="/"><span>back to menu</span></Link>
        </Menu>
      </div>
    );
  }
}

export default compose(
  graphql(ToggleList, { name: 'ToggleList' }),
  graphql(DeleteList, { name: 'DeleteList' }),
  graphql(FetchList, {
    options: props => ({ variables: { id: props.match.params.id } })
  })
)(ListDetail);
