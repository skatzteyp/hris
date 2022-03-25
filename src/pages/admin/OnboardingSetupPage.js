import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dashboard, Well, Pagination, Loader } from '@ligph/ui';

import OnboardingTable from '../../components/admin/OnboardingTable';
import OnboardingFilter from '../../components/admin/OnboardingFilter';

import useDebounce from '../../hooks/useDebounce';
import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { routes, route } from '../../utils/routes';
import { getApplicants } from '../../redux/modules/applicant/applicantActions';


const OnboardingSetupPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modules, setModule] = useModules();
  const { applicant: { applicants, applicant, pagination, processing } } = useSelector(state => state);
  const [sort, setSort] = useState('-appliedAt');
  const [page, setPage] = useState(1);
  const [search] = useState('');
  const [filters] = useState({
    jobTitles: [],
    sources: [],
    statuses: [],
    appliedAt: { start: '', end: ''}
  });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(getApplicants({ page, sort, filters, search: debouncedSearch }));
  }, [dispatch, sort, page, filters, debouncedSearch]);

  useEffect(() => {
    setPage(1)
  }, [filters, debouncedSearch]);

  const handleSelect = (item) => {
    history.push(route(routes.recruitment.applicantDetail, item));
  }

  // for adding new applicant
  useEffect(() => {
    if (applicant.new) {
      history.push(route(routes.recruitment.applicantDetail, applicant))
    }
  }, [ applicant, history ]);

  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'lmsadmin', 'onboarding')}
      modules={modules}
      onModuleChange={setModule}
      module="Admin"
      darkmode
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-medium">Onboarding Setup</h2>
        </div>

        <Well className="mt-8 p-8 border-none bg-darkmode-900">
          <OnboardingFilter
            className="flex justice-between"
          />
        </Well>
        <div className="relative min-h-sm">
          {processing
            ? <Loader darkmode/>
            : (<div className="mt-6 test">
                <OnboardingTable
                  sort={sort}
                  items={applicants}
                  onSelect={handleSelect}
                  onSort={setSort}
                />
                <div className="flex justify-between mt-8 items-center pb-8">
                  <p className="text-xs text-white font-light italic">Showing {(page - 1) * pagination.perPage + 1} to {pagination.currentPage === pagination.lastPage ? pagination.total : page * pagination.perPage} of {pagination.total} results</p>
                  <Pagination
                    current={page}
                    onChange={setPage}
                    total={pagination.total}
                    perPage={pagination.perPage}
                    size={2}
                    darkmode
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </Dashboard>
  )
}

export default OnboardingSetupPage;
