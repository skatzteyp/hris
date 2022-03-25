import React from 'react';
import {
  Text,
  Accordion,
  Dropdown,
  Calendar,
  Checkbox
} from '@ligph/ui';

import { ReactComponent as IconPlus } from '../../assets/images/icon-plus.svg';

const EmployeeInfo = () => {
  return (
    <div>
      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-4" label="Employment" open={true}>
        <div className="flex">
          <Dropdown
            className="w-1/3 mr-10"
            label="Position"
            placeholder="Select a position"
          />
          <Calendar
            className="w-1/3 mr-10"
            label="Date Hired"
            placeholder="Enter date"
            overflow={true}
          />
        </div>
        <div className="flex mt-4">
          <Dropdown
            className="w-1/3 mr-10"
            label="Level"
            placeholder="Select Level"
          />
          <Dropdown
            className="w-1/3 mr-10"
            label="Employment Status"
            placeholder="Select Status"
          />
        </div>
        <div className="flex mt-4 mb-5">
          <Text
            className="mr-10 w-1/3"
            type="text"
            placeholder="Enter Referrer name"
            label="Reffered By"
          />
        </div>
      </Accordion>

      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-4" label="Personal" open={true}>
        <div className="flex">
          <Dropdown
            className="w-1/3 mr-10"
            label="Civil Status"
            placeholder="Select civil status"
          />
          <Calendar
            className="w-1/3 mr-10"
            label="Birthday"
            name="dateOfBirth"
          />
          <Dropdown
            className="w-1/6 mr-10"
            type="text"
            placeholder="Enter age"
            label="Age"
            overflow={true}
          />
        </div>
        <div className="flex mt-4">
          <Dropdown
            className="w-1/3 mr-10"
            label="Gender"
            placeholder="Select Gender"
          />
          <Dropdown
            className="w-1/6 mr-10"
            type="text"
            placeholder="Enter Blood Type"
            label="Blood Type"
            overflow={true}
          />
        </div>
        <div className="mt-4">
          <Text
            className="w-full mt-4"
            type="text"
            placeholder="Enter home address"
            label="Home Address"
          />
        </div>
        <div className="relative mt-4 mb-5">
          <div style={{ position: 'absolute',
          top: '3px',
          left: '130px',
          zIndex: '9' }}>
            <Checkbox
            color="orange"
            bgColor="orange"
            text="Same as Home Address"
            />
          </div>
          <Text
            className="w-full mt-4"
            type="text"
            placeholder="Enter current address"
            label="Current Address"
          />

        </div>
      </Accordion>
      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-4" label="Contact">
        <div className="flex">
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter mobile number"
            label="Mobile Number"
          />
          <Text
            className="w-1/3 mr-10"
            type="email"
            placeholder="Enter email address"
            label="Email Address"
          />
        </div>
        <div className="mt-4 mb-5">
          <Text
            className="w-1/3"
            type="text"
            placeholder="Enter telephone number"
            label="Telephone Number"
          />
        </div>
      </Accordion>
      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-6" label="Government">
        <div className="flex">
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter sss number"
            label="SSS Number"
          />
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter philhealth number"
            label="PhilHealth Number"
          />
        </div>
        <div className="flex mt-4 mb-5">
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter tin number"
            label="TIN"
          />
          <Text
            className="w-1/3"
            type="text"
            placeholder="Enter HDFM Number"
            label="HDFM Number"
          />
        </div>
      </Accordion>
      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-6" label="Emergency">
        <div className="flex">
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter name of contact"
            label="Name of Contact"
          />
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter name of contact"
            label="Name of Contact"
          />
        </div>
        <div className="flex mt-4 mb-5">
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter contact number"
            label="Contact Number"
          />
          <Text
            className="w-1/3 mr-10"
            type="text"
            placeholder="Enter address"
            label="Address"
          />
        </div>
      </Accordion>
      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-6" label="Family Background">
        <h2 className="text-xs text-black font-semibold mb-2 inline-block">Dependent 1</h2>
        <div className="bg-gray-border rounded p-4">
          <div className="flex">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter name of dependent"
              label="Name of Dependent"
            />
            <Dropdown
              className="w-1/6 mr-10"
              placeholder="Select gender"
              label="Gender"
            />
            <Calendar
              className="w-1/3 mr-10"
              overflow={true}
              label="Birthday"
              name="birthdate"
              placeholder="Enter birthdate"
            />
          </div>
          <div className="flex mt-4">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter relationship"
              label="Relationship"
            />
            <Dropdown
              className="w-1/6 mr-10"
              placeholder="Select age"
              label="Age"
            />
          </div>
        </div>
        <h2 className="mt-4 text-xs text-black font-semibold mb-2 inline-block">Dependent 2</h2>
        <div className="bg-gray-border rounded p-4">
          <div className="flex">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter name of dependent"
              label="Name of Dependent"
            />
            <Dropdown
              className="w-1/6 mr-10"
              placeholder="Select gender"
              label="Gender"
            />
            <Calendar
              className="w-1/3 mr-10"
              overflow={true}
              label="Birthday"
              name="birthdate2"
              placeholder="Enter birthdate"
            />
          </div>
          <div className="flex mt-4 mb-5">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter relationship"
              label="Relationship"
            />
            <Dropdown
              className="w-1/6 mr-10"
              placeholder="Select age"
              label="Age"
            />
          </div>
        </div>
        <button className="mb-5 mt-5 cursor-pointer text-xs font-medium flex items-center focus:outline-none px-5 h-10 text-orange border border-orange rounded-full transition-all duration-500 hover:border-orange-dark-200 hover:text-orange-dark-200 group-hover:border-orange-dark-200 group-hover:text-orange-dark-200 transition duration-75 ease-linear undefined"><IconPlus className="mr-2 stroke-current" /> Add Dependent
        </button>
      </Accordion>
      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-6" label="Educational Background">
        <h2 className="text-xs text-black font-semibold mb-2 inline-block">Education 1</h2>
        <div className="bg-gray-border rounded p-4">
          <div className="flex">
            <Dropdown
              className="w-1/3 mr-10"
              placeholder="Select education level"
              label="Education Level"
            />
            <Text
              className="w-3/5 mr-10"
              type="text"
              placeholder="Enter name of school"
              label="Name of School"
            />
          </div>
          <div className="flex mt-4">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter degree/course"
              label="Degree/Course"
            />
            <Calendar
              className="w-1/4 mr-10"
              overflow={true}
              label="Inclusive Dates"
              name="inclusivedatesfrom"
              placeholder="Enter date from"
            />
            <p className="flex align-center justify-center items-center relative" style={{ top: '13px', right: '18px' }}>-</p>
            <Calendar
              className="w-1/4 mr-10"
              overflow={true}
              label="-"
              name="inclusivedatesto"
              placeholder="Enter date to"
            />
          </div>
        </div>
        <h2 className="mt-4 text-xs text-black font-semibold mb-2 inline-block">Education 2</h2>
        <div className="bg-gray-border rounded p-4">
          <div className="flex">
            <Dropdown
              className="w-1/3 mr-10"
              placeholder="Select education level"
              label="Education Level"
            />
            <Text
              className="w-3/5 mr-10"
              type="text"
              placeholder="Enter name of school"
              label="Name of School"
            />
          </div>
          <div className="flex mt-4">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter degree/course"
              label="Degree/Course"
            />
            <Calendar
              className="w-1/4 mr-10"
              overflow={true}
              label="Inclusive Dates"
              name="inclusivedatesfrom2"
              placeholder="Enter date from"
            />
            <p className="flex align-center justify-center items-center relative" style={{ top: '13px', right: '18px' }}>-</p>
            <Calendar
              className="w-1/4 mr-10"
              overflow={true}
              label="-"
              name="inclusivedatesto2"
              placeholder="Enter date to"
            />
          </div>
        </div>
        <button className="mb-5 mt-5 cursor-pointer text-xs font-medium flex items-center focus:outline-none px-5 h-10 text-orange border border-orange rounded-full transition-all duration-500 hover:border-orange-dark-200 hover:text-orange-dark-200 group-hover:border-orange-dark-200 group-hover:text-orange-dark-200 transition duration-75 ease-linear undefined"><IconPlus className="mr-2 stroke-current" /> Add Education
        </button>
      </Accordion>
      <Accordion backgroundColor="bg-orange-100" textColor="text-orange" className="mb-6" label="Work Experience">
        <h2 className="text-xs text-black font-semibold mb-2 inline-block">Work Experience 1</h2>
        <div className="bg-gray-border rounded p-4">
          <div className="flex">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter position title"
              label="Position Title"
            />
            <Text
              className="w-3/5 mr-10"
              type="text"
              placeholder="Enter company name"
              label="Company Name"
            />
          </div>
          <div className="flex mt-4">
            <Dropdown
              className="w-1/3 mr-10"
              placeholder="Select position level"
              label="Position Level"
            />
            <Calendar
              className="w-1/4 mr-10"
              overflow={true}
              label="Number of Years"
              name="numberofyears"
              placeholder="Enter number of years"
            />
          </div>
        </div>
        <h2 className="mt-4 text-xs text-black font-semibold mb-2 inline-block">Work Experience 2</h2>
        <div className="bg-gray-border rounded p-4">
          <div className="flex">
            <Text
              className="w-1/3 mr-10"
              type="text"
              placeholder="Enter position title"
              label="Position Title"
            />
            <Text
              className="w-3/5 mr-10"
              type="text"
              placeholder="Enter company name"
              label="Company Name"
            />
          </div>
          <div className="flex mt-4">
            <Dropdown
              className="w-1/3 mr-10"
              placeholder="Select position level"
              label="Position Level"
            />
            <Calendar
              className="w-1/4 mr-10"
              overflow={true}
              label="Number of Years"
              name="numberofyears2"
              placeholder="Enter number of years"
            />
          </div>
        </div>
        <button className="mb-5 mt-5 cursor-pointer text-xs font-medium flex items-center focus:outline-none px-5 h-10 text-orange border border-orange rounded-full transition-all duration-500 hover:border-orange-dark-200 hover:text-orange-dark-200 group-hover:border-orange-dark-200 group-hover:text-orange-dark-200 transition duration-75 ease-linear undefined"><IconPlus className="mr-2 stroke-current" /> Add Work Experience
        </button>
      </Accordion>
    </div>
  );
}

export default EmployeeInfo;
