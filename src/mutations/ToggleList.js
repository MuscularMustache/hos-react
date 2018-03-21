import gql from 'graphql-tag';

export default gql`
  mutation ToggleListPull($id: ID) {
    toggleListPull(id: $id) {
      id
    }
  }
`;
