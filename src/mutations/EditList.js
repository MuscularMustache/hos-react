import gql from 'graphql-tag';

export default gql`
  mutation EditList($title: String!, $id: ID!) {
    editList (title: $title, id: $id ) {
      id
      title
    }
  }
`;
