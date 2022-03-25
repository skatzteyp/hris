import gql from 'graphql-tag';

const APPLICANT_INFO = gql`
  fragment ApplicantInfo on Applicant {
      jobTitle {
        id
        name
      }
      level {
        id
        name
      }
      referrer {
        id
        firstName
        lastName
      }
      referrerName
      source {
        id
        name
      }
      appliedAt
      dueDate
      status {
        id
        name
      }
      validity {
        id
        name
      }
      resume
      email
      mobileNumber
      secondaryContactNumber
      dateOfBirth
      age
      maritalStatus {
        id
        name
      }
      homeAddress {
        address1
      }
      currentAddress {
        address1
      }
      fatherName
      motherName
      spouseName
      sss
      tin
      philhealth
      pagibig
      educationalAttainment {
        id
        name
      }
      school
      course
      workHistories {
        id
        company
        position
        startDate
        endDate
        present
        yearsExperience {
          id
          name
        }
        compensationPackage {
          id
          name
        }
      }
      portfolios {
        id
        link
      }
      notes
      isFavorite
      applicantOnboarding {
        acceptedJobOffer
      }
  }
`;

const APPLICANT_INTERVIEW = gql`
  fragment ApplicantInterview on Interview {
    id
    scheduleDate
    notes
    interviewer {
      id
      firstName
      lastName
    }
    criteriaPoints {
      id
      criteria {
        id
        name
        description
        percentage
      }
      points
      comment
    }
  }
`;

const APPLICANT_EXAM = gql`
  fragment ApplicantExam on ApplicantExam {
    id
    dueDate
    output
    reviewer {
      id
      firstName
      lastName
    }
    reviewDate
    applicantExamScores {
      id
      applicantExamSpecification {
        id
        description
      }
      score
      remark
    }
    applicantExamScreenshots {
      id
      link
    }
    notes
    examRating {
      id
      name
    }
    exam {
      id
      specifications {
        id
        description
      }
      link
    }
  }
`;

const APPLICANT_QUESTIONNAIRE = gql`
  fragment ApplicantQuestionnaire on Questionnaire {
    id
    questionsWithAnswers(first: 100) {
      edges {
        id
        answer
        node {
          id
          question
          questionCategory {
            id
            name
          }
        }
      }
    }
  }
`;

const APPLICANT_FINAL_INTERVIEW = gql`
  fragment ApplicantFinalInterview on ApplicantFinalInterview {
    id
    scheduleDate
    finalInterviewRating {
      id
      name
    }
    finalInterviewers {
      id
      notes
      finalInterviewer {
        id
        firstName
        lastName
      }
      finalInterviewerRating {
        id
        name
      }
    }
  }
`;

const APPLICANT_BACKGROUND = gql`
  fragment ApplicantBackground on ApplicantBackground {
    id
    notes
  }
`;

const APPLICANT_DOCUMENTATION = gql`
  fragment ApplicantDocumentation on ApplicantDocumentation {
    id
    url
  }
`;

const APPLICANT_CHARACTER_REFERENCE = gql`
  fragment ApplicantCharacterReference on ApplicantCharacterReference {
    id
    fullName
    position
    company
    email
    contactNumber
    notes
    status
  }
`;

const APPLICANT_ONBOARDING = gql`
  fragment ApplicantOnboarding on ApplicantOnboarding {
    id
    hiredDate
    startDate
    acceptedJobOffer
    applicantPreEmploymentRequirements {
      id
      status
      preEmploymentRequirement {
        id
        name
      }
    }
  }
`;

const APPLICANT = gql`
  fragment Applicant on Applicant {
    id
    firstName
    lastName
    ...ApplicantInfo
    applicantExam {
      ...ApplicantExam
    }
    interview {
      ...ApplicantInterview
    }
    questionnaire {
      ...ApplicantQuestionnaire
    }
    applicantFinalInterview {
      ...ApplicantFinalInterview
    }
    applicantBackground {
      ...ApplicantBackground
    }
    applicantDocumentations {
      ...ApplicantDocumentation
    }
    applicantCharacterReferences {
      ...ApplicantCharacterReference
    }
    applicantOnboarding {
      ...ApplicantOnboarding
    }
  }
  ${APPLICANT_INFO}
  ${APPLICANT_EXAM}
  ${APPLICANT_INTERVIEW}
  ${APPLICANT_QUESTIONNAIRE}
  ${APPLICANT_FINAL_INTERVIEW}
  ${APPLICANT_BACKGROUND}
  ${APPLICANT_DOCUMENTATION}
  ${APPLICANT_CHARACTER_REFERENCE}
  ${APPLICANT_ONBOARDING}
`;


