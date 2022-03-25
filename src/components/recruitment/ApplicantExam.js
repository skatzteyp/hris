import React, { useState, useEffect }  from 'react';
import moment from 'moment';
import {
  Button,
  Text,
  Radio,
  Accordion,
  Dropdown,
  Calendar,
  Textarea,
  Loader
} from'@ligph/ui';

import EmployeeSearch from '../common/EmployeeSearch'
import useDebounce from '../../hooks/useDebounce';
import useConstants from '../../hooks/useConstants';
import useApplicant from '../../hooks/useApplicant';
import LoadingMessage from '../common/LoadingMessage';

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg';
import { ReactComponent as IconRemove } from '../../assets/images/icon-remove.svg';
import { ReactComponent as IconWaive } from '../../assets/images/icon-waive.svg';
import { CONSTANTS } from '../../utils/constants';


const ApplicantExam = ({ valid }) => {
  const constants = useConstants();
  const { applicant, updateExam, processing, updating } = useApplicant();

  // states
  const [specId, setSpecId] = useState(0);
  const applicantExam = applicant.applicantExam;
  const [output, setOutput] = useState({ value: applicantExam.output });
  const [notes, setNotes] = useState({ value: applicantExam.notes });
  const [screenshots, setScreenshots] = useState({ data: applicantExam.applicantExamScreenshots || [] });
  const [scores, setScores] = useState({ data: applicantExam.applicantExamScores || [] });

  // debounced states
  const debouncedOutput = useDebounce(output, 1000);
  const debouncedNotes = useDebounce(notes, 1000);
  const debouncedScreenshots = useDebounce(screenshots, 1000);
  const debouncedScores = useDebounce(scores, 1000);
  const [process, setProcess] = useState(processing);

  useEffect(() => {
    setOutput({ value: applicant.applicantExam.output });
    setNotes({ value: applicant.applicantExam.notes });
    setScreenshots({ data: applicant.applicantExam.applicantExamScreenshots || [] });
    setScores({ data: applicant.applicantExam.applicantExamScores || [] });
  }, [applicant]);

  useEffect(() => {
    if (specId !== applicant.id && applicant.applicanExam && applicant.applicantExam.applicantExamScores.length < applicant.applicantExam.exam.specifications.length) {
      let scores = applicant.applicantExam.exam.specifications.filter((spec) => {
        return !applicant.applicantExam.applicantExamScores.find((score) => score.applicantExamspecification.id === spec.id);
      }).map((spec) => {
        return {
          score: 0,
          applicantExamSpecification: { connect: spec.id }
        };
      });

      if (scores.length) {
        setSpecId(applicant.id);
        updateExam({ applicantExamScores: { upsert: scores } });
      }
    }
  }, [applicant, updateExam, specId]);

  // update exam details
  const handleDetailChange = (type, value) => {
    updateExam({ applicantExamDetails: { [type] : value } });
  }

  // update output with debounce
  useEffect(() => {
    if (output.dirty && debouncedOutput.dirty) {
      updateExam({ applicantExamDetails: { output: output.value } });
      setOutput({
        ...output,
        dirty: false
      });
    }
  }, [ output, debouncedOutput, updateExam ]);

  const handleOutputChange = (value) => {
    setOutput({
      value,
      dirty: true
    });
  }

  // update notes with debounce
  useEffect(() => {
    if (notes.dirty && debouncedNotes.dirty) {
      updateExam({ applicantExamDetails: { notes: notes.value } });
      setNotes({
        ...notes,
        dirty: false
      });
    }
  }, [ notes, debouncedNotes, updateExam ]);

  const handleNotesChange = (value) => {
    setNotes({
      value,
      dirty: true
    });
  }

  // update screenshots with debounce
  useEffect(() => {
    if (screenshots.dirty && debouncedScreenshots.dirty) {
      updateExam({
        applicantExamScreenshots: {
          upsert: [...screenshots.data]
        }
      });
      setScreenshots({
        ...screenshots,
        dirty: false
      });
    }
  }, [ screenshots, debouncedScreenshots, updateExam ]);

  const handleScreenshotsAdd = () => {
    updateExam({ applicantExamScreenshots: { upsert: [{ link: 'http://example.com' }] } });
  }

  const handleScreenshotsRemove = (id) => {
    updateExam({ applicantExamScreenshots: { delete: [id] } });
  }

  const handleScreenshotsChange = (i, value) => {
    screenshots.data[i].link = value;
    setScreenshots({ data: screenshots.data.map(p => ({ id: p.id, link: p.link })), dirty: true });
  }

  // update scores with debounce
  useEffect(() => {
    if (scores.dirty && debouncedScores.dirty) {
      updateExam({ applicantExamScores: { upsert: scores.data.map((s) => ({ id: s.id, remark: s.remark })) } });
      setScores({
        ...scores,
        dirty: false
      });
    }
  }, [scores, debouncedScores, updateExam]);

  const handleScoreChange = (score, value) => {
    score.score = value;
    updateExam({ applicantExamScores: { upsert: scores.data.map((s) => ({ id: s.id, score: s.score })) } });
  }

  const handleRemarkChange = (score, remark) => {
    score.remark = remark;
    setScores({ ...scores, dirty: true });
  }

  const handleConnect = (type, id) => {
    updateExam({ [type]: { connect: id } });
  }

  let disabled = applicant.status.id > CONSTANTS.STATUS.EXAM;
  let disabledCursor = applicant.status.id > CONSTANTS.STATUS.EXAM ? 'cursor-not-allowed': 'cursor-auto';
  let disabledPointer = applicant.status.id > CONSTANTS.STATUS.EXAM ? 'pointer-events-none': 'pointer-events-auto';


  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])

  let applicantExamRating = applicantExam.examRating && applicantExam.examRating.name === 'Passed';
  let totalScore = scores.data.reduce((acc, curr) => (acc + curr.score), 0) >= (scores.data.length * 5) * 0.8;
  useEffect(() => {
    if (applicantExam.dueDate && output.value && applicantExam.reviewer && totalScore && applicantExam.reviewDate && applicantExamRating) {
      return valid(false);
    }
    else {
      return valid(true);
    }
  });

  let errorMessageDueDate = !applicantExam.dueDate ? 'Please set due date' : '';
  let errorMessageOutput = !output.value ? 'Please add output' : '';
  let errorMessageInterviewer = !applicantExam.reviewer ? 'Please add interviewer' : '';
  let errorMessageReviewDate = !applicantExam.reviewDate ? 'Please add review date' : '';
  let errorMessageExamRating = !applicantExamRating ? 'Rating must be Passed' : ''
  let scoreColor = !totalScore ? 'text-red' : 'text-black';

  return (
    <>
    {processing && process ? <div className="relative min-h-sm"><Loader /></div>
      : <>
          {updating ? <LoadingMessage text="Saving"/>
            : null
          }
          <div className="w-full bg-white border border-black-100 rounded p-8">
            <div className="flex mb-6">
              <Button
                variant="outline"
                disabled={disabled}
              >
                {<IconWaive className="fill-current mr-2 w-4 h-3" />}
                Waive Stage
              </Button>
            </div>

            <Accordion className="mb-6" label="Information">
              <div className={`mb-3 ${disabledCursor}`}>
                <Text
                  type="text"
                  label="Exam Link"
                  className={disabledPointer}
                  value={applicantExam.exam ? applicantExam.exam.link : ''}
                  link={true}
                  onChange={() => {}}
                />
              </div>
              <div className={disabledCursor}>
                <Calendar
                  className={disabledPointer}
                  label="Due Date"
                  overflow={true}
                  name="dueDate"
                  timeFormat={false}
                  value={applicantExam.dueDate || ''}
                  placeholder="Enter exam due date"
                  onChange={(e) => handleDetailChange('dueDate', moment(e).format('YYYY-MM-DD'))}
                  error={errorMessageDueDate}
                />
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Output">
              <div className="mb-3 flex items-start">
                <div className="w-3/4">
                  <div className={`flex-1 mr-4 ${disabledCursor}`}>
                    <Text
                      type="text"
                      placeholder="Enter output"
                      label="Output"
                      inputClassName="py-3 px-4 rounded"
                      className={disabledPointer}
                      value={output.value || ''}
                      onChange={(e) => handleOutputChange(e.target.value)}
                      error={errorMessageOutput}
                    />
                  </div>
                </div>
                <div className="w-1/4" style={{marginTop: 1.9 + 'rem'}}>
                  <Button
                    variant="outline"
                    className="h-8 justify-center w-2/5"
                    onClick={() => window.open(output.value, '_blank')}
                    disabled={disabled}
                  >
                    View
                  </Button>
                </div>
              </div>
              <div className="pb-1 flex items-start">
                <div className="w-1/3">
                  <div className={`flex-1 mr-10 ${disabledCursor}`}>
                    <EmployeeSearch
                      overflow={true}
                      className={disabledPointer}
                      onChange={(id) => handleConnect('reviewer', id)}
                      value={applicantExam.reviewer ? `${applicantExam.reviewer.firstName || ''} ${applicantExam.reviewer.lastName || ''}` : ''}
                      label="Select Interviewer"
                      error={errorMessageInterviewer}
                    />
                  </div>
                </div>
                <div className="w-1/3">
                  <div className={disabledCursor}>
                    <Calendar
                      label="Review Date"
                      overflow={true}
                      name="reviewDate"
                      timeFormat={false}
                      value={applicantExam.reviewDate || ''}
                      placeholder="Enter review date"
                      onChange={(e) => handleDetailChange('reviewDate', moment(e).format('YYYY-MM-DD'))}
                      className={disabledPointer}
                      error={errorMessageReviewDate}
                    />
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Scores">
              <div className="p-8">
                <div className="border border-blue-300 rounded overflow-hidden">
                  <table className="table-fixed">
                    <thead className="bg-blue-300 text-sm text-left text-black">
                      <tr>
                        <th className="font-semibold w-1/3 text-center px-5 pt-4 pb-3">Description</th>
                        <th className="font-semibold w-20 text-center">1</th>
                        <th className="font-semibold w-20 text-center">2</th>
                        <th className="font-semibold w-20 text-center">3</th>
                        <th className="font-semibold w-20 text-center">4</th>
                        <th className="font-semibold w-20 text-center">5</th>
                        <th className="font-semibold w-1/3 text-center px-10">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.data.map((score) => (
                        <tr className="border-b border-blue-300" key={score.id}>
                          <td className="text-sm font-normal p-4">
                            {score.applicantExamSpecification.description}
                          </td>
                          <td className="text-center">
                            <div className="transform translate-x-1">
                              <Radio
                                name={`score-${score.id}`}
                                checked={score.score === 1}
                                onChange={() => handleScoreChange(score, 1)}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="transform translate-x-1">
                              <Radio
                                name={`score-${score.id}`}
                                checked={score.score === 2}
                                onChange={() => handleScoreChange(score, 2)}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="transform translate-x-1">
                              <Radio
                                name={`score-${score.id}`}
                                checked={score.score === 3}
                                onChange={() => handleScoreChange(score, 3)}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="transform translate-x-1">
                              <Radio
                                name={`score-${score.id}`}
                                checked={score.score === 4}
                                onChange={() => handleScoreChange(score, 4)}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="transform translate-x-1">
                              <Radio
                                name={`score-${score.id}`}
                                checked={score.score === 5}
                                onChange={() => handleScoreChange(score, 5)}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                          <td className="p-4">
                            <div className={`w-full ${disabledCursor}`}>
                              <textarea
                                className={`text-sm py-3 px-4 border border-black-100 rounded h-24 block ${disabledPointer}`}
                                value={score.remark || ''}
                                onChange={(e) => handleRemarkChange(score, e.target.value)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="h-12 w-full bg-blue-300 text-sm font-semibold text-black flex justify-end items-center px-4">
                    TOTAL SCORE
                    <span className={`ml-4 bg-white inline-block px-2 py-1 rounded w-16 text-center ${scoreColor}`}>
                      {scores.data.reduce((acc, curr) => (acc + curr.score), 0)}/{scores.data.length * 5}
                    </span>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Screenshots">
              <div className="flex">
                <div className="w-1/2">
                  <div className="grid grid-cols-1 row-gap-4">
                    {screenshots.data.map((ss, i) => (
                      <div className="flex items-end" key={i}>
                        <div className={`flex-1 mr-4 ${disabledCursor}`}>
                          <Text
                            type="text"
                            placeholder="Enter link"
                            label={`Link ${i+1}`}
                            inputClassName="py-3 px-4 rounded"
                            className={disabledPointer}
                            value={ss.link}
                            onChange={(e) => handleScreenshotsChange(i, e.target.value)}
                          />
                        </div>
                        <Button
                          className="mb-3"
                          onClick={() => handleScreenshotsRemove(ss.id)}
                          disabled={disabled}
                        >
                          <span className="text-black-300">{<IconRemove className="fill-current w-4 h-4"/>}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="text-center pl-4 pr-6 mt-5"
                    onClick={handleScreenshotsAdd}
                    disabled={disabled}
                  >
                    {<IconPlus className="stroke-current fill-current w-4 h-3 mr-2"/>}
                    Add link
                  </Button>
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Notes">
              <div className={disabledCursor}>
                <Textarea
                  customStyle={disabledPointer}
                  name="notes"
                  value={notes.value || ''}
                  cols="20"
                  rows="10"
                  onChange={(e) => handleNotesChange(e.target.value)}
                />
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Rating">
              <div className={`w-80 mt-3 ${disabledCursor}`}>
                <Dropdown
                  className={disabledPointer}
                  label="Exam Rating"
                  placeholder="Select rating"
                  items={constants.examRatings}
                  value={applicantExam.examRating ? applicantExam.examRating.id : 0}
                  overflow={true}
                  onChange={(id) => handleConnect('examRating', id)}
                  error={errorMessageExamRating}
                />
              </div>
            </Accordion>
          </div>
        </>
    }
    </>
  );
}

export default ApplicantExam;
