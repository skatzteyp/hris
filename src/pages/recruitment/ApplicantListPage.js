import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dashboard, Well, Button, Pagination, Loader } from '@ligph/ui';

import ApplicantsTable from '../../components/recruitment/ApplicantsTable';
import ApplicantsFilter from '../../components/recruitment/ApplicantsFilter';

import useDebounce from '../../hooks/useDebounce';
import useModules from '../../hooks/useModules';
import useConstants from '../../hooks/useConstants';
import { dashboard } from '../../utils/dashboard';
import { routes, route } from '../../utils/routes';
import { CONSTANTS } from '../../utils/constants';
import { getApplicants, updateApplicant } from '../../redux/modules/applicant/applicantActions';

import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';

const ApplicantListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modules, setModule] = useModules();
  const { applicant: { applicants, applicant, pagination, processing } } = useSelector(state => state);
  const constants = useConstants();
  const [sort, setSort] = useState('-appliedAt');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
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

  const handleApplicantAdd = () => {
    dispatch(updateApplicant({
      info: {
        firstName: 'New Applicant',
        appliedAt: moment().format('YYYY-MM-DD'),
      },
      status: {
        connect: CONSTANTS.STATUS.NEW
      }
    }));
  }

  console.log(pagination)

  return (
    <Dashboard
      menuItems={dashboard.getMenu('recruitment', 'applicants')}
      modules={modules}
      onModuleChange={setModule}
      module="Recruitment"
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-medium">Applicant List</h2>
          <Button
            color="white"
            className="items-center"
            onClick={() => handleApplicantAdd()}
          >
            <IconAdd className="fill-current mr-4" />
            Add New Applicant
          </Button>
        </div>

        <Well className="mt-8 p-8">
          <ApplicantsFilter
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilters}
            constants={constants}
          />
        </Well>
        <div className="relative min-h-sm">
          {processing
            ? <Loader/>
            : (<div className="mt-6 test">
                <ApplicantsTable
                  sort={sort}
                  items={applicants}
                  onSelect={handleSelect}
                  onSort={setSort}
                />
                <div className={`flex justify-between mt-8 items-center pb-8 ${pagination.total === 0 ? 'pointer-events-none opacity-50' : 'pointer-events-auto'}`}>
                  {/* <p className="text-xs font-light italic">Showing {(page - 1) * pagination.perPage + 1} to {pagination.total > 10 ? page * pagination.perPage : pagination.total} of {pagination.total} results</p> */}
                  <p className="text-xs font-light italic">Showing {(page - 1) * pagination.perPage + 1} to {pagination.currentPage === pagination.lastPage ? pagination.total : page * pagination.perPage} of {pagination.total} results</p>
                  <Pagination
                    current={page}
                    onChange={setPage}
                    total={pagination.total}
                    perPage={pagination.perPage}
                    size={2}
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

export default ApplicantListPage;
