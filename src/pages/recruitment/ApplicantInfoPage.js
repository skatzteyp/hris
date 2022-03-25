import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Text,
  Accordion,
  Dropdown,
  Calendar,
  FileUpload
} from '@ligph/ui';

import useApplicant from '../../hooks/useApplicant';
import useConstants from '../../hooks/useConstants';
import { CONSTANTS } from '../../utils/constants';
import { createApplicantPublic }from '../../redux/modules/applicant/applicantActions';
import { upload }from '../../redux/modules/file/fileActions';

import { ReactComponent as IconLogo } from '../../assets/images/logo.svg';
import { ReactComponent as IconDownload } from '../../assets/images/icon-download.svg';
import { ReactComponent as IconUpload } from '../../assets/images/icon-upload.svg';
import { ReactComponent as IconRemove } from '../../assets/images/icon-remove.svg';
import { ReactComponent as IconAdd } from '../../assets/images/icon-plus.svg';

const ApplicantInfoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { file } = useSelector(state => state);
  const searchParams = new URLSearchParams(location.search);
  const constants = useConstants(true);
  const { applicant: app, updateApplicantPublic, processing } = useApplicant(id, searchParams.get('token'));
  const [applicant, setApplicant] = useState(app);
  const [removedPortfolios, setRemovedPortfolios] = useState([]);
  const [removedWorkHistories, setRemovedWorkHistories] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (id !== applicant.id && id !== 'new') {
      setApplicant(app);
    }
  }, [app, id, applicant]);

  useEffect(() => {
    if (!processing && submit) {
      alert('Submitted successfully');
    }
  }, [processing, submit]);

  useEffect(() => {
    if (applicant.resume !== file.items[`${id}-resume`]) {
      applicant.resume = file.items[`${id}-resume`];
      setApplicant({ ...applicant });
    }
  }, [file, id, applicant]);

  const handleChange = (key, value) => {
    setApplicant({
      ...applicant,
      [key]: value
    });
  }

  const handlePortfolioChange = (i, value) => {
    applicant.portfolios[i].link = value;
    setApplicant({
      ...applicant
    });
  }

  const handlePortfolioAdd = () => {
    applicant.portfolios.push({ link: '' });
    setApplicant({
      ...applicant
    });
  }

  const handlePortfolioRemove = (i) => {
    if (applicant.portfolios[i].id) {
      setRemovedPortfolios([...removedPortfolios, applicant.portfolios[i].id]);
    }
    applicant.portfolios.splice(i, 1);
    setApplicant({
      ...applicant
    });
  }

  const handleWorkHistoryChange = (i, key, value) => {
    if (!applicant.workHistories[i]) {
      applicant.workHistories[i] = {};
    }

    applicant.workHistories[i][key] = value;
    setApplicant({
      ...applicant
    });
  }

  const handleWorkHistoryAdd = () => {
    applicant.workHistories.push({ });
    setApplicant({
      ...applicant
    });
  }

  const handleWorkHistoryRemove = (i) => {
    if (applicant.workHistories[i].id) {
      setRemovedWorkHistories([...removedWorkHistories, applicant.workHistories[i].id]);
    }
    applicant.workHistories.splice(i, 1);
    setApplicant({
      ...applicant
    });
  }

  const handleUpload = (file) => {
    dispatch(upload({ file, name: `${id}-resume` }));
  }

  const handleSubmit = () => {
    delete applicant.homeAddress.__typename;
    delete applicant.currentAddress.__typename;

    let data = {
      applicantInfo: ['firstName', 'lastName', 'appliedAt', 'email', 'mobileNumber', 'secondaryContactNumber', 'dateOfBirth',
        'age', 'fatherName', 'motherName', 'spouseName', 'sss', 'tin', 'philhealth', 'pagibig', 'course', 'school', 'resume']
        .reduce((acc, curr) => {
          return {...acc, [curr]: applicant[curr] };
        }, {}),
      jobTitle: { connect: applicant.jobTitle.id },
      level: { connect: applicant.level.id },
      source: { connect: applicant.source.id },
      maritalStatus: { connect: applicant.maritalStatus.id },
      educationalAttainment: { connect: applicant.educationalAttainment.id },
      homeAddress: { upsert: applicant.homeAddress },
      currentAddress: { upsert: applicant.currentAddress },
      portfolios: { upsert: applicant.portfolios.map((p) => ({ id: p.id, link: p.link })), delete: removedPortfolios },
      workHistories: { upsert: applicant.workHistories, delete: removedWorkHistories }
    }

    if (id === 'new') {
      data.applicantInfo.appliedAt = moment().format('YYYY-MM-DD');
      data.status = {
        connect: CONSTANTS.STATUS.NEW
      };
      dispatch(createApplicantPublic(data))
    }
    else {
      data.id = applicant.id;
      data.token = searchParams.get('token');
      updateApplicantPublic(data);
    }

    setSubmit(true);
  }

  function sortItems(itemA, itemB) {
      const valueA = itemA.value;
      const valueB = itemB.value;
      return parseFloat(valueA) - parseFloat(valueB);
  }

  return (
    <>
    {applicant ? (
      <div>
        <header className="h-16 bg-blue text-white px-12 flex items-center">
          <IconLogo className="fill-current w-16 h-16"/>
        </header>
        <div className="bg-gray-background py-12 px-20 pb-32">
          <div className="w-full text-black">
            <h1 className="text-3xl font-medium mb-8">Job Application Form</h1>
            <div className="bg-white border border-gray-border p-8 pb-12 flex items-center">
              <div className="w-1/3 pr-4">
                <Text
                  label="First Name"
                  value={applicant.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
              </div>
              <div className="w-1/3 pl-4">
                <Text
                  label="Last Name"
                  value={applicant.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </div>
            </div>
            <div className="bg-white border border-gray-border p-8 pb-2 mt-8">
              <Accordion className="mb-4" label="Application" open={true}>
                <div className="flex">
                  <div className="w-3/5">
                    <div className="flex">
                      <Dropdown
                        className="w-80 mr-10"
                        label="Position Applied"
                        placeholder="Select a position"
                        overflow={true}
                        items={constants.jobTitles}
                        value={applicant.jobTitle.id || 0}
                        onChange={(id) => handleChange('jobTitle', { id })}
                      />
                      <Dropdown
                        className="w-80"
                        label="Source"
                        placeholder="Select source"
                        overflow={true}
                        items={constants.sources}
                        value={applicant.source.id || 0}
                        onChange={(id) => handleChange('source', { id })}
                      />
                    </div>
                    <div className="flex mt-4">
                      <Dropdown
                        className="w-80 mr-10"
                        label="Job Post Level"
                        placeholder="Select level"
                        overflow={true}
                        items={constants.levels}
                        value={applicant.level.id || 0}
                        onChange={(id) => handleChange('level', { id })}
                      />
                      <Text
                        className="w-80"
                        type="text"
                        placeholder="Enter Referrer name"
                        label="Referrer (LIG Employee)"
                        value={applicant.referrer.id || 0}
                        onChange={(e) => handleChange('referrer', { id: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="mt-4">
                      <label className="text-black text-xs mb-2 font-semibold inline-block">Resume</label>
                      <div className={`flex items-center mb-5 ${applicant.resume ? '' : 'hidden'}`}>
                        <a href={`https://api.cody.asia/storage/${applicant.resume}`} download>
                          <Button
                            variant="outline"
                          >
                            {<IconDownload className="fill-current w3-h-4 mr-2" />}
                            Download Resume
                          </Button>
                        </a>
                      </div>
                      <FileUpload
                        className="p-16"
                        allowExtension="doc,pdf,png"
                        onChange={handleUpload}
                        icon={<IconUpload className="fill-current" />}
                      />
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion className="mb-4" label="Contact">
                <div className="flex">
                  <Text
                    className="w-1/3 mr-10"
                    type="text"
                    placeholder="Enter mobile number"
                    label="Mobile Number"
                    value={applicant.mobileNumber}
                    onChange={(e) => handleChange('mobileNumber', e.target.value)}
                  />
                  <Text
                    className="w-1/3 mr-10"
                    type="email"
                    placeholder="Enter email address"
                    label="Email Address"
                    value={applicant.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  <Text
                    className="w-1/3"
                    type="text"
                    placeholder="Enter secondary number"
                    label="Secondary Contact Number"
                    value={applicant.secondaryContactNumber}
                    onChange={(e) => handleChange('secondaryContactNumber', e.target.value)}
                  />
                </div>
              </Accordion>

              <Accordion className="mb-6" label="Personal">
                <div className="flex">
                  <Calendar
                    className="w-1/3 mr-10"
                    overflow={true}
                    label="Birthday"
                    name="dateOfBirth"
                    timeFormat={false}
                    value={applicant.dateOfBirth || ''}
                    placeholder="Enter date"
                    onChange={(e) => handleChange('dateOfBirth', moment(e).format('YYYY-MM-DD'))}
                  />
                  <Text
                    className="w-1/3 mr-10"
                    type="text"
                    placeholder="Enter age"
                    label="Age"
                    value={applicant.age || ''}
                    onChange={(e) => handleChange('age', e.target.value)}
                  />
                  <Dropdown
                    className="w-1/3"
                    label="Civil Status"
                    placeholder="Select civil status"
                    overflow={true}
                    items={constants.maritalStatuses}
                    value={applicant.maritalStatus.id || 0}
                    onChange={(e) => handleChange('maritalStatus', { id })}
                  />
                </div>
                <Text
                  className="w-full mt-4"
                  type="text"
                  placeholder="Enter home address"
                  label="Home Address"
                  value={applicant.homeAddress ? applicant.homeAddress.address1 : ''}
                  onChange={(e) => handleChange('homeAddress', { address1: e.target.value })}
                />
                <div className="relative">
                  <Text
                    className="w-full mt-4"
                    type="text"
                    placeholder="Enter current address"
                    label="Current Address"
                    value={applicant.currentAddress ? applicant.currentAddress.address1 : ''}
                    onChange={(e) => handleChange('currentAddress', { address1: e.target.value })}
                  />
                </div>
              </Accordion>

              <Accordion className="mb-6" label="Family">
                <div className="flex">
                  <Text
                    className="w-1/3 mr-10"
                    type="text"
                    placeholder="Enter father's name"
                    label="Father's Name"
                    value={applicant.fatherName}
                    onChange={(e) => handleChange('fatherName', e.target.value)}
                  />
                  <Text
                    className="w-1/3 mr-10"
                    type="email"
                    placeholder="Enter mother's name"
                    label="Mother's Name"
                    value={applicant.motherName}
                    onChange={(e) => handleChange('motherName', e.target.value)}
                  />
                  <Text
                    className="w-1/3"
                    type="text"
                    placeholder="Enter spouse name"
                    label="Spouse Name (If Married)"
                    value={applicant.spouseName}
                    onChange={(e) => handleChange('spouseName', e.target.value)}
                  />
                </div>
              </Accordion>

              <Accordion className="mb-6" label="Government">
                <div className="flex">
                  <Text
                    className="w-1/3 mr-10"
                    type="text"
                    placeholder="Enter sss number"
                    label="SSS Number"
                    value={applicant.sss}
                    onChange={(e) => handleChange('sss', e.target.value)}
                  />
                  <Text
                    className="w-1/3 mr-10"
                    type="text"
                    placeholder="Enter tin number"
                    label="Tax Identification Number"
                    value={applicant.tin}
                    onChange={(e) => handleChange('tin', e.target.value)}
                  />
                  <Text
                    className="w-1/3"
                    type="text"
                    placeholder="Enter philhealth number"
                    label="PhilHealth Member ID"
                    value={applicant.philhealth}
                    onChange={(e) => handleChange('philhealth', e.target.value)}
                  />
                </div>
                <Text
                  className="w-1/3 mt-4"
                  type="text"
                  placeholder="Enter pag-ibig number"
                  label="PAG IBIG Number"
                  value={applicant.pagibig}
                  onChange={(e) => handleChange('pagibig', e.target.value)}
                />
              </Accordion>

              <Accordion className="mb-6" label="Education">
                <div className="flex">
                  <Dropdown
                    className="w-1/3 mr-10"
                    label="Highest Educational Attainment"
                    placeholder="Select level"
                    overflow={true}
                    items={constants.educationalAttainments}
                    value={applicant.educationalAttainment.id || 0}
                    onChange={(id) => handleChange('educationalAttainment', { id })}
                  />
                  <Text
                    className="w-1/3"
                    type="text"
                    placeholder="Enter course"
                    label="Course"
                    value={applicant.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                  />
                  <Text
                    className="w-1/3 mr-10"
                    type="text"
                    placeholder="Enter school name"
                    label="School"
                    value={applicant.school}
                    onChange={(e) => handleChange('school', e.target.value)}
                  />
                </div>
              </Accordion>

              <Accordion className="mb-6" label="Employment">
                <div className="flex">
                  <Dropdown
                    className="w-1/3 mr-10"
                    label="Years Experience"
                    placeholder="Select Years Experience"
                    overflow={true}
                    items={constants.yearsExperiences}
                    value={applicant.workHistories.length && applicant.workHistories[0].yearsExperience ? applicant.workHistories[0].yearsExperience.id : 0}
                    onChange={(id) => handleWorkHistoryChange(0, 'yearsExperience', { id })}
                  />
                  <Dropdown
                    className="w-1/3"
                    label="Recent Compensation Package"
                    placeholder="Select package"
                    overflow={true}
                    items={constants.compensationPackages.sort(sortItems)}
                    value={applicant.workHistories.length && applicant.workHistories[0].compensationPackage ? applicant.workHistories[0].compensationPackage.id : 0}
                    onChange={(id) => handleWorkHistoryChange(0, 'compensationPackage', { id })}
                  />
                </div>
                <>
                {applicant.workHistories.map((work, i) => (
                  <div className="mt-6" key={i}>
                    <label className="text-xs font-semibold block mb-2">Employment {i+1}</label>
                    <div className="bg-gray-border p-4 pt-6">
                      <div className="flex items-center">
                        <div className="w-80 pr-3">
                          <Text
                            type="text"
                            placeholder="Enter company name"
                            label="Company Name"
                            inputClassName="bg-white"
                            value={work.company}
                            onChange={(e) => handleWorkHistoryChange(i, 'company', e.target.value)}
                          />
                        </div>
                        <div className="w-80 px-3">
                          <Text
                            type="text"
                            placeholder="Enter position"
                            label="Position"
                            inputClassName="bg-white"
                            value={work.position}
                            onChange={(e) => handleWorkHistoryChange(i, 'position', e.target.value)}
                          />
                        </div>
                        <div className="w-64 px-3">
                          <Calendar
                            overflow={true}
                            label="Start Date"
                            name="startDate2"
                            timeFormat={false}
                            value={work.startDate || ''}
                            placeholder="Enter start date"
                            onChange={(e) => handleWorkHistoryChange(i, 'startDate', moment(e).format('YYYY-MM-DD'))}
                          />
                        </div>
                        <div className="w-64 pl-3">
                          <Calendar
                            overflow={true}
                            label="End Date"
                            name="endDate2"
                            timeFormat={false}
                            value={work.endDate || ''}
                            placeholder="Enter end date"
                            onChange={(e) => handleWorkHistoryChange(i, 'endDate', moment(e).format('YYYY-MM-DD'))}
                          />
                        </div>
                      </div>
                      <Button
                        className="absolute top-0 right-0 transform -translate-x-4 translate-y-4"
                        onClick={() => handleWorkHistoryRemove(i)}
                      >
                        <span className="text-black-300">{<IconRemove className="fill-current w-3 h-3" />}</span>
                      </Button>
                    </div>
                  </div>
                ))}
                </>


                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={handleWorkHistoryAdd}
                  >
                    {<IconAdd className="mr-2" />}
                    Add Company
                  </Button>
                </div>
              </Accordion>

              <Accordion className="mb-6" label="Portfolio">
                <>
                {applicant.portfolios.map((portfolio, i) => (
                  <div className="flex items-center" key={i}>
                    <Text
                      className="w-6/12"
                      type="text"
                      placeholder="Enter link"
                      label={`Link ${i+1}`}
                      value={portfolio.link}
                      onChange={(e) => handlePortfolioChange(i, e.target.value)}
                    />
                    <Button className="mt-6 ml-4" onClick={() => handlePortfolioRemove(i)}>
                      <IconRemove className="stroke-2 stroke-current text-black-300 w-3 h-3" />
                    </Button>
                  </div>
                ))}
                </>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePortfolioAdd}
                  >
                    <IconAdd className="mr-2" />
                    Add Link
                  </Button>
                </div>
              </Accordion>
            </div>
            <div className="bg-white border border-gray-border py-5 px-8 mt-3 flex justify-end">
              <Button
                variant="fill"
                className="w-24 justify-center"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="h-8 bg-blue">
        </div>
      </div>
    ) : null
    }
    </>
  );
};

export default ApplicantInfoPage;
