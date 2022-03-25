import React, { useState } from 'react';
import { Text, Button } from '@ligph/ui';

import { ReactComponent as IconSearch } from '../../assets/images/icon-search.svg';

const ApplicationFilter = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  constants
}) => {
  const [show, setShow] = useState(false);

  const handleAdvanceFilter = () => {
    setShow(!show)
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-auto mr-8">
          <Text placeholder="Search Application"
            icon={<IconSearch className=" fill-current" />}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            darkmode
          />
        </div>
        <Button
          onClick={handleAdvanceFilter}
          variant={show ? 'fill' : 'outline'}
          color="orange"
        >
          Assignee
        </Button>
      </div>
      <div className={`items-center mt-5 relative z-10 ${show ? 'block' : 'hidden'}`}>
        <div className="flex flex-wrap">
          <div className="mr-4 mb-4">
            <Button
              onClick={() => {}}
              color="gray"
              variant="fill"
            >
              Front-End (FE)
            </Button>
          </div>
          <div className="mr-4 mb-4">
            <Button
              onClick={() => {}}
              color="gray"
              variant="fill"
            >
              Back-End (BE)
            </Button>
          </div>
          <div className="mr-4 mb-4">
            <Button
              onClick={() => {}}
              color="gray"
              variant="fill"
            >
              Design (DE)
            </Button>
          </div>
          <div className="mr-4 mb-4">
            <Button
              onClick={() => {}}
              color="gray"
              variant="fill"
            >
              Quality Assurance (QA)
            </Button>
          </div>
          <div className="mr-4 mb-4">
            <Button
              onClick={() => {}}
              color="gray"
              variant="fill"
            >
              Accounting (AC)
            </Button>
          </div>
          <div className="mr-4 mb-4">
            <Button
              onClick={() => {}}
              color="gray"
              variant="fill"
            >
              Administration (AD)
            </Button>
          </div>
          <div className="mr-4 mb-4">
            <Button
              onClick={() => {}}
              color="gray"
              variant="fill"
            >
              Management (MG)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFilter;
