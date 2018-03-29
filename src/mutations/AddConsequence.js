import gql from 'graphql-tag';

export default gql`
  mutation AddConsequenceToList($content: String!, $listId: ID!) {
    addConsequenceToList (content: $content, listId: $listId ) {
      id
      consequences {
        id
        content
      }
    }
  }
`;
