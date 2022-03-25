import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dashboard, Well, Button, Pagination, Loader } from '@ligph/ui';

import TrainingCurriculumTable from '../../components/admin/trainingCurriculum/TrainingCurriculumTable';
import TrainingCurriculumFilter from '../../components/admin/trainingCurriculum/TrainingCurriculumFilter';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { routes, route } from '../../utils/routes';

import useTrainingCurriculum from '../../hooks/useTrainingCurriculum';

import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';

import { useDispatch } from 'react-redux';

const TrainingCurriculumPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();
  const dispatch = useDispatch();

  const { trainingCurriculums, resetTrainingCurriculum, getTrainingCurriculums, pagination, processing } = useTrainingCurriculum();
  const [sort, setSort] = useState('-appliedAt');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    jobTitles: [],
    levels: [],
    name: "",
  });

  useEffect(resetTrainingCurriculum,[ dispatch ]);

  const handleFilterSearch = () => {
    let searchData = { name: filters.name, page, isAdmin: true, first: 10 }
    let levelIds = (filters.levels).map(a => parseInt(a.key));
    let jobTitleIds = (filters.jobTitles).map(a => parseInt(a.key));

    if(levelIds.length !== 0){searchData = {...searchData, levelId: levelIds}};
    if(jobTitleIds.length !== 0){ searchData = {...searchData, jobTitleId: jobTitleIds}};

    getTrainingCurriculums(searchData);
  }

  //get Training Curriculums
  useEffect(handleFilterSearch, [page])

  const handleTrainingCurriculumAdd = () => {
    history.push(route(routes.admin.curriculumNew))
  }

  const handleSelect = (item) => {
    history.push(route(routes.admin.curriculumDetail, item));
  }

  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'lmsadmin', 'curriculums')}
      modules={modules}
      onModuleChange={setModule}
      module="Admin"
      darkmode
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-medium">Training Curriculum</h2>
          <Button
            color="white"
            className="items-center"
            onClick={() => handleTrainingCurriculumAdd()}
          >
            <IconAdd className="fill-current mr-4" />
            Add Curriculum
          </Button>
        </div>

        <Well className="mt-8 p-8 border-none bg-darkmode-900">
          <TrainingCurriculumFilter
            filters={filters}
            onFilterChange={setFilters}
            handleFilterSearch={handleFilterSearch}
          />
        </Well>
        <div className="relative min-h-sm">
          {processing
            ? <Loader darkmode/>
            : (<div className="mt-6 test">
                <TrainingCurriculumTable
                  sort={sort}
                  items={trainingCurriculums}
                  onSelect={handleSelect}
                  onSort={setSort}
                />
                <div className="flex justify-between mt-8 items-center pb-8">
                  <p className="text-xs text-white font-light italic">Showing {(page - 1) * pagination.perPage + 1} to {page * pagination.perPage} of {pagination.total} results</p>
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

export default TrainingCurriculumPage;
