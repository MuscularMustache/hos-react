import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import FetchLists from '../../queries/FetchLists';
import AddList from '../../mutations/AddList';
import EditList from '../../mutations/EditList';

class ListCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '', errors: [] };
  }

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      // According to react docs this is fine
      this.setState({ title: this.props.title }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  onSubmit() {
    if (this.props.listId) {
      this.editList();
      return;
    }

    this.props.AddList({
      variables: {
        title: this.state.title,
        userId: this.props.userId
      },
      refetchQueries: [{
        query: FetchLists,
        variables: { userId: this.props.userId }
      }]
    }).then(() => {
      this.setState({ title: '', errors: [] });
      this.props.closeAddList();
    }).catch(res => {
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }

  editList() {
    // NOTE: the editList and addlist mutation .then && .catch are identical, try to combine them
    this.props.EditList({
      variables: {
        title: this.state.title,
        id: this.props.listId
      }
    }).then(() => {
      this.setState({ title: '', errors: [] });
      this.props.closeAddList();
    }).catch(res => {
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }

  cancel() {
    this.props.closeAddList();
    this.setState({ title: '', errors: [] });
  }

  render() {
    if (!this.props.isOpen) {
      return <div className="hidden" />;
    }

    return (
      <div className="add-list">
        <div className="bg-cover" />

        <div className="add-content">
          <h2>{this.props.listId ? 'Edit List' : 'Create New List'}</h2>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
            className="standard-input"
          />
          <div className="errors">
            {this.state.errors.map(error => <p className="error" key={error}>{error}</p>)}
          </div>
          <div className="flex-row">
            <a className="submit-btn cancel no-select" onClick={() => this.cancel()}>
              <i className="material-icons">close</i>
              cancel
            </a>
            <a className="submit-btn no-select" onClick={() => this.onSubmit()}>
              {this.props.listId ? 'update' : 'add list'}
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(AddList, { name: 'AddList' }),
  graphql(EditList, { name: 'EditList' })
)(ListCreate);
