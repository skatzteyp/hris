import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  Accordion,
  Text,
  FileUpload,
  Dropdown,
  Calendar,
  Checkbox,
  Textarea,
  Loader
} from '@ligph/ui';

import useDebounce from '../../hooks/useDebounce';
import useApplicant from '../../hooks/useApplicant';
import useConstants from '../../hooks/useConstants';
import { CONSTANTS } from '../../utils/constants';
import LoadingMessage from '../common/LoadingMessage';

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';

const INFO_FIELDS = [
  'firstName', 'lastName', 'appliedAt', 'email', 'mobileNumber', 'secondaryContactNumber',
  'dateOfBirth', 'age', 'fatherName', 'motherName', 'spouseName', 'sss', 'tin', 'philhealth',
  'pagibig', 'course', 'school', 'resume', 'referrerName' ];

const getInfo = (applicant) => {
  return Object.keys(applicant)
    .filter(key => INFO_FIELDS.includes(key))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: applicant[curr]
      }
    }, { dirty: false });
};

const ApplicantInfo = ({valid}) => {
  const constants = useConstants();
  const { applicant, updateApplicant, createToken, processing, updating } = useApplicant();

  // const { ApplicantInfo } = applicant;
  // states
  const [info, setInfo] = useState(getInfo(applicant));
  const [notes, setNotes] = useState({ text: applicant.notes });
  const [homeAddress, setHomeAddress] = useState(applicant.homeAddress);
  const [currentAddress, setCurrentAddress] = useState(applicant.currentAddress);
  const [portfolios, setPortfolios] = useState({ data: applicant.portfolios });

  // debounced states
  const debouncedInfo = useDebounce(info, 1000);
  const debouncedNotes = useDebounce(notes, 1000);
  const debouncedHomeAddress = useDebounce(homeAddress, 1000);
  const debouncedCurrentAddress = useDebounce(currentAddress, 1000);
  const debouncedPortfolios = useDebounce(portfolios, 1000);
  const [process, setProcess] = useState(processing);

  useEffect(() => {
    setInfo(getInfo(applicant));
    setNotes({ text: applicant.notes });
    setHomeAddress(applicant.homeAddress);
    setCurrentAddress(applicant.currentAddress);
    setPortfolios({ data: applicant.portfolios });
  }, [applicant]);

  // update applicant info with debounce
  useEffect(() => {
    if (info.dirty && debouncedInfo.dirty) {
      let data = { ...info };
      delete data.dirty;

      updateApplicant({ info: data });
      setInfo({
        ...info,
        dirty: false
      });
    }
  }, [ info, debouncedInfo, updateApplicant ]);

  const handleInfoChange = (key, value) => {
    setInfo({
      ...info,
      dirty: true,
      [key]: value
    });
  }

  // update applicant notes with debounce
  useEffect(() => {
    if (notes.dirty && debouncedNotes.dirty) {
      updateApplicant({ notes: notes.text });
      setNotes({
        ...notes,
        dirty: false
      });
    }
  }, [ notes, debouncedNotes, updateApplicant ]);

  const handleNotesChange = (text) => {
    setNotes({
      text,
      dirty: true
    });
  }

  // update connecting fields
  const handleConnect = (key, value) => {
    updateApplicant({ [key]: { connect: value } });
  }

  // update home address with debounce
  useEffect(() => {
    if (homeAddress.dirty && debouncedHomeAddress.dirty) {
      updateApplicant({ homeAddress:{ upsert: { address1: homeAddress.address1 } } });
      setHomeAddress({
        ...homeAddress,
        dirty: false
      });
    }
  }, [ homeAddress, debouncedHomeAddress, updateApplicant ]);

  const handleHomeAddressChange = (value) => {
    setHomeAddress({
      address1: value,
      dirty: true
    });
  }

  // update current address with debounce
  useEffect(() => {
    if (currentAddress.dirty && debouncedCurrentAddress.dirty) {
      updateApplicant({ currentAddress: { upsert: { address1:  currentAddress.address1 } } });
      setCurrentAddress({
        ...currentAddress,
        dirty: false
      });
    }
  }, [ currentAddress, debouncedCurrentAddress, updateApplicant ]);

  const handleCurrentAddressChange = (value) => {
    setCurrentAddress({
      address1: value,
      dirty: true
    });
  }

  // update portfolios with debounce
  useEffect(() => {
    if (portfolios.dirty && debouncedPortfolios.dirty) {
      updateApplicant({
        portfolios: {
          upsert: [...portfolios.data]
        }
      });
      setPortfolios({
        ...portfolios,
        dirty: false
      });
    }
  }, [ portfolios, debouncedPortfolios, updateApplicant ]);

  const handlePortfolioAdd = () => {
    updateApplicant({ portfolios: { upsert: [{ link: 'Enter URL' }] } });
  }

  const handlePortfolioRemove = (id) => {
    updateApplicant({ portfolios: { delete: [id] } });
  }

  const handlePortfolioChange = (i, value) => {
    portfolios.data[i].link = value;
    setPortfolios({ data: portfolios.data.map(p => ({ id: p.id, link: p.link })), dirty: true });
  }

  let disabled = applicant.status.id > CONSTANTS.STATUS.NEW;
  let disabledCursor = applicant.status.id > CONSTANTS.STATUS.NEW ? 'cursor-not-allowed': 'cursor-auto';
  let disabledPointer = applicant.status.id > CONSTANTS.STATUS.NEW ? 'pointer-events-none': 'pointer-events-auto';

  useEffect(() => {
    if (applicant.jobTitle.name && applicant.source.name && applicant.level.name) {
      return valid(false);
    } else {
      return valid(true);
    }
  })

  useEffect(() => {
    if(updating) {
      setProcess(false);
    }
  }, [updating])


  function sortItems(itemA, itemB) {
      const valueA = itemA.value;
      const valueB = itemB.value;
      return parseFloat(valueA) - parseFloat(valueB);
  }

  return (
    <>
      {processing && process ? <div className="relative min-h-sm"><Loader /></div>
        : <>
            {updating ? <LoadingMessage text="Saving"/>
              : null
            }
            <div className="flex items-end">
              <div className={disabledCursor}>
                <Text
                  className={`w-md mr-5 ${disabledPointer}`}
                  label="Public Link"
                  placeholder="Click Generate to create public link"
                  value={applicant.token ? `https://hris.cody.asia/recruitment/applicants/${applicant.id}/info?token=${applicant.token}` : ''}
                  readOnly
                />
              </div>
              <Button
                variant="fill"
                onClick={() => createToken()}
                disabled={disabled}
              >
                Generate
              </Button>
            </div>
            <Accordion className="mb-6 mt-5" label="Application" open={true}>
              <div className="flex">
                <div className="w-3/5">
                  <div className="flex">
                    <div className={`w-80 mr-10 ${disabledCursor}`}>
                    <Dropdown
                      className={disabledPointer}
                      label="Position Applied"
                      placeholder="Select a position"
                      items={constants.jobTitles}
                      value={applicant.jobTitle.id || 0}
                      onChange={(id) => handleConnect('jobTitle', id)}
                      overflow={true}
                      id="jobTitle"
                      error={applicant.jobTitle.name ? '' : 'Job Title is required'}
                    />
                    </div>
                    <div className={`w-80 relative z-30 ${disabledCursor}`}>
                      <Dropdown
                        className={disabledPointer}
                        label="Source"
                        placeholder="Select source"
                        items={constants.sources}
                        value={applicant.source.id || 0}
                        onChange={(id) => handleConnect('source', id)}
                        overflow={true}
                        id="source"
                        error={applicant.source.name ? '' : 'Source is required'}
                      />
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <div className={`w-80 mr-10 ${disabledCursor}`}>
                      <Dropdown
                        className={disabledPointer}
                        label="Job Post Level"
                        placeholder="Select level"
                        items={constants.levels}
                        value={applicant.level.id || 0}
                        onChange={(id) => handleConnect('level', id)}
                        overflow={true}
                        id="level"
                        error={applicant.level.name ? '' : 'Level is required'}
                      />
                    </div>
                    <div className={`w-80 ${disabledCursor}`}>
                      <Text
                        className={disabledPointer}
                        type="text"
                        placeholder="Enter referrer name"
                        label="Referrer Name"
                        value={info.referrerName}
                        onChange={(e) => handleInfoChange('referrerName', e.target.value)}
                        disabled={applicant.source.name !== 'Referral'}
                      />
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <div className={`w-80 mr-10 ${disabledCursor}`}>
                      <Calendar
                        className={disabledPointer}
                        overflow={true}
                        label="Date Applied"
                        name="appliedAt"
                        timeFormat={false}
                        value={info.appliedAt}
                        placeholder="Enter date"
                        onChange={(e) => handleInfoChange('appliedAt', moment(e).format('YYYY-MM-DD'))}
                        error={applicant.appliedAt ? '' : 'this field is required'}
                      />
                    </div>
                    <div className={`w-80 ${disabledCursor}`}>
                      <Dropdown
                        className={disabledPointer}
                        label="Validity"
                        placeholder="Select validity"
                        items={constants.validities}
                        value={applicant.validity.id}
                        onChange={(id) => handleConnect('validity', id)}
                        overflow={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/3 pl-10">
                  <div>
                    <label className="text-black text-xs mb-2 font-semibold inline-block">Resume</label>
                    <div className="flex items-center mb-5">
                      <span className="text-sm font-light inline-block mr-5 w-40 truncate">
                        {applicant.resume}
                      </span>
                      <>
                        { applicant.resume ?
                            <a href="https://i.pinimg.com/736x/e3/3c/2f/e33c2fa94c03efa06678116f80d62d0d.jpg" download>
                              <Button
                                variant="outline"
                              >
                                Download Resume
                            </Button>
                            </a>
                          : ''
                        }
                      </>
                    </div>
                    <> { applicant.resume ? '' :
                      <FileUpload
                        className="p-16"
                        allowExtension="doc,pdf,png"
                        onChange={console.log}
                      />
                      }
                    </>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Contact">
              <div className="flex">
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="number"
                    placeholder="Enter mobile number"
                    label="Mobile Number"
                    value={info.mobileNumber}
                    onChange={(e) => handleInfoChange('mobileNumber', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="email"
                    placeholder="Enter email address"
                    label="Email Address"
                    value={info.email}
                    onChange={(e) => handleInfoChange('email', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="number"
                    placeholder="Enter secondary number"
                    label="Secondary Number"
                    value={info.secondaryContactNumber || ''}
                    onChange={(e) => handleInfoChange('secondaryContactNumber', e.target.value)}
                  />
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Personal">
              <div className="flex">
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Calendar
                    className={disabledPointer}
                    overflow={true}
                    label="Birthday"
                    name="dateOfBirth"
                    timeFormat={false}
                    value={info.dateOfBirth || ''}
                    placeholder="Enter date"
                    onChange={(e) => handleInfoChange('dateOfBirth', moment(e).format('YYYY-MM-DD'))}
                  />
                </div>
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="text"
                    placeholder="Enter age"
                    label="Age"
                    value={info.age}
                    onChange={(e) => handleInfoChange('age', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 ${disabledCursor}`}>
                  <Dropdown
                    className={disabledPointer}
                    label="Civil Status"
                    placeholder="Select civil status"
                    items={constants.maritalStatuses}
                    value={applicant.maritalStatus.id || 0}
                    onChange={(id) => handleConnect('maritalStatus', id)}
                    overflow={true}
                  />
                </div>
              </div>
              <div className={`w-full mt-4 ${disabledCursor}`}>
                <Text
                  className={disabledPointer}
                  type="text"
                  placeholder="Enter home address"
                  label="Home Address"
                  value={homeAddress.address1}
                  onChange={(e) => handleHomeAddressChange(e.target.value)}
                />
              </div>
              <div className={`w-full mt-4 ${disabledCursor}`}>
                <Text
                  className={disabledPointer}
                  type="text"
                  placeholder="Enter current address"
                  label="Current Address"
                  value={currentAddress.address1}
                  onChange={(e) => handleCurrentAddressChange(e.target.value)}
                />
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Family">
              <div className="flex">
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="text"
                    placeholder="Enter father's name"
                    label="Father's Name"
                    value={info.fatherName}
                    onChange={(e) => handleInfoChange('fatherName', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="email"
                    placeholder="Enter mother's name"
                    label="Mother's Name"
                    value={info.motherName}
                    onChange={(e) => handleInfoChange('motherName', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="text"
                    placeholder="Enter spouse name"
                    label="Spouse Name (If Married)"
                    value={info.spouseName}
                    onChange={(e) => handleInfoChange('spouseName', e.target.value)}
                  />
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Government">
              <div className="flex">
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="text"
                    placeholder="Enter sss number"
                    label="SSS"
                    value={info.sss}
                    onChange={(e) => handleInfoChange('sss', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="email"
                    placeholder="Enter tin number"
                    label="TIN"
                    value={info.tin}
                    onChange={(e) => handleInfoChange('tin', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="text"
                    placeholder="Enter philhealth number"
                    label="Philhealth"
                    value={info.philhealth}
                    onChange={(e) => handleInfoChange('philhealth', e.target.value)}
                  />
                </div>
              </div>
              <div className={`w-1/3 mt-4 ${disabledCursor}`}>
                <Text
                  className={disabledPointer}
                  type="text"
                  placeholder="Enter pag-ibig number"
                  label="Pag-ibig"
                  value={info.pagibig}
                  onChange={(e) => handleInfoChange('pagibig', e.target.value)}
                />
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Education">
              <div className="flex">
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Dropdown
                    className={disabledPointer}
                    label="Highest Education Attainment"
                    placeholder="Select level"
                    items={constants.educationalAttainments}
                    value={applicant.educationalAttainment.id || 0}
                    onChange={(id) => handleConnect('educationalAttainment', id)}
                    overflow={true}
                  />
                </div>
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="text"
                    placeholder="Enter school name"
                    label="School"
                    value={info.school}
                    onChange={(e) => handleInfoChange('school', e.target.value)}
                  />
                </div>
                <div className={`w-1/3 ${disabledCursor}`}>
                  <Text
                    className={disabledPointer}
                    type="text"
                    placeholder="Enter course"
                    label="Course"
                    value={info.course}
                    onChange={(e) => handleInfoChange('course', e.target.value)}
                  />
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Employment">
              <div className="flex">
                <div className={`w-1/3 mr-10 ${disabledCursor}`}>
                  <Dropdown
                    className={disabledPointer}
                    label="Work History"
                    placeholder="Select work history"
                    items={constants.yearsExperiences}
                    value={applicant.workHistories.length && applicant.workHistories[0].yearsExperience ? applicant.workHistories[0].yearsExperience.id : 0}
                    overflow={true}
                  />
                </div>
                <div className={`w-1/3 ${disabledCursor}`}>
                  <Dropdown
                    className={disabledPointer}
                    label="Recent Compensation Package"
                    placeholder="Select package"
                    items={constants.compensationPackages.sort(sortItems)}
                    value={applicant.workHistories.length && applicant.workHistories[0].compensationPackage ? applicant.workHistories[0].compensationPackage.id : 0}
                    overflow={true}
                  />
                </div>
              </div>
              <>
                {applicant.workHistories.map((work, i) => (
                  <div className="mt-4" key={work.id}>
                    <label className="text-xs font-semibold">Employment {i + 1}</label>
                    <div className="rounded bg-gray-border p-6 flex mt-2">
                      <div className={`w-1/4 mr-3 ${disabledCursor}`}>
                        <Text
                          className={disabledPointer}
                          label="Company Name"
                          placeholder="Enter company name"
                          value={work.company || ''}
                          onChange={() => {}}
                        />
                      </div>
                      <div className={`w-1/4 mr-3 ${disabledCursor}`}>
                        <Text
                          className={disabledPointer}
                          label="Position"
                          placeholder="Enter position"
                          value={work.position || ''}
                          onChange={() => {}}
                        />
                      </div>
                      <div className={`w-1/4 mr-3 ${disabledCursor}`}>
                        <Calendar
                          className={disabledPointer}
                          label="Start Date"
                          name={`startDate${i}`}
                          timeFormat={false}
                          overflow={true}
                          value={work.startDate || ''}
                          onChange={() => {}}
                        />
                      </div>
                      <div className={`w-1/4 ${disabledCursor}`}>
                        <Calendar
                          className={disabledPointer}
                          label="End Date"
                          name={`endDate${i}`}
                          timeFormat={false}
                          overflow={true}
                          value={work.endDate || ''}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="w-0 relative">
                        <div className="absolute right-0 mr-24" style={{ marginTop: 2 + 'px'}}>
                          <Checkbox
                            text="Present"
                            checked={false}
                            name="present"
                            onChange={console.log}
                            isDisabled={disabled}
                          />
                        </div>
                        <Button
                          className="absolute right-0"
                          disabled={disabled}
                        >
                          <IconX className="stroke-current stroke-2 text-black-300" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            <div className="mt-4">
              <Button
                onClick={() => {}}
                variant="outline"
                disabled={disabled}
              >
                <IconPlus className="mr-2 stroke-current" />
                Add Employment
              </Button>
            </div>
            </Accordion>

            <Accordion className="mb-6" label="Portfolio">
              <div className="flex">
                <div className="w-1/2">
                  <div className="grid grid-cols-1 col-gap-12 row-gap-4">
                    {portfolios.data.map((p, i) => {
                      return (
                        <div className="flex items-center" key={p.id}>
                          <Text
                            className="w-80"
                            type="text"
                            placeholder="Enter URL"
                            label={`Link ${i+1}`}
                            value={p.link}
                            onChange={(e) => handlePortfolioChange(i, e.target.value)}
                          />
                          <Button
                            className="mt-6 ml-4"
                            onClick={() => handlePortfolioRemove(p.id)}
                            disabled={disabled}
                          >
                            <IconX className="stroke-2 stroke-current text-black-300" />
                          </Button>
                        </div>
                      )
                    })}
                    <div className="my-0">
                      <Button
                        onClick={handlePortfolioAdd}
                        variant="outline"
                        disabled={disabled}
                        placeholder={handlePortfolioAdd}
                      >
                        <IconPlus className="mr-2 stroke-current" />
                        Add Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion className="mb-6" label="Notes">
              <div className={disabledCursor}>
                <Textarea
                  cols="20"
                  rows="10"
                  value={notes.text}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  customStyle={disabledPointer}
                />
              </div>
            </Accordion>
        </>
      }
    </>
  );
}

export default ApplicantInfo;
