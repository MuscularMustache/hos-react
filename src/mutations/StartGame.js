import gql from 'graphql-tag';

export default gql`
  mutation StartGame($userId: ID!) {
    startGame(userId: $userId) {
      id
      lists {
        id
        title
      }
    }
  }
`;
