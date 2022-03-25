import React from 'react';

import { CONSTANTS } from '../../utils/constants';

const colors = {
  [CONSTANTS.STATUS.NEW]: '#00c7a2',
  [CONSTANTS.STATUS.INITIAL]: '#8d614d',
  [CONSTANTS.STATUS.EXAM]: '#4bacb4',
  [CONSTANTS.STATUS.PREFINAL]: '#4b57b4',
  [CONSTANTS.STATUS.FINAL]: '#844bb4',
  [CONSTANTS.STATUS.BACKGROUND]: '#e2d53e',
  [CONSTANTS.STATUS.ONBOARDING]: '#3fb223',
  [CONSTANTS.STATUS.STARTED]: '#0080a7'
};

const OnboardingStatus = ({ status }) => {
  return (
    <span
      className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1"
      style={{ color: colors[status.id], borderColor: colors[status.id] }}
    >
      {status.name}
    </span>
  );
}

export default OnboardingStatus;
