import gql from 'graphql-tag';

export default gql`
  query FetchLists($userId: ID!) {
    lists(id: $userId) {
      id
      title
      pullForGame
      listType
    }
  }
`;
