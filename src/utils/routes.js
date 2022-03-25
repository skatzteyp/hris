export const routes = {
  // common
  login         : '/login',
  logout        : '/logout',
  resetPassword : '/reset-password',
  settings      : '/settings',
  // recruitement module
  recruitment: {
    dashboard         : '/recruitment',
    applicantList     : '/recruitment/applicants',
    applicantNew      : '/recruitment/applicants/new',
    applicantDetail   : '/recruitment/applicants/:id',
    reports           : '/recruitment/reports',
    applicantInfo     : '/recruitment/applicants/:id/info',
    applicantPrefinal : '/recruitment/applicants/:id/prefinal'
  },
  // training module
  training: {
    dashboard        : '/training',
    onboardingList   : '/training/onboarding',
    onboardingDetail : '/training/onboarding/:id',
    trainingList     : '/training/trainings',
    trainingDetail   : '/training/trainings/:id',
    results          : '/training/results',
    articles         : '/training/articles'
  },
  // admin training module
  admin: {
    dashboard         : '/admin',
    applicationList   : '/admin/applications',
    applicationDetail : '/admin/applications/:id',
    onboardingList    : '/admin/onboarding',
    onboardingDetail  : '/admin/onboarding/:id',
    trainingList      : '/admin/trainings',
    trainingDetailNew  : '/admin/trainings/new',
    trainingDetail    : '/admin/trainings/:id',
    curriculumList    : '/admin/curriculums',
    curriculumNew     : '/admin/curriculums/new',
    curriculumDetail  : '/admin/curriculums/:id/edit',
    customization     : '/admin/fields',
    applicantStatus   : '/admin/fields/applicant-status',
    compensationPackage   : '/admin/fields/compensation',
    educationalAttainment   : '/admin/fields/educational',
    gender            : '/admin/fields/gender',
    jobTitle          : '/admin/fields/job-title',
    level             : '/admin/fields/job-level',
    maritalStatus     : '/admin/fields/marital-status',
    preemploymentRequirement   : '/admin/fields/pre-employment-requirements',
    source            : '/admin/fields/source',
    validity          : '/admin/fields/validity',
    yearsExperience   : '/admin/fields/years-experience',
    forms             : '/admin/forms',
    initialInterview  : '/admin/forms/initial-interview',
    examResults       : '/admin/forms/exam-results',
    prefinalInterview : '/admin/forms/pre-final-interview',
    editForms         : '/admin/fields/edit-forms',
  },
  // personnel module
  personnel: {
    dashboard        : '/personnel',
    list             : '/personnel/list',
    documents        : '/personnel/documents',
    reports          : '/personnel/reports',
    employeeDetail   : '/personnel/employee-detail',
    requestDocument  : '/personnel/request-document',
  }
}

export const route = (r, data) => {
  let paths = r.split('/');

  paths.forEach((path, i) => {
    if (path.charAt(0) === ':') {
      paths[i] = data[path.replace(':', '')];
    }
  });

  return paths.join('/');
}
