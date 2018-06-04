import gql from 'graphql-tag';

// after getting this to work, change it to fetchList
export default gql`
  query FindList($id: ID!) {
    list(id: $id) {
      id
      title
      pullForGame
      consequences {
        id
        content
      }
    }
  }
`;
