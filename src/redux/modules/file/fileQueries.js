import gql from 'graphql-tag';

const UPLOAD = gql`
  mutation upload(
    $file: Upload!
  ) {
    filename: singleUpload(
      file: $file
    )
  }
`;

export const queries = {
  UPLOAD
}
