import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import FetchList from '../queries/FetchList';
import { Link } from 'react-router-dom';
import ConsequenceList from './ConsequenceList';
import LoadingIndicator from './LoadingIndicator';

class ListDetail extends Component {
  render() {
    const { list } = this.props.data;

    if (!list) { return <LoadingIndicator />; }

    return (
      <div className="content">
        <h2>{list.title}</h2>
        <ConsequenceList consequences={list.consequences} />
        <Link className="standard-btn" to="/lists">Back</Link>
      </div>
    );
  }
}

export default graphql(FetchList, {
  options: (props) => { return { variables: { id: props.match.params.id } } }
})(ListDetail);
