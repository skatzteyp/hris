import React, { useEffect, useState } from 'react';

import {
  Button,
  Text,
  Accordion,
  Loader
} from '@ligph/ui';

import useApplicant from '../../hooks/useApplicant';

import { ReactComponent as IconWaive } from '../../assets/images/icon-waive.svg';
import { CONSTANTS } from '../../utils/constants';
import LoadingMessage from '../common/LoadingMessage';


const ApplicantPrefinalInterview = ({ valid }) => {
  const { applicant, createToken, processing, updating } = useApplicant();
  const [process, setProcess] = useState(processing);

  let categories = { };

  if (applicant.questionnaire.questionsWithAnswers) {
    applicant.questionnaire.questionsWithAnswers.edges.forEach((answer) => {
      if (categories[answer.node.questionCategory.id]) {
        categories[answer.node.questionCategory.id].questions.push({ id: answer.node.id, question: answer.node.question, answer: answer.answer});
      }
      else {
        categories[answer.node.questionCategory.id] = {};
        categories[answer.node.questionCategory.id].questions = [];
        categories[answer.node.questionCategory.id].id = answer.node.questionCategory.id;
        categories[answer.node.questionCategory.id].name = answer.node.questionCategory.name;
        categories[answer.node.questionCategory.id].questions.push({ id: answer.node.id, question: answer.node.question, answer: answer.answer});
      }
    });
  }

  let disabled = applicant.status.id > CONSTANTS.STATUS.PREFINAL;
  let disabledCursor = applicant.status.id > CONSTANTS.STATUS.PREFINAL ? 'cursor-not-allowed': 'cursor-auto';
  let disabledPointer = applicant.status.id > CONSTANTS.STATUS.PREFINAL ? 'pointer-events-none': 'pointer-events-auto';

  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])

  useEffect(() => {
    return valid(false);
  });

  console.log(updating);

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


            <Accordion className="mb-6" label="Link Form">
              <div className="flex items-end">
                <div className={`w-md mr-5 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    label="Public Link"
                    placeholder="Click Generate to create public link"
                    value={`${applicant.token ? `https://hris.cody.asia/recruitment/applicants/${applicant.id}/prefinal?token=${applicant.token}` : ''}`}
                    readOnly
                  />
                </div>
                <Button
                  variant="fill" className="px-8"
                  onClick={() => createToken()}
                  disabled={disabled}
                >
                  Generate
                </Button>
              </div>
            </Accordion>

            {
              Object.keys(categories).map((key) => (
                <Accordion className="mb-6" label={categories[key].name} key={key}>
                  {
                    categories[key].questions.map((q) => (
                      <div className="mt-5 mb-10" key={q.id}>
                        <div className="flex items-center mb-2">
                          <div className="flex-none rounded-full bg-blue-900 text-white text-sm font-semibold w-8 h-8 mr-2 inline-flex justify-center items-center">
                            <span>Q</span>
                          </div>
                          <div className="flex text-xs">
                            <p className="font-semibold">
                              {q.question}
                            </p>
                          </div>
                        </div>
                        <div className="ml-10 border border-b-0 border-t-0 border-r-0 border-l-4 border-blue px-4 text-xl">
                          <p className="text-sm leading-normal">
                            {q.answer || 'No answer'}
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </Accordion>
              ))
            }
        </>
      }
    </>
  );
}

export default ApplicantPrefinalInterview;