const GET_APPLICANT = gql`
  query getApplicant($id: ID!) {
    applicant: getApplicant(id: $id){
      ...Applicant
    }
  }
  ${APPLICANT}
`;

const GET_APPLICANTS = gql`
  query getApplicants(
    $page: Int,
    $sort: SortField!,
    $sortOrder: SortOrder!,
    $filter: ApplicantFilterInput,
    $search: String,
    $first: Int
  ) {
    applicants: getApplicants(
      page: $page,
      orderBy: {
        field: $sort,
        order: $sortOrder
      },
      filter: $filter,
      search: $search,
      first: $first
    ) {
      paginatorInfo {
        count
        currentPage
        firstItem
        lastItem
        lastPage
        perPage
        total
      }
      data {
        id
        firstName
        fullName
        lastName
        jobTitle {
          id
          name
        }
        level {
          id
          name
        }
        source {
          id
          name
        }
        appliedAt
        status {
          id
          name
        }
      }
    }
  }
`;

const UPDATE_APPLICANT = gql`
  mutation updateApplicant(
    $id: ID,
    $info: ApplicantInfoInput,
    $jobTitle: ConnectJobTitleBelongsToInput,
    $source: ConnectSourceBelongsToInput,
    $level: ConnectLevelBelongsToInput,
    $validity: ConnectValidityBelongsToInput,
    $maritalStatus: ConnectMaritalStatusBelongsToInput,
    $referrer: ConnectReferrerBelongsToInput,
    $educationalAttainment: ConnectEducationalAttainmentBelongsToInput,
    $homeAddress: ConnectHomeAddressBelongsToInput,
    $currentAddress: ConnectCurrentAddressBelongsToInput,
    $portfolios: UpdateApplicantPortfoliosHasMany,
    $status: ConnectStatusBelongsToInput,
    $notes: String,
    $isFavorite: Boolean,
    
  ) {
    applicant: upsertApplicant(
      id: $id
      applicantInfo: $info
      jobTitle: $jobTitle
      source: $source
      level: $level
      validity: $validity
      maritalStatus: $maritalStatus
      referrer: $referrer
      educationalAttainment: $educationalAttainment
      homeAddress: $homeAddress
      currentAddress: $currentAddress
      portfolios: $portfolios
      status: $status
      notes: $notes
      isFavorite: $isFavorite
    ) {
      ...Applicant
    }
  }
  ${APPLICANT}
`;

const UPDATE_APPLICANT_INTERVIEW = gql`
  mutation updateApplicantInterview(
    $id: Int,
    $interviewerId: Int,
    $applicantId: Int,
    $notes: String
    $scheduleDate: DateTime
  ) {
    interview: upsertInterview (
      id: $id
      interviewerId: $interviewerId
      applicantId: $applicantId
      notes: $notes
      scheduleDate: $scheduleDate
    ) {
      ...ApplicantInterview
    }
  }
  ${APPLICANT_INTERVIEW}
`;

const UPDATE_CRITERIA_POINT = gql`
  mutation updateCriteriaPoint(
    $id: ID,
    $interviewId: Int,
    $criteriaId: Int,
    $points: String,
    $comment: String
  ) {
    criteriaPoint: upsertCriteriaPoint(
      id: $id
      interviewId: $interviewId
      criteriaId: $criteriaId
      points: $points
      comment: $comment
    ) {
      id
      criteria {
        id
        name
        description
        percentage
      }
      points
      comment
    }
  }
`;

const UPDATE_APPLICANT_EXAM = gql`
  mutation updateApplicantExam(
    $id: Int,
    $jobTitleExamId: Int,
    $applicantExamDetails: ApplicantExamInput,
    $applicant: ConnectApplicantBelongsToInput,
    $reviewer: ConnectReviewerBelongsToInput,
    $applicantExamScores: UpdateApplicantExamScoresHasMany,
    $applicantExamScreenshots: UpdateApplicantExamScreenshotsHasMany
    $examRating: ConnectExamRatingBelongsToInput
  ) {
    applicantExam: upsertApplicantExam (
      id: $id
      jobTitleExamId: $jobTitleExamId
      applicantExamDetails: $applicantExamDetails
      applicant: $applicant
      reviewer: $reviewer
      applicantExamScores: $applicantExamScores
      applicantExamScreenshots: $applicantExamScreenshots
      examRating: $examRating

    ) {
      ...ApplicantExam
    }
  }
  ${APPLICANT_EXAM}
`;

