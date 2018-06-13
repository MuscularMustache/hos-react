import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../LoadingIndicator';
import ListCreate from './ListCreate';
import Menu from '../menu/Menu';
import ListToggle from './ListToggle';
import { AppProvider, AppContext } from '../AppProvider';
import FetchLists from '../../queries/FetchLists';
import ToggleList from '../../mutations/ToggleList';
import '../../styles/list-group.css';

class ListGroup extends Component {
  constructor(props) {
    super(props);

    this.state = { addListOpen: false };
  }

  onToggleList(id) {
    this.props.mutate({
      variables: { id },
      refetchQueries: [{
        query: FetchLists,
        variables: { userId: this.props.userId }
      }]
    }).catch(() => {
      // gotta handle errors - I should be doing this everywhere
    });
  }

  renderLists() {
    if (_.get(this.props, 'data.error.message')) {
      return <p>There was an error retrieving the lists</p>;
    }

    if (!this.props.data.lists.length) {
      return (
        <div>
          <h4 className="no-data">There are no lists. Click on the options button below start adding them</h4>
          <h4 className="no-data">After creating a new list, tap on the icon to enable/disable for games or tap on the name to add consequences to your new list</h4>
        </div>
      );
    }

    return this.props.data.lists.map(({
      id,
      title,
      pullForGame,
      listType
    }) => (
      <AppContext.Consumer key={id}>
        {context => (
          <li className="collection-item">
            <ListToggle
              pullForGame={pullForGame}
              AppProvider={AppProvider}
              context={context}
              listType={listType}
              onToggleList={() => this.onToggleList(id)}
            />
            <Link to={`lists/${id}`}>
              <span onClick={context.hideSnackbar}>
                {title}
              </span>
            </Link>
          </li>
        )}
      </AppContext.Consumer>
    ));
  }

  render() {
    if (this.props.data.loading) { return <LoadingIndicator />; }

    return (
      <div className="content">
        <h2>Edit Lists</h2>
        <ul className="collection">
          {this.renderLists()}
        </ul>
        <ListCreate
          userId={this.props.userId}
          isOpen={this.state.addListOpen}
          closeAddList={() => this.setState({ addListOpen: false })}
        />
        <Menu highlight={!this.props.data.lists.length}>
          <a icon="add" className="standard-btn" onClick={() => this.setState({ addListOpen: true })}><span>create new list</span></a>
          <Link icon="arrow_back" className="standard-btn" to="/"><span>back to menu</span></Link>
        </Menu>
      </div>
    );
  }
}

export default graphql(ToggleList)(graphql(FetchLists, {
  options: props => ({ variables: { userId: props.userId } })
})(ListGroup));
