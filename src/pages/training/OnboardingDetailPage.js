import React from 'react';
import { Dashboard } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

const OnboardingDetailPage = () => {
  const [modules, setModule] = useModules();

  return (
    <Dashboard
      color="purple"
      menuItems={dashboard.getMenu('training', 'onboarding')}
      module="Training"
      modules={modules}
      onModuleChange={setModule}
    >
      Onboarding Detail page
    </Dashboard>
  );
}

export default OnboardingDetailPage;
