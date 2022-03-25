import gql from 'graphql-tag';

const TRAINING_INFO = gql`
  fragment TrainingInfo on Training {
    id
    title
    description
    prerequisite {
      prerequisiteTrainingId
      title
      description
    }
    video {
      id
      title
      description
      sourcePath
    }
    slideshow {
      id
      title
      description
      content
    }
    handsOn {
      id
      title
      description
      content
      password
    }
    jobTitles {
      id
      name
    }
    exam {
      id
      title
      instruction
      passingScore
      questions {
         id
         question
         choices {
            id
            text
            isCorrect
            sortOrder
            question {
              id
            }
         }
      }
    }
    categories {
      id
      name
    }
    categoryDetails {
      id
      training_id 
      category {
        id
        name
      }
    }
  }
`
const TRAINING_VIDEO = gql`
  fragment TrainingVideo on TrainingVideo {
    id
    trainingId
    title
    description
    sourcePath
  }
`

const TRAINING_SLIDE_SHOW = gql`
  fragment TrainingSlideshow on TrainingSlideshow {
    id
    trainingId
    title
    description
    content
  }
`

const TRAINING_EXAM = gql`
  fragment TrainingExam on TrainingExam {
    id,
    title
    questions {
      id
      question
      choices {
        id
        text
        sortOrder
        isCorrect
        question {
          id
        }
      }
    }
  }
`
const TRAINING_HANDSON = gql`
  fragment TrainingHandsOn on TrainingHandsOn {
    id
    trainingId
    title
    description
    content
    password
  }
`

const TRAINING_QUESTION = gql`
  fragment TrainingQuestion on TrainingQuestion {
    id
    question
    choices {
      id
      text
      sortOrder
      isCorrect
      question {
        id
      }
    }
    sortOrder
  }
`

const TRAINING_CHOICE = gql`
  fragment TrainingChoice on TrainingChoice {
    id
    text
    isCorrect
    sortOrder
    question {
      id
      choices {
        id
        text
        isCorrect
        question {
          id
        }
      }
    }
  }
`
const GET_TRAININGS = gql`
query getTrainings($prerequisiteTrainingId: Int, $jobTitleId: Int, $categoryId: Int, $first: Int, $page: Int, $training_title: String) {
    getTrainings(prerequisiteTrainingId: $prerequisiteTrainingId, jobTitleId: $jobTitleId, categoryId: $categoryId, first: $first, page: $page, training_title: $training_title) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        perPage
        total
        lastItem
        lastPage
      }
      data {
        id
        title
        description
        exam {
          id
          questions {
            id
            question
          }
        }
        categories {
          id
          name
        }
        categoryDetails {
          id
          training_id
          category {
            id
            name
          }
        }
      }
    }
  }
`

const GET_TRAINING = gql`
query getTraining($id: ID) {
  getTraining(id:$id){
    ...TrainingInfo
  }
}
${TRAINING_INFO}
`

const UPDATE_TRAINING = gql`
mutation upsertTraining($id: Int, $prerequisiteTrainingId: Int, $title: String, $description: String) {
  upsertTraining(id: $id, prerequisiteTrainingId: $prerequisiteTrainingId, title:$title, description:$description) {
    ...TrainingInfo
  }
}
${TRAINING_INFO}
`

const UPDATE_TRAINING_SLIDE_SHOW = gql`
mutation upsertTrainingSlideshow($id: ID, $trainingId: Int, $title: String, $description: String, $content: String) {
  upsertTrainingSlideshow(id: $id, trainingId: $trainingId, title:$title, description:$description, content: $content) {
    ...TrainingSlideshow
  }
} 
${TRAINING_SLIDE_SHOW}
`

const UPDATE_TRAINING_VIDEO = gql`
mutation upsertTrainingVideo($id: ID, $trainingId: Int, $title: String, $description: String, $sourcePath: String) {
  upsertTrainingVideo(id: $id, trainingId: $trainingId, title:$title, description:$description, sourcePath: $sourcePath) {
    ...TrainingVideo
  }
} 
${TRAINING_VIDEO}`

