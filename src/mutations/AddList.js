import gql from 'graphql-tag';

export default gql`
  mutation AddList($title: String, $userId: ID) {
    addList(title: $title, userId: $userId) {
      id
      title
      user {
        id
      }
    }
  }
`;
