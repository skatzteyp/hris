import React, { useState, useEffect} from 'react';
import {
  Button,
  Accordion,
  Text,
  Textarea,
  Loader
} from '@ligph/ui';

import useApplicant from '../../hooks/useApplicant';
import useDebounce from '../../hooks/useDebounce';
import LoadingMessage from '../common/LoadingMessage';

import { ReactComponent as IconWaive } from '../../assets/images/icon-waive.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';
import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg';
// import { ReactComponent as IconEmotionHappy } from '../../assets/images/icon-emotion-happy.svg';
// import { ReactComponent as IconEmotionSad } from '../../assets/images/icon-emotion-sad.svg';
import { CONSTANTS } from '../../utils/constants';

const ApplicantBackground = ({ valid }) => {
  const {
    applicant,
    processing,
    updating,
    updateBackground,
    updateDocumentation,
    deleteDocumentation,
    updateCharacterReference,
    deleteCharacterReference
  } = useApplicant();
  const { applicantBackground, applicantDocumentations, applicantCharacterReferences } = applicant;
  const [notes, setNotes] = useState({ value: applicantBackground.notes });
  const [documentations, setDocumentations] = useState({ data: applicantDocumentations });
  const [references, setReferences] = useState({ data: applicantCharacterReferences });

  const debouncedNotes = useDebounce(notes, 1000);
  const debouncedDocumentations = useDebounce(documentations, 1000);
  const debouncedReferences = useDebounce(references, 1000);
  const [process, setProcess] = useState(processing);

  useEffect(() => {
    setNotes({ value: applicant.applicantBackground.notes });
    setDocumentations({ data: applicant.applicantDocumentations });
    setReferences({ data: applicant.applicantCharacterReferences });
  }, [applicant]);

  useEffect(() => {
    if (notes.dirty && debouncedNotes.dirty) {
      updateBackground({ notes: notes.value });
      setNotes({
        ...notes,
        dirty: false
      });
    }
  }, [notes, debouncedNotes, updateBackground]);

  // update documentations with debounce
  useEffect(() => {
    if (documentations.dirty && debouncedDocumentations.dirty) {
      updateDocumentation(documentations.data.map((docu) => ({ id: docu.id, url: docu.url })));
      setDocumentations({
        ...documentations,
        dirty: false
      });
    }
  }, [ documentations, debouncedDocumentations, updateDocumentation ]);

  const handleDocumentationAdd = () => {
    updateDocumentation({ url: 'Enter URL' });
  }

  const handleDocumentationRemove = (id) => {
    deleteDocumentation({ id });
  }

  const handleDocumentationChange = (i, value) => {
    documentations.data[i].url = value;
    setDocumentations({ data: documentations.data, dirty: true });
  }

  // update references with debounce
  useEffect(() => {
    if (references.dirty && debouncedReferences.dirty) {
      updateCharacterReference(references.data);
      setReferences({
        ...references,
        dirty: false
      });
    }
  }, [ references, debouncedReferences, updateCharacterReference ]);

  const handleReferenceAdd = () => {
    updateCharacterReference({ name: '' });
  }

  const handleReferenceRemove = (id) => {
    deleteCharacterReference({ id });
  }

  const handleReferenceChange = (i, type, value) => {
    references.data[i][type] = value;
    setReferences({ data: references.data, dirty: true });
  }

  let disabled = applicant.status.id > CONSTANTS.STATUS.BACKGROUND;
  let disabledCursor = applicant.status.id > CONSTANTS.STATUS.BACKGROUND ? 'cursor-not-allowed': 'cursor-auto';
  let disabledPointer = applicant.status.id > CONSTANTS.STATUS.BACKGROUND ? 'pointer-events-none': 'pointer-events-auto';


  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating]);

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

            <Accordion className="mb-6" label="Documentations">
              <>
              {documentations.data.map((docu, i) => (
                <div className="flex mb-4" key={docu.id}>
                  <div className={`w-md ${disabledCursor}`}>
                    <Text
                      className={disabledPointer}
                      type="text"
                      placeholder="Enter link"
                      label={`Link ${i+1}`}
                      value={docu.url || ''}
                      onChange={(e) => handleDocumentationChange(i, e.target.value)}
                    />
                  </div>
                  <Button
                    className="mt-8 ml-4"
                    onClick={() => handleDocumentationRemove(docu.id)}
                    disabled={disabled}
                  >
                    <IconX className="stroke-2 stroke-current text-black-300" />
                  </Button>
                </div>
              ))}
              </>

              <Button
                variant="outline"
                className="h-10 mt-4"
                onClick={handleDocumentationAdd}
                disabled={disabled}
              >
                <IconPlus className="stroke-current fill-current w-3 h-3 mr-2" />
                Add Link
              </Button>
            </Accordion>

            <Accordion className="mb-6" label="Character Reference">
              <>
              {references.data.map((reference, i) => (
                <div key={reference.id} className="mb-4">
                  <label className="block text-xs text-black font-semibold mb-2">Reference {i+1}</label>

                  <div className="bg-gray-border rounded p-6">
                    <div className="w-full flex justify-end">
                      <Button
                        className="focus:outline-none hover:opacity-75 transition-all duration-500"
                        onClick={() => handleReferenceRemove(reference.id)}
                        disabled={disabled}
                      >
                        <IconX className="stroke-2 stroke-current text-black-300" />
                      </Button>
                    </div>

                    <div className="flex">
                      <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                        <Text
                          className={disabledPointer}
                          inputClassName="bg-white"
                          label="Name"
                          placeholder="Enter name of reference"
                          value={reference.fullName || ''}
                          onChange={(e) => handleReferenceChange(i, 'fullName', e.target.value)}
                        />
                      </div>
                      <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                        <Text
                          className={disabledPointer}
                          inputClassName="bg-white"
                          label="Position"
                          placeholder="Enter position of reference"
                          value={reference.position || ''}
                          onChange={(e) => handleReferenceChange(i, 'position', e.target.value)}
                        />
                      </div>
                      <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                        <Text
                          className={disabledPointer}
                          inputClassName="bg-white"
                          label="Company"
                          placeholder="Enter company of reference"
                          value={reference.company || ''}
                          onChange={(e) => handleReferenceChange(i, 'company', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex mt-4">
                      <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                        <Text
                          className={disabledPointer}
                          inputClassName="bg-white"
                          label="E-Mail"
                          placeholder="Enter e-mail of reference"
                          value={reference.email || ''}
                          onChange={(e) => handleReferenceChange(i, 'email', e.target.value)}
                        />
                      </div>
                      <div className={`w-1/3 ${disabledCursor}`}>
                        <Text
                          className={disabledPointer}
                          inputClassName="bg-white"
                          label="Contact Number"
                          placeholder="Enter contact number of reference"
                          value={reference.contactNumber || ''}
                          onChange={(e) => handleReferenceChange(i, 'contactNumber', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={`mt-4 ${disabledCursor}`}>
                      <Textarea
                        customStyle={`bg-white ${disabledPointer}`}
                        label="Notes"
                        cols="20"
                        rows="10"
                        value={reference.notes || ''}
                        onChange={(e) => handleReferenceChange(i, 'notes', e.target.value)}
                      />
                    </div>

                    {/* <div className="mt-4"> */}
                    {/*   <div className="text-xs font-semibold">Feedback</div> */}
                    {/*   <div className="flex mt-2"> */}
                    {/*     <div className="text-primary cursor-pointer"> */}
                    {/*       <IconEmotionHappy className="text-green fill-current w-6 h-6 mr-4" /> */}
                    {/*     </div> */}
                    {/*     <div className="text-gray-300 cursor-pointer"> */}
                    {/*       <IconEmotionSad className="text-black-300 fill-current w-6 h-6" /> */}
                    {/*     </div> */}
                    {/*   </div> */}
                    {/* </div> */}
                  </div>
                </div>
              ))}
              </>

              <Button
                variant="outline"
                className="h-10 mt-4"
                onClick={handleReferenceAdd}
                disabled={disabled}
              >
                <IconPlus className="stroke-current fill-current w-4 h-3 mr-2" />
                Add Reference
              </Button>
            </Accordion>

            <Accordion className="mb-6" label="Notes">
              <div className={disabledCursor}>
                <Textarea
                  cols="20"
                  rows="10"
                  value={notes.value || ''}
                  onChange={(e) => setNotes({ dirty: true, value: e.target.value })}
                  customStyle={disabledPointer}
                />
              </div>
            </Accordion>
        </>
      }
    </>
  );
}

export default ApplicantBackground;
