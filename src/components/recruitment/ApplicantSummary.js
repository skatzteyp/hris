import React from 'react';
import { Button } from '@ligph/ui';

import ApplicantStatus from './ApplicantStatus';
import useApplicant from '../../hooks/useApplicant';

import { ReactComponent as IconPrint } from '../../assets/images/icon-print.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';

const ApplicantSummary = ({ show, onClose }) => {
  const { applicant } = useApplicant();

  return (
    <div className={`w-screen h-screen flex items-center justify-center fixed z-50 top-0 left-0 bg-black bg-opacity-75 ${show ? 'block' : 'hidden'}`}>
      <div className="w-10/12 h-10/12 relative">
        <Button className="absolute right-0 top-0 mx-8 my-10" onClick={onClose}>
          <IconX className="stroke-current stroke-2 text-black-300" />
        </Button>
        <div className="bg-white rounded px-8 py-10 text-black h-full overflow-scroll">
          <h2 className="text-xl font-medium">Summary of Applicant</h2>
          <dl className="flex mt-6">
            <div className="w-48">
              <dt className="text-xs font-medium">Applicant ID</dt>
              <dd className="text-sm font-light mt-1">{applicant.id}</dd>
            </div>
            <div className="w-48">
              <dt className="text-xs font-medium">Status</dt>
              <dd className="text-sm font-light">
                <ApplicantStatus status={applicant.status} />
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium">Validity</dt>
              <dd className="text-sm font-light mt-1">{applicant.validity.name}</dd>
            </div>
          </dl>
          <dl className="mt-8">
            <div className="flex">
              <dt className="text-xs font-medium w-48">Full Name</dt>
              <dd className="text-sm font-light">{`${applicant.firstName || ''} ${applicant.lastName || ''}`}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Age</dt>
              <dd className="text-sm font-light">{applicant.age}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Address</dt>
              <dd className="text-sm font-light">{applicant.currentAddress.address1}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Position Applied</dt>
              <dd className="text-sm font-light">{applicant.jobTitle.name}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Date Applied</dt>
              <dd className="text-sm font-light">{applicant.appliedAt}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Source</dt>
              <dd className="text-sm font-light">{applicant.source.name}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Job Post Level</dt>
              <dd className="text-sm font-light">{applicant.level.name}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Mobile Number</dt>
              <dd className="text-sm font-light">{applicant.mobileNumber}</dd>
            </div>
            <div className="flex mt-3">
              <dt className="text-xs font-medium w-48">Email Address</dt>
              <dd className="text-sm font-light">{applicant.email}</dd>
            </div>
          </dl>
          <div className="border-t border-b border-dashed border-black-100 mt-6 py-5 w-5/6">
            <label className="text-xs font-medium">Notes</label>
            <p className="text-sm font-light mt-1">{applicant.notes}</p>
          </div>
          <dl className="mt-6">
            <div className="flex">
              <div className="w-48">
                <dt className="text-xs font-medium">Exam Score</dt>
                <dd className="text-sm font-light mt-1">20/20</dd>
              </div>
              <div className="w-48">
                <dt className="text-xs font-medium">Final Rating</dt>
                <dd className="text-sm font-light mt-1">PASSED</dd>
              </div>
            </div>
            <div className="flex mt-6">
              <div className="w-48">
                <dt className="text-xs font-medium">Final Rating</dt>
                <dd className="text-sm font-light mt-1">N/A</dd>
              </div>
              <div className="w-48">
                <dt className="text-xs font-medium">Final Rating</dt>
                <dd className="text-sm font-light mt-1">FAILED</dd>
              </div>
            </div>
          </dl>
          <Button
            variant="fill"
            className="absolute m-8 right-0 bottom-0"
          >
            <IconPrint className="fill-current mr-2" />
            Print
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ApplicantSummary;
