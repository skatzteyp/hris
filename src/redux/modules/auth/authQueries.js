import gql from 'graphql-tag';

const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    email
    created_at
    updated_at
    employeeDetail {
      id
    }
  }
`;

const LOGIN = gql`
  mutation Login(
    $username: String!,
    $password: String!
  ) {
    login(input: {
      username: $username,
      password: $password
    }) {
      access_token
      refresh_token
      expires_in
      token_type
      user {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

const LOGOUT = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;

export const queries = {
  LOGIN,
  LOGOUT
}
