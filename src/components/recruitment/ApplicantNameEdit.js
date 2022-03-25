import React, { useState } from 'react';
import {
  Text,
  Button
} from '@ligph/ui';

import useApplicant from '../../hooks/useApplicant';

const ApplicantNameEdit = ({ onSave, onCancel }) => {
  const { applicant, updateApplicant } = useApplicant();
  const [firstName, setFirstName] = useState(applicant.firstName);
  const [lastName, setLastName] = useState(applicant.lastName);

  const handleSave = () => {
    updateApplicant({
      info: {
        firstName,
        lastName
      }
    });

    onSave();
  }

  const emptyFirstName = firstName ? '' : 'First Name is required';
  const emptyLastName = lastName ? '' : 'Last Name is required';

  return (
    <div  className="absolute top-0 left-0 transform translate-y-8 -translate-x-48 ml-2 w-sm z-20">
      <div className="w-4 h-4 border-t border-l border-blue-100 absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-2 rotate-45 z-20 bg-white"></div>
      <div className="border border-blue-100 py-4 px-5 pb-6 rounded bg-white z-10 relative">
        <Text
          type="text"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={emptyFirstName}
        />
        <Text
          type="text"
          label="Last Name"
          className="mt-4"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={emptyLastName}
        />
        <div className="mt-4 flex justify-end">
          <Button
            color="red"
            variant="outline"
            className="mr-2"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="fill"
            onClick={handleSave}
            disabled={lastName && firstName ? false : true}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ApplicantNameEdit;
