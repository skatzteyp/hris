import React from 'react';
import { Text, Dropdown, Well } from '@ligph/ui';

import useConstants from '../../../hooks/useConstants';

const TrainingCurriculumForm = ({ curriculumDetails, onChangeCurriculumDetails, actionType="new" }) => {

  const constants = useConstants();
  const { level, jobTitle } = curriculumDetails;

  const handleChange = (key, value) => {
    onChangeCurriculumDetails({
      ...curriculumDetails,
      [key]: value,
      dirty: true
    });
  }

  return (
    <>
     <Well className="mt-5 p-5 border-none bg-darkmode-900">

        <div className="flex-auto mr-12">
          <label className="text-xs text-white font-semibold mb-2 inline-block">Curriculum Title</label>
          <Text placeholder="Title"
            darkmode
            value= { curriculumDetails.name }
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

       <div className={`items-center relative z-10`}>
         <div className="flex">

             {(() => {
               if( actionType === "update" ){
                 return(
                   <ul className="flex">
                     <li className="flex-initial px-1 py-4 mr-12">
                       <span className="font-medium text-white text-xs">Position Applied</span>
                       <p className="font-light text-white text-sm">{  jobTitle ? jobTitle.name : '--' }</p>
                     </li>
                     <li className="flex-initial px-1 py-4 mr-12">
                       <span className="font-medium text-white text-xs">Level</span>
                       <p className="font-light text-white text-sm">{ level ? level.name : '--' }</p>
                     </li>
                   </ul>
                 );
               }else{
                 return(
                   <>
                     <Dropdown
                       label="Position"
                       darkmode
                       placeholder="Select Position"
                       items={constants.jobTitles}
                       value={curriculumDetails.jobTitleId ? (curriculumDetails.jobTitleId).toString() : ''}
                       overflow={true}
                       className="mr-3 w-1/3"
                       onChange={(id) => handleChange('jobTitleId', parseInt(id))}
                       id="position"
                     />

                     <Dropdown
                       label="Level"
                       darkmode
                       placeholder="Select level"
                       items={constants.levels}
                       value={curriculumDetails.levelId ? (curriculumDetails.levelId).toString() : ''}
                       overflow={true}
                       className="mr-3 w-1/4"
                       onChange={(id) => handleChange('levelId', parseInt(id))}
                       id="level"
                     />
                   </>
                 );
               }
             })()}
           </div>
         </div>
      </Well>
    </>
  );
}

export default TrainingCurriculumForm;
