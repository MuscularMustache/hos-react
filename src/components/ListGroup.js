import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import FetchLists from '../queries/FetchLists';
import userIcon from '../assets/images/icons/list_icon_user.svg';
import '../styles/list-group.css';

class ListGroup extends Component {
  // TODO: wrap title in renderLists with this link after setting up
  // <Link to={`lists/${id}`}></Link>
  // also add the icon before hand

  renderLists() {
    return this.props.data.lists.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <img src={userIcon} className="list-icon" alt="user icon" />
          <span>
            {title}
          </span>
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
        <Link className="standard-btn" to="/">Back</Link>
      </div>
    );
  }
}

export default graphql(FetchLists)(ListGroup);
