import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dashboard,
  Well,
  Button,
  Tabs,
  Tab,
  Loader,
} from '@ligph/ui';

import ApplicantOverview from '../../components/recruitment/ApplicantOverview';
import ApplicantInfo from '../../components/recruitment/ApplicantInfo';
import ApplicantInitialInterview from '../../components/recruitment/ApplicantInitialInterview';
import ApplicantExam from '../../components/recruitment/ApplicantExam';
import ApplicantPrefinalInterview from '../../components/recruitment/ApplicantPrefinalInterview';
import ApplicantFinalInterview from '../../components/recruitment/ApplicantFinalInterview';
import ApplicantBackground from '../../components/recruitment/ApplicantBackground';
import ApplicantOnboarding from '../../components/recruitment/ApplicantOnboarding';
import ApplicantSummary from '../../components/recruitment/ApplicantSummary';
import ApplicantActions from '../../components/recruitment/ApplicantActions';

import useModules from '../../hooks/useModules';
import useConstants from '../../hooks/useConstants';

import {
  getApplicant,
  updateApplicant,
  updateInterview,
  updateExam,
  updateQuestionnaire,
  updateFinalInterview,
  updateBackground,
  updateOnboarding,
  favoriteApplicant,
  acceptedJobOffer as acceptJobOffer,
} from '../../redux/modules/applicant/applicantActions';
import { getInterviewCriterias } from '../../redux/modules/interviewCriteria/interviewCriteriaActions';
import { routes } from '../../utils/routes';
import { dashboard }from '../../utils/dashboard';
import { CONSTANTS } from '../../utils/constants';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';
import { ReactComponent as IconSummary } from '../../assets/images/icon-summary.svg';

const ApplicantDetailPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    applicant: { applicant },
    interviewCriteria: { interviewCriterias }
  } = useSelector(store => store);
  const constants = useConstants();

  const { applicant: { isFavorite }} = useSelector(store => store.applicant);

  const { id } = useParams();
  const [modules, setModule] = useModules();
  const [selectedTab, setSelectedTab] = useState(CONSTANTS.STATUS.NEW);
  const [summary, setSummary] = useState(false);
  const [error, setError] = useState(false);

  const [favorite, setFavorite] = useState(applicant.isFavorite);
  const [jobOffer, setJobOffer] = useState(applicant.applicantOnboarding.acceptedJobOffer);

  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(getApplicant({ id }));
    }
  }, [ id, dispatch ]);

  useEffect(() => {
    dispatch(getInterviewCriterias());
  }, [ interviewCriterias, dispatch ]);

  useEffect(() => {
    setFavorite(applicant.isFavorite)
  }, [isFavorite, applicant]);

  const handleFavorite = (args) => {
    setFavorite(!favorite);
    dispatch(favoriteApplicant({ id, isFavorite: args }));
  }

  useEffect(() => {
    setJobOffer(applicant.applicantOnboarding.acceptedJobOffer)
  }, [applicant.applicantOnboarding.acceptedJobOffer]);

  const handleAcceptedJobOffer = (args) => {
    setJobOffer(args);
    dispatch(acceptJobOffer({ id: applicant.applicantOnboarding.id, applicantOnboardingInfo: {  acceptedJobOffer : args }}));
  }

  const handleNext = () => {

    if (selectedTab === +applicant.status.id) {
      switch(+applicant.status.id + 1) {
        case CONSTANTS.STATUS.INITIAL:
          dispatch(updateInterview({ applicantId: applicant.id }));
          break;
        case CONSTANTS.STATUS.EXAM:
          const jobTitleExam = constants.examinations.find((exam) => {
            return exam.jobTitleId === +applicant.jobTitle.id && exam.levels.find((level) => (level.id === applicant.level.id));
          });

          let data = { applicant: { connect: applicant.id } };

          if (jobTitleExam) {
            data.jobTitleExamId = jobTitleExam.id;
          }

          dispatch(updateExam(data));
          break;
        case CONSTANTS.STATUS.PREFINAL:
          dispatch(updateQuestionnaire({ applicant: { connect: applicant.id }}));
          break;
        case CONSTANTS.STATUS.FINAL:
          dispatch(updateFinalInterview({ applicant: { connect: applicant.id }}));
          break;
        case CONSTANTS.STATUS.BACKGROUND:
          dispatch(updateBackground({ applicantId: applicant.id }));
          break;
        case CONSTANTS.STATUS.ONBOARDING:
          dispatch(updateOnboarding({ applicant: { connect: applicant.id }}));
          break;
        default:
          break;
      }

      const data = {
        id: applicant.id,
        status: {
          connect: +applicant.status.id + 1
        }
      };

      dispatch(updateApplicant(data));
    }

    if (!error) {
      setSelectedTab(selectedTab + 1);
    }
  }

  return (
    <Dashboard
      menuItems={dashboard.getMenu('recruitment', 'applicants')}
      modules={modules}
      onModuleChange={setModule}
      module="Recruitment"
    >
      {applicant.id ?
        <>
          <ApplicantSummary
            show={summary}
            onClose={() => setSummary(false)}
          />
          <div className="flex justify-between items-center px-12 mt-4">
            <div className="flex">
              <Button
                color="white"
                onClick={() => history.push(routes.recruitment.applicantList)}
                className="mr-5"
              >
                <IconBack className="fill-current" />
              </Button>
              <h2 className="text-white text-3xl font-medium">Applicant Detail</h2>
            </div>
            <Button color="white" onClick={() => setSummary(true)}>
              <IconSummary className="fill-current mr-3" />
              Summary
            </Button>
          </div>

          <div className="mt-6">
            <ApplicantOverview onFavorite={handleFavorite} favorite={favorite}/>
          </div>

          <div className="mt-4 px-12">
            <Tabs selected={selectedTab} onChange={setSelectedTab}>
              <Tab label="Info" value={CONSTANTS.STATUS.NEW}>
                <Well className="p-8">
                  <ApplicantInfo valid={setError} />
                </Well>
              </Tab>
              <Tab label="Initial" value={CONSTANTS.STATUS.INITIAL} disabled={applicant.status.id < CONSTANTS.STATUS.INITIAL}>
                <Well className="p-8">
                  <ApplicantInitialInterview
                    criterias={interviewCriterias}
                    valid={setError}
                  />
                </Well>
              </Tab>
              <Tab label="Examination" value={CONSTANTS.STATUS.EXAM} disabled={applicant.status.id < CONSTANTS.STATUS.EXAM}>
                <ApplicantExam valid={setError} />
              </Tab>
              <Tab label="Prefinal" value={CONSTANTS.STATUS.PREFINAL} disabled={applicant.status.id < CONSTANTS.STATUS.PREFINAL}>
                <Well className="p-8">
                  <ApplicantPrefinalInterview valid={setError} />
                </Well>
              </Tab>
              <Tab label="Final" value={CONSTANTS.STATUS.FINAL} disabled={applicant.status.id < CONSTANTS.STATUS.FINAL}>
                <Well className="p-8">
                  <ApplicantFinalInterview valid={setError}/>
                </Well>
              </Tab>
              <Tab label="Background" value={CONSTANTS.STATUS.BACKGROUND} disabled={applicant.status.id < CONSTANTS.STATUS.BACKGROUND}>
                <Well className="p-8">
                  <ApplicantBackground applicant={applicant} valid={setError} />
                </Well>
              </Tab>
              <Tab label="Onboarding" value={CONSTANTS.STATUS.ONBOARDING} disabled={applicant.status.id < CONSTANTS.STATUS.ONBOARDING}>
                <Well className="p-8">
                  <ApplicantOnboarding applicant={applicant} valid={setError} onJobOffer={handleAcceptedJobOffer} jobOffer={jobOffer}/>
                </Well>
              </Tab>
            </Tabs>
          </div>

          <div className="px-12 py-4">
            <ApplicantActions applicant={applicant} onNext={handleNext} error={error} jobOffer={jobOffer} selectedTab={selectedTab}/>
          </div>
        </>
        : <div className="relative min-h-sm"><Loader /></div>
      }
    </Dashboard>
  )
}

export default ApplicantDetailPage;