const UPDATE_APPLICANT_QUESTIONNAIRE = gql`
  mutation updateApplicantQuestionnaire(
    $id: Int,
    $applicant: ConnectApplicantBelongsToInput,
    $answeredAt: DateTime
  ) {
    questionnaire: upsertQuestionnaire(
      id: $id
      applicant: $applicant
      answeredAt: $answeredAt
    ) {
      ...ApplicantQuestionnaire
    }
  }
  ${APPLICANT_QUESTIONNAIRE}
`;

const UPDATE_APPLICANT_FINAL_INTERVIEW = gql`
  mutation updateApplicantFinalInterview(
    $id: Int,
    $scheduleDate: DateTime,
    $applicant: ConnectApplicantBelongsToInput,
    $finalInterviewRating: ConnectFinalInterviewRatingBelongsToInput,
    $finalInterviewers: UpdateApplicantFinalInterviewersHasMany
  ) {
    applicantFinalInterview: upsertApplicantFinalInterview(
      id: $id
      scheduleDate: $scheduleDate
      applicant: $applicant
      finalInterviewRating: $finalInterviewRating
      finalInterviewers: $finalInterviewers
    ) {
      ...ApplicantFinalInterview
    }
  }
  ${APPLICANT_FINAL_INTERVIEW}
`;

const CREATE_APPLICANT_TOKEN = gql`
  mutation createToken(
    $applicantId: ID,
    $expiredDate: DateTime
  ) {
    token: upsertApplicantToken(
      expiredDate: $expiredDate
      applicant: {
        connect: $applicantId
      }
    ) {
      token
    }
  }
`;

const UPDATE_APPLICANT_BACKGROUND = gql`
  mutation createApplicantBackground(
    $id: ID,
    $applicantId: Int,
    $notes: String
  ) {
    applicantBackground: upsertApplicantBackground(
      id: $id
      applicantId: $applicantId
      notes: $notes
    ) {
      ...ApplicantBackground
    }
  }
  ${APPLICANT_BACKGROUND}
`;

const UPDATE_APPLICANT_DOCUMENTATION = gql`
  mutation updateApplicantDocumentation(
    $id: ID,
    $applicantId: Int,
    $url: String
  ) {
    applicantDocumentation: upsertApplicantDocumentation(
      id: $id
      applicantId: $applicantId
      url: $url
    ) {
      ...ApplicantDocumentation
    }
  }
  ${APPLICANT_DOCUMENTATION}
`;

const DELETE_APPLICANT_DOCUMENTATION = gql`
  mutation deleteApplicantDocumentation(
    $id: ID!
  ) {
    id: deleteApplicantDocumentation(
      id: $id
    ) {
      id
    }
  }
`;

const UPDATE_APPLICANT_CHARACTER_REFERENCE = gql`
  mutation updateApplicantCharacterReference(
    $id: ID,
    $applicantId: Int,
    $fullName: String,
    $position: String,
    $company: String,
    $email: String,
    $contactNumber: String,
    $notes: String,
    $status: Boolean
  ) {
    applicantCharacterReference: upsertApplicantCharacterReference(
      id: $id
      applicantId: $applicantId
      fullName: $fullName
      position: $position
      company: $company
      email: $email
      contactNumber: $contactNumber
      notes: $notes
      status: $status
    ) {
      ...ApplicantCharacterReference
    }
  }
  ${APPLICANT_CHARACTER_REFERENCE}
`;

const DELETE_APPLICANT_CHARACTER_REFERENCE = gql`
  mutation deleteApplicantCharacterReference(
    $id: ID!
  ) {
    id: deleteApplicantCharacterReference(
      id: $id
    ) {
      id
    }
  }
`;

const UPDATE_APPLICANT_ONBOARDING = gql`
  mutation updataApplicantOnboarding(
    $id: Int,
    $applicantOnboardingInfo: ApplicantOnboardingInput,
    $applicant: ConnectApplicantBelongsToInput,
    $applicantPreEmploymentRequirements: UpdateApplicantPreEmploymentRequirementsHasMany
  ) {
    applicantOnboarding: upsertApplicantOnboarding(
      id: $id,
      applicantOnboardingInfo: $applicantOnboardingInfo,
      applicant: $applicant,
      applicantPreEmploymentRequirements: $applicantPreEmploymentRequirements
    ) {
      ...ApplicantOnboarding
    }
  }
  ${APPLICANT_ONBOARDING}
`;

