import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Accordion,
  Button,
  Calendar,
  Text,
  Textarea,
  Loader
} from '@ligph/ui';

import EmployeeSearch from '../common/EmployeeSearch';
import useDebounce from '../../hooks/useDebounce';
import useApplicant from '../../hooks/useApplicant';
import { CONSTANTS } from '../../utils/constants';
import LoadingMessage from '../common/LoadingMessage';

import { ReactComponent as IconWaive } from '../../assets/images/icon-waive.svg';

const ApplicantInitialInterview = ({ criterias, valid }) => {
  const {
    applicant,
    processing,
    updating,
    updateCriteriaPoints,
    updateInterview,
    updateCriteriaPoint
  } = useApplicant();
  const { interview } = applicant;

  const [criteriaPoints, setCriteriaPoints] = useState(interview.criteriaPoints);
  const [scheduleDate, setScheduleDate] = useState(interview.scheduleDate);
  const [notes, setNotes] = useState({ value: interview.notes });
  const [loading, setLoading] = useState(false);
  const debouncedNotes = useDebounce(notes, 1000);
  const [process, setProcess] = useState(processing);
  const [maxValue, setMaxValue] = useState();

  useEffect(() => {
    setCriteriaPoints(applicant.interview.criteriaPoints);
    setScheduleDate(applicant.interview.scheduleDate);
    setNotes({ value: applicant.interview.notes });
  }, [applicant]);

  // create criteria points if applicant has missing
  useEffect(() => {
    if (!loading && applicant.interview.id) {
      if (applicant.interview.criteriaPoints.length < criterias.length) {
        let cps = criterias.filter((c) => {
          return !applicant.interview.criteriaPoints.find((cp) => cp.criteria.id === c.id);
        }).map((c) => {
          return {
            criteriaId: c.id,
            points: '1',
            interviewId: applicant.interview.id,
            comment: ''
          };
        })

        if (cps.length) {
          updateCriteriaPoints({ criteriaPoints: cps });
          setLoading(true);
        }
        else {
          setLoading(false);
        }
      }
      else {
        setLoading(false);
      }
    }
  }, [applicant, criterias, updateCriteriaPoints, loading]);

  // update interview fields
  const handleChange = (type, value) => {
    if (type === 'scheduleDate') {
      setScheduleDate(value);
    }

    updateInterview({ [type]: value });
  }

  // update notes
  useEffect(() => {
    if (notes.dirty && debouncedNotes.dirty) {
      updateInterview({ notes: notes.value });
      setNotes({
        ...notes,
        dirty: false
      });
    }
  }, [debouncedNotes, notes, updateInterview]);

  const handleNotesChange = (value) => {
    setNotes({
      value,
      dirty: true
    });
  }

  // criteria points
  const handleCriteriaPointChange = (cp, value) => {
    setMaxValue(value)
    cp.points = value;
    setCriteriaPoints([...criteriaPoints]);
    if (value < 4) {
      updateCriteriaPoint({ id: cp.id, points: cp.points }, 'criteria')
    }
  }

  let disabled = applicant.status.id > CONSTANTS.STATUS.INITIAL;
  let disabledCursor = applicant.status.id > CONSTANTS.STATUS.INITIAL ? 'cursor-not-allowed': 'cursor-auto';
  let disabledPointer = applicant.status.id > CONSTANTS.STATUS.INITIAL ? 'pointer-events-none': 'pointer-events-auto';

  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])

  let totalScore = criteriaPoints.reduce((acc, curr) => (acc + +curr.points), 0) >= (criteriaPoints.length * 3) * 0.8;

  useEffect(() => {
    if (scheduleDate && interview.interviewer && totalScore && maxValue < 4) {
      return valid(false);
    }
    else {
      return valid(true);
    }
  });

  let errorMessageCalendar = !scheduleDate ? 'Please set interview date' : '';
  let errorMessageInterviewer = !interview.interviewer ? 'Please set an interviewer' : '';
  let scoreColor = !totalScore ? 'text-red' : 'text-black';

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
              <div className="flex">
                <div className="w-11/12">
                  <div className="grid grid-cols-3 col-gap-12 row-gap-4">
                    <div className={disabledCursor}>
                      <Calendar
                        className={disabledPointer}
                        overflow={true}
                        label="Interview Date and Time"
                        name="dateOfInterview"
                        placeholder="Enter date"
                        value={scheduleDate || ''}
                        onChange={(e) => handleChange('scheduleDate', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                        error={errorMessageCalendar}
                      />
                    </div>
                    <div className={disabledCursor}>
                      <EmployeeSearch
                        overflow={true}
                        onChange={(id) => handleChange('interviewerId', id)}
                        value={interview.interviewer ? `${interview.interviewer.firstName || ''} ${interview.interviewer.lastName || ''}` : ''}
                        label="Select Interviewer"
                        error={errorMessageInterviewer}
                        className={disabledPointer}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Scoring Grid">
              <div className="flex justify-center py-5">
                <table className="table-fixed w-3/4 border border-blue-300">
                  <thead className="bg-blue-300 text-sm text-left text-black">
                    <tr>
                      <th className="w-1/2 p-5 font-semibold">Criteria</th>
                      <th className="w-1/4 p-5 font-semibold text-center">Percentage</th>
                      <th className="w-1/4 p-5 font-semibold text-center">Point System Equivalence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteriaPoints.map((cp) => (
                      <tr className="border-b border-blue-300" key={cp.id}>
                        <td className="p-4 text-sm">{cp.criteria.name}: {cp.criteria.description}</td>
                        <td className="p-4">
                          <div className={`w-1/2 m-auto ${disabledCursor}`}>
                            <Text
                              type="text"
                              className={disabledPointer}
                              inputClassName="py-3 px-4 text-center border-black-100 rounded font-semibold"
                              value={`${cp.criteria.percentage}%`}
                              readOnly
                            />
                          </div>
                        </td>
                          <td className="p-4">
                            <div className={`w-1/2 m-auto ${disabledCursor}`}>
                              <Text
                                type="number"
                                className={disabledPointer}
                                inputClassName={`py-3 px-4 text-center border-black-100 rounded font-semibold ${cp.points > 3 ? 'border-red-800' : ''}`}
                                value={cp.points || ''}
                                error={cp.points > 3 ? 'Max score is 3' : null}
                                onChange={(e) => handleCriteriaPointChange(cp, e.target.value)}
                              />
                            </div>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center">
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="w-1/2 flex items-center">
                      <div className="text-sm font-semibold">Scoring</div>
                      <ul className="flex text-sm mx-5">
                        <li className="mx-1">3-High</li>
                        <li className="mx-1">2-Mid</li>
                        <li className="mx-1">1-Low</li>
                      </ul>
                    </div>
                    <div className="w-1/2 flex items-center justify-end">
                      <div className="text-sm font-semibold">Final Score</div>
                      <div className={`text-sm mx-5 ${scoreColor}`}>{criteriaPoints.reduce((acc, curr) => (acc + +curr.points), 0)} / {criteriaPoints.length * 3}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Notes">
              <div className={disabledCursor}>
                <Textarea
                  customStyle={disabledPointer}
                  cols="20"
                  rows="10"
                  value={notes.value || ''}
                  onChange={(e) => handleNotesChange(e.target.value)}
                />
              </div>
            </Accordion>
        </>
      }
    </>
  );
};

export default ApplicantInitialInterview;
