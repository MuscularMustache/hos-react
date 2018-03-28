import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import ListCreate from './ListCreate';
import FetchLists from '../queries/FetchLists';
import ToggleList from '../mutations/ToggleList';
import userIcon from '../assets/images/icons/list_icon_user.svg';
import '../styles/list-group.css';

class ListGroup extends Component {
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
    // TODO break this into its own component
    if (_.get(this.props, 'data.error.message')) {
      return <p>There was an error retrieving the lists</p>;
    }

    return this.props.data.lists.map(({ id, title, pullForGame }) => {
      return (
        <li key={id} className="collection-item">
          <a onClick={() => this.onToggleList(id)} className={pullForGame ? "active" : "inactive"}>
            <img src={userIcon} className="list-icon" alt="user icon" />
          </a>
          <Link to={`lists/${id}`}>
            {title}
          </Link>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) { return <LoadingIndicator />; }

    return (
      <div className="content">
        <h2>Edit Lists</h2>
        <ul className="collection">
          {this.renderLists()}
        </ul>
        <ListCreate userId={this.props.userId} />
        <Link className="standard-btn" to="/">Back</Link>
      </div>
    );
  }
}

export default graphql(ToggleList)(graphql(FetchLists, {
  options: props => ({ variables: { userId: props.userId } })
})(ListGroup));
