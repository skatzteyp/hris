import gql from 'graphql-tag';

const GET_EXAMINATIONS = gql`
  query getExaminations(
    $jobTitle: Int,
    $level: Int
  ) {
    examinations: getJobTitleExams(
      jobTitleId: $jobTitle,
      levelId: $level
    ) {
      id
      specifications {
        id
        description
      }
    }
  }
`;

export const queries = {
  GET_EXAMINATIONS
}
