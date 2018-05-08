import gql from 'graphql-tag';

export default gql`
  query FetchGame($userId: ID!) {
    game(id: $userId) {
      id
      lists {
        id
        title
        consequences {
          id
          content
        }
      }
    }
  }
`;
