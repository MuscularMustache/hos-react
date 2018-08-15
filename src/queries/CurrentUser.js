import gql from 'graphql-tag';

export default gql`
  query CurrentUser($userId: ID!) {
    user(id: $userId) {
      id
      theme
      premiumMember
    }
  }
`;
