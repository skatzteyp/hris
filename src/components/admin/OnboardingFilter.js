import React from 'react';
import { Dropdown, Well } from '@ligph/ui';

const OnboardingFilter = () => {

  return (
    <div>
      <Well className={`items-center relative z-10 border-none bg-darkmode-900`}>
        <div className="flex">
          <Dropdown
            darkmode
            label="Position"
            items={[
              'All',
              'Front End Engineer',
              'Design Engineer',
              'Back End Engineer',
              'Quality Assurance'                
            ]}
            multiselect={true}
            value="All"
            className="mr-3 w-1/4"
          />
          <Dropdown
            darkmode
            label="Level"
            items={[
              'All',
              'Junior',
              'Middle',    
              'Senior'            
            ]}
            multiselect={true}
            value="All"
            className="mr-3 w-1/4"
          />
        </div>
      </Well>
    </div>
  );
};

export default OnboardingFilter;
