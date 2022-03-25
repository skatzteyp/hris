import gql from 'graphql-tag';

const TRAINING_CURRICULUM_LIST_INFO = gql`
  fragment TrainingCurriculumListInfo on TrainingCurriculumPaginator {
    paginatorInfo {
      currentPage
      total
      perPage
    }
    data {
      id
      name
      jobTitleId
      levelId
      level {
        id
        name
      }
      jobTitle {
        id
        name
      }
      trainingTopics {
        title
        description
        pivot {
          id
          trainingCurriculumId
          trainingId
        }
      }
    }
  }
`

const TRAINING_CURRICULUM_INFO = gql`
  fragment TrainingCurriculumInfo on TrainingCurriculum {
    id
    name
    jobTitleId
    levelId
    level {
      id
      name
    }
    jobTitle {
      id
      name
    }
    trainingTopics {
      title
      description
      pivot {
        id
        trainingCurriculumId
        trainingId
      }
    }
  }
`

const GET_TRAINING_CURRICULUMS = gql`
  query getTrainingCurriculums($page: Int, $name: String, $jobTitleId: [Int], $levelId: [Int], $isAdmin: Boolean, $first: Int)  {
    getTrainingCurriculums(input: {is_admin: $isAdmin, job_title_id: $jobTitleId,
                                   level_id: $levelId }, name: $name , page: $page, first: $first ) {
      ...TrainingCurriculumListInfo
    }
  }
${TRAINING_CURRICULUM_LIST_INFO}
`;

const UPSERT_TRAINING_CURRICULUM = gql`
  mutation upsertTrainingCurriculum($id: Int, $name: String, $jobTitleId: Int, $levelId: Int) {
    upsertTrainingCurriculum(id: $id, name: $name, jobTitleId: $jobTitleId, levelId: $levelId ) {
      ...TrainingCurriculumInfo
    }
  }
${TRAINING_CURRICULUM_INFO}
`;

const GET_TRAINING_CURRICULUM = gql`
  query getTrainingCurriculum($id: ID) {
    getTrainingCurriculum(id: $id) {
      ...TrainingCurriculumInfo
    }
  }
${TRAINING_CURRICULUM_INFO}
`;

const ADD_TRAINING_CURRICULUM_TOPIC = gql`
  mutation upsertTrainingCurriculumTopic($trainingCurriculumId: Int, $trainingId: Int) {
    upsertTrainingCurriculumTopic(trainingCurriculumId: $trainingCurriculumId, trainingId: $trainingId) {
      id
      trainingId
      trainingCurriculumId
    }
  }
`;

const DELETE_TRAINING_CURRICULUM_TOPIC = gql`
  mutation deleteTrainingCurriculumTopic($id: Int!) {
    deleteTrainingCurriculumTopic(id: $id) {
      id
    }
  }
`;

export const queries = {
  GET_TRAINING_CURRICULUMS,
  GET_TRAINING_CURRICULUM,
  UPSERT_TRAINING_CURRICULUM,
  ADD_TRAINING_CURRICULUM_TOPIC,
  DELETE_TRAINING_CURRICULUM_TOPIC,
};
