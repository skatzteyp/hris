import React, { useState } from 'react';
import { Well } from '@ligph/ui';

import ApplicantStatus from './ApplicantStatus';
import ApplicantNameEdit from './ApplicantNameEdit';
import useApplicant from '../../hooks/useApplicant';
import { CONSTANTS } from '../../utils/constants';

import { ReactComponent as IconEdit } from '../../assets/images/icon-edit.svg';
import { ReactComponent as IconHeart } from '../../assets/images/icon-heart-fill.svg';

const ApplicantOverview = ({ onFavorite, favorite }) => {
  const { applicant } = useApplicant();
  const [edit, setEdit] = useState(false);

  const getExamStatus = () => {
    if (applicant.status.id > CONSTANTS.STATUS.EXAM) {
      if (applicant.applicantExam.examRating) {
        return applicant.applicantExam.examRating.name.toUpperCase();
      }
      else {
        return 'NO DATA';
      }
    }
    else {
      return 'NOT APPLICABLE';
    }
  }

  const getOnboardingScore = () => {
    if (applicant.status.id >= CONSTANTS.STATUS.ONBOARDING) {
      if (applicant.applicantOnboarding) {
        let score = applicant.applicantOnboarding.applicantPreEmploymentRequirements.reduce((acc, curr) => (curr.status ? acc + 1 : acc), 0);
        let total = applicant.applicantOnboarding.applicantPreEmploymentRequirements.length;
        return `${score}/${total}`
      }
      else {
        return 'NA';
      }
    }
    else {
      return 'NA';
    }
  }

  const getOnboardingStatus = () => {
    if (applicant.status.id >= CONSTANTS.STATUS.ONBOARDING) {
      let score = applicant.applicantOnboarding.applicantPreEmploymentRequirements.reduce((acc, curr) => (curr.status ? acc + 1 : acc), 0);
      let total = applicant.applicantOnboarding.applicantPreEmploymentRequirements.length;

      if (score === total) {
        return 'COMPLETE';
      }
      else {
        return 'INCOMPLETE';
      }
    }
    else {
      return 'NOT APPLICABLE'
    }
  }

  const getTruncatedName = (applicantName) => {
    const maxLength = 35;

    if (applicantName.length > maxLength) {
      return applicantName.substring(0, maxLength) + '...';
    } else {
      return applicantName;
    }
  }

  return (
    <div className="px-12 flex text-black">
      <div className="flex-none mr-3" style={{ width: '550px' }}>
        <Well className="px-8 py-6">
          <div className="flex items-center relative">
            <p className="text-xl color-white font-semibold mr-2">
              {applicant.firstName || applicant.lastName ? getTruncatedName(`${applicant.firstName || ''} ${applicant.lastName || ''}`) : 'Click Here to Edit Name'}
            </p>
            <div className="relative">
              <IconEdit
                className="fill-current text-black-200 cursor-pointer"
                onClick={() => setEdit(true)}
              />
              {edit ?
                <ApplicantNameEdit applicant={applicant} onSave={() => setEdit(false)} onCancel={() => setEdit(false)}/>
                : null
              }
            </div>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <IconHeart
                className={`cursor-pointer fill-current ${favorite ? 'text-red' : 'text-black-200'}`}
                onClick={() => onFavorite(!favorite)}/>
            </span>
          </div>
          <dl className="flex flex-wrap">
            <div className="w-1/2 mt-5">
              <dt className="text-xs font-medium">Position Applied</dt>
              <dd className="text-sm font-light mt-1">{applicant.jobTitle.name || 'Not Set'}</dd>
            </div>
            <div className="w-1/2 mt-5">
              <dt className="text-xs font-medium">Level</dt>
              <dd className="text-sm font-light mt-1">{applicant.level.name || 'Not Set'}</dd>
            </div>
            {/* <div className="w-32 mt-5">
              <dt className="text-xs font-medium">Validity</dt>
              <dd className="text-sm font-light mt-1">{applicant.validity.name || 'Not Set'}</dd>
            </div> */}
            <div className="w-1/2 mt-4">
              <dt className="text-xs font-medium">Applicant ID</dt>
              <dd className="text-sm font-light mt-1">{applicant.id}</dd>
            </div>
            <div className="w-1/2 mt-4">
              <dt className="text-xs font-medium">Status</dt>
              <dd className="text-sm font-light">
                <ApplicantStatus status={applicant.status} />
              </dd>
            </div>
            {/* <div className="w-32 mt-4">
              <dt className="text-xs font-medium">Due Date</dt>
              <dd className="text-sm font-light mt-1">{applicant.dueDate || 'Not Set'}</dd>
            </div> */}
          </dl>
        </Well>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full h-1/2">
          <Well className="mr-3 w-1/2 flex flex-col item-center justify-center text-center">
            <p className="text-xs font-light">INITIAL INTERVIEW</p>
            <p className="text-xl font-semibold">
            {
              applicant.status.id > CONSTANTS.STATUS.INITIAL ?
                `${applicant.interview.criteriaPoints.reduce((acc, curr) => (acc + +curr.points), 0)}/${applicant.interview.criteriaPoints.length * 3}`
                : 'NA'
            }
            </p>
            <span className="text-xxs font-medium">{applicant.status.id > CONSTANTS.STATUS.INITIAL ? 'PASSED' : 'NOT APPLICABLE'}</span>
          </Well>
          <Well className="w-1/2 flex flex-col item-center justify-center text-center">
            <p className="text-xs font-light">EXAMINATION</p>
            <p className="text-xl font-semibold">
            {
              applicant.status.id > CONSTANTS.STATUS.EXAM ?
                `${applicant.applicantExam.applicantExamScores.reduce((acc, curr) => (acc + curr.score), 0)}/${applicant.applicantExam.applicantExamScores.length * 5}`
                : 'NA'
            }
            </p>
            <span className="text-xxs font-medium">{getExamStatus()}</span>
          </Well>
        </div>
        <div className="flex mt-3 h-1/2">
          <Well className="mr-3 w-1/2 flex flex-col item-center justify-center text-center">
            <p className="text-xs font-light">FINAL INTERVIEW</p>
            <p className="text-xl font-semibold">
              {
                applicant.status.id > CONSTANTS.STATUS.FINAL && applicant.applicantFinalInterview.finalInterviewRating ?
                  applicant.applicantFinalInterview.finalInterviewRating.name
                  : 'NA'

              }
            </p>
            <span className="text-xxs font-medium">{
              applicant.status.id > CONSTANTS.STATUS.FINAL && applicant.applicantFinalInterview.finalInterviewRating ?
                applicant.applicantFinalInterview.finalInterviewRating.name.toUpperCase() : 'NOT APPLICABLE'
              }
            </span>
          </Well>
          <Well className="w-1/2 flex flex-col item-center justify-center text-center">
            <p className="text-xs font-light">ONBOARDING</p>
            <p className="text-xl font-semibold">
              {getOnboardingScore()}
            </p>
            <span className="text-xxs font-medium">{getOnboardingStatus()}</span>
          </Well>
        </div>
      </div>
    </div>
  );
};

export default ApplicantOverview;
