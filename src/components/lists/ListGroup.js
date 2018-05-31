import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../LoadingIndicator';
import ListCreate from './ListCreate';
import Menu from '../menu/Menu';
import { AppProvider, AppContext } from '../AppProvider';
import FetchLists from '../../queries/FetchLists';
import ToggleList from '../../mutations/ToggleList';
import userIcon from '../../assets/images/icons/list_icon_user.svg';
import userIconActive from '../../assets/images/icons/list_icon_user_checked.svg';
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
    }).catch(res => {
        // gotta handle errors - I should be doing this everywhere
      });
  }

  renderLists() {
    const message = 'For these changes to take effect, please reset game';

    if (_.get(this.props, 'data.error.message')) {
      return <p>There was an error retrieving the lists</p>;
    }

    if (!this.props.data.lists.length) {
      return <h4 className="no-data">There are no lists. Click on the options button below start adding them.</h4>;
    }

    return this.props.data.lists.map(({ id, title, pullForGame }) => (
      <AppContext.Consumer key={id}>
        {context => (
          <li className="collection-item">
            <button onClick={() => this.onToggleList(id)} className={pullForGame ? 'active' : 'inactive'}>
              {/* eslint-disable-next-line react/jsx-no-bind */}
              <span onClick={context.updateMessage.bind(AppProvider, message)}>
                <img src={pullForGame ? userIconActive : userIcon} className="list-icon" alt="user icon" />
              </span>
            </button>
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
          <button icon="add" className="standard-btn" onClick={() => this.setState({ addListOpen: true })}><span>create new list</span></button>
          <Link icon="arrow_back" className="standard-btn" to="/"><span>back to menu</span></Link>
        </Menu>
      </div>
    );
  }
}

export default graphql(ToggleList)(graphql(FetchLists, {
  options: props => ({ variables: { userId: props.userId } })
})(ListGroup));
