import gql from 'graphql-tag';

export default gql`
  mutation SetTheme($id: ID!, $theme: String!) {
    setTheme (id: $id, theme: $theme) {
      id
      theme
    }
  }
`;