const UPDATE_TRAINING_HANDS_ON = gql`
mutation upsertTrainingHandsOn($id: ID, $trainingId: Int, $title: String, $description: String, $content: String, $password: String) {
  upsertTrainingHandsOn(id: $id, trainingId: $trainingId, title:$title, description:$description, content: $content, password: $password) {
    ...TrainingHandsOn
  }
} 
${TRAINING_HANDSON}
`
const UPDATE_TRAINING_EXAM = gql`
mutation upsertTrainingExam($id: Int, $training: ConnectTrainingBelongsToInput, $title: String) {
  upsertTrainingExam(id: $id, training: $training, title: $title) {
    ...TrainingExam
  }
}
${TRAINING_EXAM}
`

const UPDATE_TRAINING_QUESTION = gql`
mutation upsertTrainingQuestion($id: Int, $examId: ID, $question: String, $sortOrder: Int) {
  upsertTrainingQuestion(id: $id, exam: { connect: $examId }, question: $question, sortOrder: $sortOrder) {
    ...TrainingQuestion
  }
}
${TRAINING_QUESTION}
`

const UPDATE_TRAINING_CHOICE = gql`
mutation upsertTrainingChoice($id: Int, $question: ConnectQuestionBelongsToInput, $text: String, $sortOrder: Int, $isCorrect: Boolean) {
  upsertTrainingChoice(id: $id,  question: $question, text: $text, sortOrder: $sortOrder, isCorrect: $isCorrect) {
    ...TrainingChoice
  }
}
${TRAINING_CHOICE}
`

const UPDATE_CATEGORY_BY_TRAINING = gql`
mutation upsertCategoryPerTraining($id: Int, $training_id: Int!, $category_id: Int!) {
  upsertCategoryPerTraining(id: $id, training_id: $training_id, category_id: $category_id) {
    id
    training_id
    category {
      id
      name
    }
  }
}
`
const UPDATE_TRAINING_CATEGORY = gql`
mutation upsertTrainingCategory($id: Int, $name: String) {
  upsertTrainingCategory(id: $id,  name: $name) {
      id
      name
  }
}
`

const GET_TRAINING_QUESTION = gql`
query getTrainingQuestions($id: ID) {
  getTrainingQuestion(id: $id) {
  ...TrainingQuestion
  }
}
${TRAINING_QUESTION}
`

const GET_LIST_CATEGORIES = gql`
query getListOfTrainingCategories {
  getListOfTrainingCategories {
    id
    name
  }
}
`;

const DELETE_CATEGORY_BY_TRAINING = gql`
mutation deleteCategoryPerTraining($id: ID!) {
  deleteCategoryPerTraining(id: $id) {
    id
    category_id
  }
}
`;
const DELETE_TRAINING_CHOICE = gql`
mutation deleteTrainingChoice($id: Int!) {
  deleteTrainingChoice(id: $id) {
    id
    question {
      id
    }
  }
}
`
const DELETE_TRAINING_QUESTION = gql`
mutation deleteTrainingQuestion($id: Int!) {
  deleteTrainingQuestion(id: $id) {
    id
  }
}
`

const DELETE_TRAINING = gql`
mutation deleteTraining($id: ID!) {
  deleteTraining(id: $id) {
    id
  }
}
`

export const queries = {
  GET_TRAININGS,
  GET_TRAINING,
  UPDATE_TRAINING,
  DELETE_TRAINING,
  UPDATE_TRAINING_VIDEO,
  UPDATE_TRAINING_SLIDE_SHOW,
  UPDATE_TRAINING_EXAM,
  UPDATE_TRAINING_QUESTION,
  DELETE_TRAINING_QUESTION,
  UPDATE_TRAINING_CHOICE,
  DELETE_TRAINING_CHOICE,
  UPDATE_TRAINING_HANDS_ON,
  UPDATE_CATEGORY_BY_TRAINING,
  UPDATE_TRAINING_CATEGORY,
  DELETE_CATEGORY_BY_TRAINING,
  GET_TRAINING_QUESTION,
  GET_LIST_CATEGORIES,
}
