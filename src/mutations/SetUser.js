import gql from 'graphql-tag';

export default gql`
  mutation SetUser($userID: String!) {
    setUser(userID: $userID) {
      id
      userID
      theme
    }
  }
`;
