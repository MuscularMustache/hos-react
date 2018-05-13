import gql from 'graphql-tag';

export default gql`
  mutation DeleteGame($id: ID) {
    deleteGame(id: $id) {
      id
    }
  }
`;