const APPLICANT_PUBLIC = gql`
  fragment ApplicantPublic on ApplicantPublic {
    id
    firstName
    lastName
    fullName
    jobTitle {
      id
      name
    }
    level {
      id
      name
    }
    source {
      id
      name
    }
    appliedAt
    validity {
      id
      name
    }
    status {
      id
      name
    }
    referrer {
      id
      firstName
      lastName
    }
    resume
    email
    mobileNumber
    secondaryContactNumber
    dateOfBirth
    maritalStatus {
      id
      name
    }
    age
    homeAddress {
      address1
    }
    currentAddress {
      address1
    }
    fatherName
    motherName
    spouseName
    sss
    tin
    philhealth
    pagibig
    educationalAttainment {
      id
      name
    }
    course
    school
    workHistories {
      id
      company
      position
      startDate
      endDate
      present
      yearsExperience {
        id
        name
      }
      compensationPackage {
        id
        name
      }
    }
    portfolios {
      id
      link
    }
  }
`;

const GET_APPLICANT_PUBLIC = gql`
  query getApplicantPublic(
    $token: String!,
    $id: Int!
  ){
    applicant: getApplicantPublic(
      token: $token,
      id: $id
    ) {
      ...ApplicantPublic
    }
  }
  ${APPLICANT_PUBLIC}
`;

const UPDATE_APPLICANT_PUBLIC = gql`
  mutation updateApplicantPublic(
    $token: String!,
    $id: Int!,
    $applicantInfo: ApplicantInfoInput,
    $jobTitle: ConnectJobTitleBelongsToInput,
    $level: ConnectLevelBelongsToInput,
    $source: ConnectSourceBelongsToInput,
    $maritalStatus: ConnectMaritalStatusBelongsToInput,
    $educationalAttainment: ConnectEducationalAttainmentBelongsToInput,
    $homeAddress: ConnectHomeAddressBelongsToInput,
    $currentAddress: ConnectCurrentAddressBelongsToInput,
    $portfolios: UpdateApplicantPortfoliosHasMany,
    $workHistories: UpdateApplicantWorkHistoriesHasMany
  ) {
    applicant: updateApplicantPublic(
      token: $token,
      id: $id,
      applicantInfo: $applicantInfo,
      jobTitle: $jobTitle,
      level: $level,
      source: $source,
      maritalStatus: $maritalStatus,
      educationalAttainment: $educationalAttainment,
      homeAddress: $homeAddress,
      currentAddress: $currentAddress,
      portfolios: $portfolios,
      workHistories: $workHistories
    ) {
      ...ApplicantPublic
    }
  }
  ${APPLICANT_PUBLIC}
`;

const CREATE_APPLICANT_PUBLIC = gql`
  mutation createApplicantPublic(
    $applicantInfo: ApplicantInfoInput,
    $jobTitle: ConnectJobTitleBelongsToInput,
    $level: ConnectLevelBelongsToInput,
    $status: ConnectStatusBelongsToInput,
    $source: ConnectSourceBelongsToInput,
    $maritalStatus: ConnectMaritalStatusBelongsToInput,
    $educationalAttainment: ConnectEducationalAttainmentBelongsToInput,
    $homeAddress: ConnectHomeAddressBelongsToInput,
    $currentAddress: ConnectCurrentAddressBelongsToInput,
    $portfolios: UpdateApplicantPortfoliosHasMany,
    $workHistories: UpdateApplicantWorkHistoriesHasMany
  ) {
    applicant: createApplicantPublic(
      applicantInfo: $applicantInfo,
      jobTitle: $jobTitle,
      level: $level,
      status: $status,
      source: $source,
      maritalStatus: $maritalStatus,
      educationalAttainment: $educationalAttainment,
      homeAddress: $homeAddress,
      currentAddress: $currentAddress,
      portfolios: $portfolios,
      workHistories: $workHistories
    ) {
      ...ApplicantPublic
    }
  }
  ${APPLICANT_PUBLIC}
`;

export const queries = {
  GET_APPLICANT,
  GET_APPLICANTS,
  UPDATE_APPLICANT,
  UPDATE_APPLICANT_INTERVIEW,
  UPDATE_CRITERIA_POINT,
  UPDATE_APPLICANT_EXAM,
  UPDATE_APPLICANT_QUESTIONNAIRE,
  CREATE_APPLICANT_TOKEN,
  UPDATE_APPLICANT_FINAL_INTERVIEW,
  UPDATE_APPLICANT_BACKGROUND,
  UPDATE_APPLICANT_DOCUMENTATION,
  UPDATE_APPLICANT_CHARACTER_REFERENCE,
  DELETE_APPLICANT_DOCUMENTATION,
  DELETE_APPLICANT_CHARACTER_REFERENCE,
  UPDATE_APPLICANT_ONBOARDING,
  GET_APPLICANT_PUBLIC,
  UPDATE_APPLICANT_PUBLIC,
  CREATE_APPLICANT_PUBLIC
}
