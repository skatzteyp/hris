import gql from 'graphql-tag';

const INTERVIEW_CRITERIA = gql`
  fragment InterviewCriteria on InterviewCriteria {
    id
    sortOrder
    name
    percentage
    description
  }
`;

const GET_INTERVIEW_CRITERIAS = gql`
  query getInterviewCriterias {
    interviewCriterias: getInterviewCriterias {
      ...InterviewCriteria
    }
  }
  ${INTERVIEW_CRITERIA}
`;

const UPDATE_INTERVIEW_CRITERIA = gql`
  mutation updateInterviewCriteria(
    $id: ID!,
    $sortOrder: Int,
    $name:  String,
    $percentage: String,
    $description: String
  ){
    interviewCriteria: updateInterviewCriteria(
      id: $id,
      sortOrder: $sortOrder,
      name: $name,
      percentage: $percentage,
      description: $description
    ) {
      ...InterviewCriteria
    }
  }
  ${INTERVIEW_CRITERIA}
`;

const ADD_INTERVIEW_CRITERIA = gql`
  mutation addInterviewCriteria(
    $sortOrder: Int,
    $name: String,
    $percentage: String,
    $description: String
  ) {
    interviewCriteria: createInterviewCriteria(
      sortOrder: $sortOrder,
      name: $name,
      percentage: $percentage,
      description: $description
    ) {
      ...InterviewCriteria
    }
  }
  ${INTERVIEW_CRITERIA}
`;

const DELETE_INTERVIEW_CRITERIA = gql`
  mutation deleteInterviewCriteria(
    $id: ID!
  ) {
    interviewCriteria: deleteInterviewCriteria(
      id: $id
    ) {
      ...InterviewCriteria
    }
  }
  ${INTERVIEW_CRITERIA}
`;

export const queries = {
  GET_INTERVIEW_CRITERIAS,
  UPDATE_INTERVIEW_CRITERIA,
  ADD_INTERVIEW_CRITERIA,
  DELETE_INTERVIEW_CRITERIA,
}
