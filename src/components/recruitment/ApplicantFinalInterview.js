import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  Dropdown,
  Accordion,
  Textarea,
  Calendar,
  Loader
} from '@ligph/ui';

import EmployeeSearch from '../common/EmployeeSearch';
import useApplicant from '../../hooks/useApplicant';
import useDebounce from '../../hooks/useDebounce';
import useConstants from '../../hooks/useConstants';
import { ReactComponent as IconWaive } from '../../assets/images/icon-waive.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';
import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg';
import { CONSTANTS } from '../../utils/constants';
import LoadingMessage from '../common/LoadingMessage';

const ApplicantFinalInterview = ({ valid }) => {
  const constants = useConstants();
  const { applicant, updateFinalInterview, processing, updating } = useApplicant();
  const { applicantFinalInterview } = applicant;
  const [interviewers, setInterviewers] = useState({ data: applicantFinalInterview.finalInterviewers || [] });
  const [process, setProcess] = useState(processing);

  const debouncedInterviewers = useDebounce(interviewers, 1000);

  useEffect(() => {
    setInterviewers({ data: applicant.applicantFinalInterview.finalInterviewers || [] });
  }, [applicant]);

  const handleChange = (type, value) => {
    updateFinalInterview({ [type]: value });
  }

  useEffect(() => {
    if (interviewers.dirty && debouncedInterviewers.dirty) {
      updateFinalInterview({
        finalInterviewers: {
          upsert: interviewers.data.map((i) => ({ id: i.id, notes: i.notes }))
        }
      });
      setInterviewers({
        ...interviewers,
        dirty: false
      });
    }
  }, [ interviewers, debouncedInterviewers, updateFinalInterview ]);

  const handleInterviewerAdd = () => {
    updateFinalInterview({ finalInterviewers: { upsert: [{ notes: '' }] } });
  }

  const handleInterviewerRemove = (id) => {
    updateFinalInterview({ finalInterviewers: { delete: [id] } });
  }

  const handleInterviewerChange = (i, value) => {
    interviewers.data[i].notes = value;
    setInterviewers({ data: interviewers.data, dirty: true });
  }

  const handleInterviewerConnect = (interviewer, type, value) => {
    updateFinalInterview({
      finalInterviewers: {
        upsert: [{ id: interviewer.id, [type]: { connect: value } }]
      }
    });
  }

  let disabled = applicant.status.id > CONSTANTS.STATUS.FINAL;
  let disabledCursor = applicant.status.id > CONSTANTS.STATUS.FINAL ? 'cursor-not-allowed': 'cursor-auto';
  let disabledPointer = applicant.status.id > CONSTANTS.STATUS.FINAL ? 'pointer-events-none': 'pointer-events-auto';

  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])

  let applicantFinalRating = applicantFinalInterview.finalInterviewRating && applicantFinalInterview.finalInterviewRating.name === 'Passed';

  useEffect(() => {
    if(applicantFinalInterview.scheduleDate && applicantFinalInterview.finalInterviewRating && applicantFinalRating) {
      return () => valid(false);
    }
    else {
      return () => valid(true);
    }
  });

  let errorMessageCalendar = !applicantFinalInterview.scheduleDate ? 'Please set interview date' : '';
  let errorMessageFinalRating = !applicantFinalRating? 'Final rating must be Passed' : '';

  return (
    <>
      {processing && process ? <div className="relative min-h-sm"><Loader /></div>
        : <>
            {updating ? <LoadingMessage text="Saving"/>
              : null
            }
            <div className="flex flex-row-reverse pb-5">
              <Button
                variant="outline"
                className="h-10"
                disabled={disabled}
              >
                <IconWaive className="fill-current mr-2 w-4 h-3" />
                Waive Stage
              </Button>
            </div>

            <Accordion className="mb-6" label="Information">
              <div className={`w-80 ${disabledCursor}`}>
                <Calendar
                  overflow={true}
                  label="Interview Date and Time"
                  name="dateOfInterview"
                  placeholder="Select Interview Date and Time"
                  value={applicantFinalInterview.scheduleDate || ''}
                  onChange={(e) => handleChange('scheduleDate', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                  error={errorMessageCalendar}
                  className={disabledPointer}
                />
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Interview">
              <>
              {interviewers.data.map((interviewer, i) => (
                <div key={interviewer.id} className="mb-4">
                  <label className="block text-xs text-black font-semibold mb-2">Interviewer {i+1}</label>

                  <div className="bg-gray-border rounded p-6">
                    <div className="w-full flex justify-end">
                      <Button
                        className="focus:outline-none hover:opacity-75 transition-all duration-500"
                        onClick={() => handleInterviewerRemove(interviewer.id)}
                        disabled={disabled}
                      >
                        <IconX className="stroke-2 stroke-current text-black-300" />
                      </Button>
                    </div>

                    <div className="flex">
                      <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                        <EmployeeSearch
                          className={disabledPointer}
                          overflow={true}
                          onChange={(id) => handleInterviewerConnect(interviewer, 'finalInterviewer', id)}
                          value={interviewer.finalInterviewer ? `${interviewer.finalInterviewer.firstName || ''} ${interviewer.finalInterviewer.lastName || ''}` : ''}
                          label="Select Interviewer"
                        />
                      </div>
                      <div className={`w-80 ${disabledCursor}`}>
                        <Dropdown
                          className={disabledPointer}
                          label="Rating"
                          placeholder="Select rating"
                          items={constants.finalInterviewerRatings}
                          value={interviewer.finalInterviewerRating ? interviewer.finalInterviewerRating.id : ''}
                          onChange={(id) => handleInterviewerConnect(interviewer, 'finalInterviewerRating', id)}
                        />
                      </div>
                    </div>

                    <div className={`mt-4 ${disabledCursor}`}>
                      <Textarea
                        customStyle={`bg-white ${disabledPointer}`}
                        label="Notes"
                        cols="20"
                        rows="10"
                        value={interviewer.notes || ''}
                        onChange={(e) => handleInterviewerChange(i, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              </>

              <div className="mt-4">
                <Button
                  variant="outline"
                  className="h-10"
                  onClick={handleInterviewerAdd}
                  disabled={disabled}
                >
                  <IconPlus className="stroke-current fill-current w-3 h-3 mr-2" />
                  Add Interviewer
                </Button>
              </div>
            </Accordion>

            <Accordion label="Interview Rating">
              <div className={`w-80 ${disabledCursor}`}>
              <Dropdown
                className={disabledPointer}
                label="Final Rating"
                placeholder="Select rating"
                items={constants.finalInterviewRatings}
                value={applicantFinalInterview.finalInterviewRating ? applicantFinalInterview.finalInterviewRating.id : ''}
                onChange={(id) => handleChange('finalInterviewRating', { connect: id })}
                overflow={true}
                error={errorMessageFinalRating}
              />
              </div>
            </Accordion>
        </>
      }
    </>
  );
}

export default ApplicantFinalInterview;
