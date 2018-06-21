import gql from 'graphql-tag';

export default gql`
  mutation EditConsequence($content: String!, $id: ID!) {
    editConsequence (content: $content, id: $id ) {
      id
      content
    }
  }
`;
