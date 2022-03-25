import gql from 'graphql-tag';

const GET_CONSTANTS = gql`
  query constants {
    jobTitles: getJobTitles {
      id
      name
    }

    levels: getLevels {
      id
      name
    }

    sources: getSources {
      id
      name
    }

    statuses: getApplicantStatuses {
      id
      name
    }

    validities: getValidities {
      id
      name
    }

    maritalStatuses: getMaritalStatuses {
      id
      name
    }

    educationalAttainments: getEducationalAttainments {
      id
      name
    }

    yearsExperiences: getYearsExperiences {
      id
      name
    }

    compensationPackages: getCompensationPackages {
      id
      name
    }

    examRatings: getExamRatings {
      id
      name
    }

    examinations: getJobTitleExams {
      id
      link
      jobTitleId
      levels {
        id
      }
      specifications {
        id
        description
      }
    }

    finalInterviewerRatings: getFinalInterviewerRatings {
      id
      name
    }

    finalInterviewRatings: getFinalInterviewRatings {
      id
      name
    }

    requirements: getPreEmploymentRequirements {
      id
      name
    }
  }
`;

const GET_CONSTANTS_PUBLIC = gql`
  query constants {
    jobTitles: getJobTitles {
      id
      name
    }

    levels: getLevels {
      id
      name
    }

    sources: getSources {
      id
      name
    }

    maritalStatuses: getMaritalStatuses {
      id
      name
    }

    educationalAttainments: getEducationalAttainments {
      id
      name
    }

    yearsExperiences: getYearsExperiences {
      id
      name
    }

    compensationPackages: getCompensationPackages {
      id
      name
    }
  }
`;

export const queries = {
  GET_CONSTANTS,
  GET_CONSTANTS_PUBLIC
};
