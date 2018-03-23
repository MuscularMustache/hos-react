import gql from 'graphql-tag';

export default gql`
  mutation DeleteConsequence($id: ID) {
    deleteConsequence(id: $id) {
      id
    }
  }
`;
