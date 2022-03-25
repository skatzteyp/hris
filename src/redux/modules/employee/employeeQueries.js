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

const EMPLOYEE_TRAINING_INFO = gql`
  fragment EmployeeTrainingInfo on EmployeeTraining {
    id
      trainingId
      employeeId
      comments
      completionLevel
      numberOfAttempts
      training {
        ...TrainingInfo
      }
      employee {
        id
        firstName
      }
      trainingHistories {
        id
        employeeTrainingId
        totalScore
        score
        numAttempts
        isPassed
        dateTaken
        dateFinish
        dueDate
      }
  }
  ${TRAINING_INFO}
  `

// const EMPLOYEE_INFO = gql`
//   fragment EmployeeInfo on Employee {
//     id
//     userId
//     firstName
//     middleName
//     lastName
//     salutation
//     nickname
//     employeeNo
//     dateOfBirth
//     identityNo
//     gender
//     user {
//       id
//       name
//       email
//     }
//   }
// `

const GET_EMPLOYEES = gql`
  query getEmployees {
    employees: getEmployees {
      id
      firstName
      lastName
    }
  }
`;

const GET_EMPLOYEE_TRAININGS = gql`
  query getEmployeeTrainings($trainingId: Int, 
    $employeeId: Int) {
    employeeTrainings: getEmployeeTrainings(trainingId: $trainingId, 
      employeeId: $employeeId) {
      id
      trainingId
      employeeId
      comments
      completionLevel
      numberOfAttempts
      training {
        ...TrainingInfo
      }
      employee {
        id
        firstName
      }
      trainingHistories {
        id
        employeeTrainingId
        totalScore
        score
        numAttempts
        isPassed
        dateTaken
        dateFinish
        dueDate
      }
    }
  }
  ${TRAINING_INFO}
`;

const CREATE_EMPLOYEE_TRAINING = gql`
  mutation createEmployeeTrainingHistory(
    $employeeTrainingId: Int,
    $totalScore: Int,
    $score: Int,
    $numAttempts: Int,
    $isPassed: Boolean,
    $dateTaken: DateTime,
    $dateFinish: DateTime,
    $dueDate: DateTime
  ) {
    employeeTrainingHistory: createEmployeeTrainingHistory(
      employeeTrainingId: $employeeTrainingId,
      totalScore: $totalScore,
      score: $score,
      numAttempts: $numAttempts,
      isPassed: $isPassed,
      dateTaken: $dateTaken,
      dateFinish: $dateFinish,
      dueDate: $dueDate
    ) {
      id
      employeeTrainingId
      totalScore
      score
      numAttempts
      isPassed
      dateTaken
      dateFinish
      dueDate
    }
  }
`

const UPDATE_EMPLOYEE_TRAINING = gql`
mutation updateEmployeeTraining($id: ID! $completionLevel: Int) {
  employeeTraining: updateEmployeeTraining(
    id: $id,
    completionLevel: $completionLevel
  ) {
    ...EmployeeTrainingInfo
  }
}
${EMPLOYEE_TRAINING_INFO}
`
const CREATE_EMPLOYEE_TRAINING_TOPICS = gql`
  mutation upsertEmployeeTraining($trainingId: Int, $employeeId: Int){
   upsertEmployeeTraining: upsertEmployeeTraining(
      trainingId: $trainingId,
      employeeId: $employeeId
  ){
    id
    trainingId
    completionLevel
    }
  }
`

export const queries = {
  GET_EMPLOYEES,
  CREATE_EMPLOYEE_TRAINING,
  CREATE_EMPLOYEE_TRAINING_TOPICS,
  UPDATE_EMPLOYEE_TRAINING,
  GET_EMPLOYEE_TRAININGS,
};
