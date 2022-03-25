import React from 'react';
import {
  Button,
  Text,
  Calendar,
  Textarea,
  Accordion,
} from '@ligph/ui';

import { ReactComponent as IconLogo } from '../../assets/images/logo.svg';
import profile from '../../assets/images/profile.jpg';

const ApplicantPrefinalPage = () => {
  return (
    <div>
      <header className="h-16 bg-blue text-white px-12 flex items-center">
        <IconLogo class="fill-current w-16 h-16" />
      </header>
      <div className="bg-gray-background py-12 px-20">
        <div className="w-full text-black">
          <h1 className="text-3xl font-medium mb-8">Applicant Questionnair</h1>
          <div className="bg-white border border-gray-border p-8 pb-12 flex items-center">
            <div className="relative">
              <div className="rounded-full w-32 h-32 overflow-hidden">
                <img src={profile} alt="" />
              </div>
              <Button className="mx-auto transform translate-y-6 absolute left-0 right-0 bottom-0">
                Upload an Image
              </Button>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex">
                <div className="w-1/3 pr-4 pl-8">
                  <Text
                    label="First Name"
                    className=""
                  />
                </div>
                <div className="w-1/3 px-4">
                  <Text
                    label="Middle Name"
                  />
                </div>
                <div className="w-1/3 pl-4">
                  <Text
                    label="Last Name"
                  />
                </div>
              </div>
              <div className="flex mt-2">
                <div className="w-1/3 pr-4 pl-8">
                  <Calendar
                    compact={false}
                    value={'00/00/0000'}
                    name="dueDate"
                    label="Due Date"
                    placeholder=""
                  />
                </div>
                <div className="w-1/3 px-4"></div>
                <div className="w-1/3 pl-4"></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-border py-5 px-8 mt-3 w-full">
            <Accordion
              className="mb-6 mt-5"
              label="Can you tell me about yourself? (Currently employed? How many years in this industry?)"
              open="true"
            >
              <Textarea
                cols="20"
                rows="10"
                label=""
              // value={}
              // onChange={(e) => handleChange('notes', e.target.value)}
              />
            </Accordion>
            <Accordion className="mb-6 mt-5" label="What are your hobbies?">
              <Textarea
                cols="20"
                rows="10"
                label=""
              // value={}
              // onChange={(e) => handleChange('notes', e.target.value)}
              />
            </Accordion>
          </div>


          <div className="bg-white border border-gray-border py-5 px-8 mt-3 flex justify-end">
            <Button
              variant="fill"
              className="justify-center"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="h-8 bg-blue">
      </div>
    </div>
  );
};

export default ApplicantPrefinalPage;
