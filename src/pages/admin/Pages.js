import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../utils/routes';
import PrivateRoute from '../../components/common/PrivateRoute';

import DashboardPage from './DashboardPage';
import ApplicationListPage from './ApplicationListPage';
import ApplicationDetailPage from './ApplicationDetailPage';
import OnboardingSetupPage from './OnboardingSetupPage';
import OnboardingDetailPage from './OnboardingDetailPage';
import TrainingTopicsPage from './TrainingTopicsPage';
import TrainingDetailPage from './TrainingDetailPage';
import TrainingCurriculumPage from './TrainingCurriculumPage';
import TrainingCurriculumNew from './TrainingCurriculumNew';
import TrainingCurriculumDetailPage from './TrainingCurriculumDetailPage';
import CustomizationPage from './CustomizationPage';
import ApplicantStatusPage from './ApplicantStatusPage';
import CompensationPackagePage from './CompensationPackagePage';
import EducationalAttainmentPage from './EducationalAttainmentPage';
import GenderPage from './GenderPage';
import JobTitlePage from './JobTitlePage';
import LevelPage from './LevelPage';
import MaritalStatusPage from './MaritalStatusPage';
import PreEmploymentRequirementPages from './PreEmploymentRequirementPages';
import SourcePage from './SourcePage';
import ValidityPage from './ValidityPage';
import YearsExperiencePage from './YearsExperiencePage';
import FormsPage from './FormsPage'
import InitialInterviewPage from './InitialInterviewPage'
import ExamResultsPage from './ExamResultsPage'
import PrefinalInterviewPage from './PrefinalInterviewPage';
import EditFormsPage from './EditFormsPage';

const AdminPages = () => (
  <Switch>
    <Route exact path={routes.admin.dashboard}>
      <DashboardPage />
    </Route>
    <PrivateRoute exact path={routes.admin.applicationList}>
      <ApplicationListPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.applicationDetail}>
      <ApplicationDetailPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.admin.onboardingList}>
      <OnboardingSetupPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.onboardingDetail}>
      <OnboardingDetailPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.admin.trainingList}>
      <TrainingTopicsPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.trainingDetail}>
      <TrainingDetailPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.admin.curriculumList}>
      <TrainingCurriculumPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.admin.curriculumNew}>
      <TrainingCurriculumNew />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.curriculumDetail}>
      <TrainingCurriculumDetailPage />
    </PrivateRoute>
    <PrivateRoute exact path={routes.admin.customization}>
      <CustomizationPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.applicantStatus}>
      <ApplicantStatusPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.compensationPackage}>
      <CompensationPackagePage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.educationalAttainment}>
      <EducationalAttainmentPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.gender}>
      <GenderPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.jobTitle}>
      <JobTitlePage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.level}>
      <LevelPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.maritalStatus}>
      <MaritalStatusPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.preemploymentRequirement}>
      <PreEmploymentRequirementPages />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.source}>
      <SourcePage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.validity}>
      <ValidityPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.yearsExperience}>
      <YearsExperiencePage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.editForms}>
      <EditFormsPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.customization}>
      <CustomizationPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.prefinalInterview}>
      <PrefinalInterviewPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.examResults}>
      <ExamResultsPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.initialInterview}>
      <InitialInterviewPage />
    </PrivateRoute>
    <PrivateRoute path={routes.admin.forms}>
      <FormsPage />
    </PrivateRoute>
  </Switch>
);

export default AdminPages;
