import React from 'react';
import moment from 'moment';

import {
  Well,
  Button,
  Dropdown
} from '@ligph/ui';

import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';
import { ReactComponent as IconRestore } from '../../assets/images/icon-restore.svg';

const ApplicantActions = ({ show, onClose, applicant, onNext, error, jobOffer, selectedTab }) => {
  console.log('applicant status:', parseInt(applicant.status.id))
  console.log(selectedTab)
  return (
    <>
      <div className={`w-screen h-screen flex items-center justify-center absolute z-50 top-0 left-0 bg-black bg-opacity-75 ${show ? 'block' : 'hidden'}`}>
        <div className="w-1/3 h-sm flex flex-col items-center justify-center overflow-scroll bg-white rounded px-4 py-4 text-black relative">
          <Button className="absolute right-0 top-0 m-5" onClick={onClose}>
            <IconX className="stroke-current stroke-2 text-black-300" />
          </Button>

          <p className="text-base text-black font-semibold uppercase">Applicant Rejected</p>
          <p className="text-sm font-light mt-2">Select action for applicant</p>

          <Button
            color="red"
            variant="outline"
            className="w-3/4 justify-center mt-6"
            onClick={() => {}}
          >
            Reprofile
          </Button>

          <Button
            color="red"
            variant="outline"
            className="w-3/4 justify-center mt-3"
            onClick={() => {}}
          >
            3 Month Rule
          </Button>

          <Button
            color="red"
            variant="outline"
            className="w-3/4 justify-center mt-3"
            onClick={() => {}}
          >
            Not Qualified
          </Button>
        </div>
      </div>

      {applicant.validity.name === 'VALID: New Entry' &&
        <Well className="p-6">
          <div className="flex justify-between items-center">
            <Button
              color="red"
              variant="outline"
            >
              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
              Block
            </Button>

            <div className="flex">
              <Button
                color="red"
                variant="outline"
                className="mr-4"
              >
                Reject
              </Button>
              <Button
                variant="fill"
                onClick={onNext}
                disabled={error || jobOffer === false || parseInt(applicant.status.id) > selectedTab}
              >
                Next Step
              </Button>
            </div>
          </div>
        </Well>
      }

      {(applicant.validity.name === 'VALID: Reapplication' || applicant.validity.name === 'VALID: Reprofile') &&
        <Well className="p-6">
          <div className="flex justify-end items-center">
            <Dropdown
              className="w-80 mr-10"
              label="Job Position"
              placeholder="Select a position"
              items={['FE', 'BE', 'DE']}
              value="Ruby Developer"
              onChange={() => {}}
            />

            <Dropdown
              className="w-80"
              label="Position Level"
              placeholder="Select a level"
              items={['Junior', 'Middle', 'Senior']}
              value="Senior"
              onChange={() => {}}
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button
              color="red"
              variant="outline"
            >
              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
              Block
            </Button>

            <div className="flex">
              <Button
                className="mr-6"
              >
                <span className="text-black-300">Cancel</span>
              </Button>
              <Button
                variant="fill"
              >
                Restart Application
              </Button>
            </div>
          </div>
        </Well>
      }

      {applicant.validity.name === 'INVALID: 3 Month Reapplication Rule' &&
        <Well className="p-6">
          <div className="flex justify-end text-xs text-black font-semibold">
            Opening Reapplication until {moment(applicant.appliedAt).add(3, 'M').format('YYYY-MM-DD')}
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button
              color="red"
              variant="outline"
            >
              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
              Block
            </Button>

            <div className="flex">
              <Button
                className="mr-6"
              >
                <span className="text-black-300">Cancel</span>
              </Button>
              <Button
                variant="fill"
                disabled={moment().isBefore(moment(applicant.appliedAt).add(3, 'M'), 'day')}
              >
                Restart Application
              </Button>
            </div>
          </div>
        </Well>
      }

      {applicant.validity.name === 'INVALID: Not Qualified' &&
        <Well className="p-6">
          <div className="flex justify-end text-xs text-black italic">
            This applicant is not qualified for this job posting
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button
              color="red"
              variant="outline"
            >
              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
              Block
            </Button>

            <div className="flex">
              <Button
                className="mr-6"
              >
                <span className="text-black-300">Cancel</span>
              </Button>
              <Button
                variant="fill"
              >
                Reapply
              </Button>
            </div>
          </div>
        </Well>
      }

      { false &&
        <Well className="p-6">
          <div className="flex justify-between items-center text-xs text-black font-semibold">
            This applicant has been blocked.

            <Button
              variant="outline"
            >
              <IconRestore className="text-blue-900 fill-current mr-2" />
              Restore
            </Button>
          </div>
        </Well>
      }
    </>
  );
}

export default ApplicantActions;
