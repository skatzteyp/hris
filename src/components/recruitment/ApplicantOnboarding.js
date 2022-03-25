import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Accordion,
  Button,
  Checkbox,
  Calendar,
  Loader
} from '@ligph/ui';

import useApplicant from '../../hooks/useApplicant';
import useConstants from '../../hooks/useConstants';
import { CONSTANTS } from '../../utils/constants';
import LoadingMessage from '../common/LoadingMessage';

const ApplicantOnboarding = ({ valid, onJobOffer, jobOffer }) => {
  const constants = useConstants();
  const { applicant, updateOnboarding, updating, processing} = useApplicant();
  const { applicantOnboarding } = applicant;
  const [process, setProcess] = useState(processing);

  useEffect(() => {
    if (applicant.applicantOnboarding.applicantPreEmploymentRequirements && applicant.applicantOnboarding.applicantPreEmploymentRequirements.length < constants.requirements.length) {
      let reqs = constants.requirements.filter(req => {
        return !applicant.applicantOnboarding.applicantPreEmploymentRequirements.find((p) => p.preEmploymentRequirement.id === req.id);
      }).map(req => {
        return { preEmploymentRequirement: { connect: req.key } };
      });

      if (reqs.length) {
        updateOnboarding({
          applicantPreEmploymentRequirements: {
            upsert: reqs
          }
        });
      }
    }
  }, [applicant, updateOnboarding, constants]);

  const handleChange = (type, value) => {
    updateOnboarding({
      applicantOnboardingInfo: {
        [type]: value
      }
    });
  }

  const handleRequirementChange = (id, status) => {
    updateOnboarding({
      applicantPreEmploymentRequirements: {
        upsert: [
          { id, status }
        ]
      }
    });
  }

  let disabled = applicant.status.id > CONSTANTS.STATUS.ONBOARDING;
  let disabledCursor = applicant.status.id > CONSTANTS.STATUS.ONBOARDING ? 'cursor-not-allowed': 'cursor-auto';
  let disabledPointer = applicant.status.id > CONSTANTS.STATUS.ONBOARDING ? 'pointer-events-none': 'pointer-events-auto';

  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])

  useEffect(() => {
    return valid(false);
  });

  return (
    <>
      {processing && process ? <div className="relative min-h-sm"><Loader /></div>
        : <>
            {updating ? <LoadingMessage text="Saving"/>
              : null
            }
            <div className="flex">
              <Button
                className="mr-5"
                variant="fill"
                disabled={disabled}
                onClick={() => onJobOffer(true)}
              >
                Accepted Job Offer
              </Button>
              <Button
                color="red"
                variant="outline"
                disabled={disabled}
                onClick={() => onJobOffer(false)}
              >
                Declined Job Offer
              </Button>
            </div>
            <>
              { jobOffer === true ?
                <>
                  <Accordion className="mb-6 mt-5" label="Job Offer">
                    <div className="flex">
                      <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                        <Calendar
                          overflow={true}
                          timeFormat={false}
                          name="hiredDate"
                          className={disabledPointer}
                          placeholder="Enter date"
                          label="Date Hired"
                          value={applicantOnboarding.hiredDate || ''}
                          onChange={(e) => handleChange('hiredDate', moment(e).format('YYYY-MM-DD'))}
                        />
                      </div>
                      <div className={`w-1/3 ${disabledCursor}`}>
                        <Calendar
                          overflow={true}
                          timeFormat={false}
                          name="startDate"
                          className={disabledPointer}
                          placeholder="Enter date"
                          label="Start Date"
                          value={applicantOnboarding.startDate || ''}
                          onChange={(e) => handleChange('startDate', moment(e).format('YYYY-MM-DD'))}
                        />
                      </div>
                    </div>
                  </Accordion>

                  <Accordion className="mb-6 mt-5" label="Pre Employment Requirements">
                    <ul className="px-4">
                      {applicantOnboarding.applicantPreEmploymentRequirements && applicantOnboarding.applicantPreEmploymentRequirements.map((req) => (
                        <li className="border-black-200 border-dashed border-0 border-b py-2 pt-3" key={req.id}>
                          <Checkbox
                            text={req.preEmploymentRequirement.name}
                            checked={req.status}
                            onChange={(e) => handleRequirementChange(req.id, e.target.checked)}
                            disabled={disabled}
                          />
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                </>
               : ''
              }
            </>
          </>
      }
    </>
  );
}

export default ApplicantOnboarding;
