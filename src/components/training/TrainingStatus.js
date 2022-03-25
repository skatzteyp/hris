import React from 'react';

import { CONSTANTS } from '../../utils/constants';

const colors = {
  [CONSTANTS.STATUS.PASSED]: '#00c7a2',
  [CONSTANTS.STATUS.FAILED]: '#FF215B'
};



const TrainingStatus = ({ status }) => {
  return (
    <span
      className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1"
      style={{ color: colors[status.id], borderColor: colors[status.id] }}
    >
      {status.name}
    </span>
  );
}

export default TrainingStatus;
