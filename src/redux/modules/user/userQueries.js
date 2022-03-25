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

const USERS = gql`
  query Users($first: Int!, $page: Int) {
    users(first:$first, page: $page) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
      data {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

const USER = gql`
  query User($id: ID!){
    user(id: $id) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const queries = {
  USERS,
  USER
}
