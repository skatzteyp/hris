import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';

import { Dashboard, Well, Button, Pagination, Loader } from '@ligph/ui';

import TrainingTopicsTable from '../../components/admin/TrainingTopicsTable';
import TrainingTopicsFilter from '../../components/admin/TrainingTopicsFilter';

import useModules from '../../hooks/useModules';
import useDebounce from '../../hooks/useDebounce';
import { dashboard } from '../../utils/dashboard';
import { routes, route } from '../../utils/routes';
// import { CONSTANTS } from '../../utils/constants';
import { getTrainings, updateTraining, getListOfTrainingCategories } from '../../redux/modules/training/trainingActions';

import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';
import useTraining from '../../hooks/useTraining';

const TrainingTopicsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { resetTrainingList } = useTraining();

  const [modules, setModule] = useModules();
  const [sort, setSort] = useState('-appliedAt');
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState();
  const [search, setSearch] = useState();
  // const [search] = useState('');
  const { training: {trainings, training, categories, pagination, processing} } = useSelector(store => store);
  const debouncedSeearch = useDebounce(search, 1000);
  
  const handleSelect = (item) => {
    history.push(route(routes.admin.trainingDetail, item));
  }

  const handleAddSelect = (item) => {
    dispatch(updateTraining({title: 'New Training Topic'}));
  }

  const handleCategoryFilter = id => {
    if (id) {
      setCategoryFilter(id);
    } else {
      setCategoryFilter(undefined);
    }
  }

  const handleSearch = val => {
    setSearch(val)
  }

  useEffect(resetTrainingList, [ dispatch ]);

  useEffect(() => {
    dispatch(getTrainings({
      page: categoryFilter !== undefined ? null : page,
      first: 5,
      categoryId: categoryFilter,
      training_title: debouncedSeearch
    }));
    dispatch(getListOfTrainingCategories());

  }, [dispatch, page, pagination, categoryFilter, debouncedSeearch]);


  // for adding new training topic
  useEffect(() => {
    if (training.new) {
      history.push(route(routes.admin.trainingDetail, training))
    }
  }, [ training, history ]);
  


  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'lmsadmin', 'trainings')}
      modules={modules}
      onModuleChange={setModule}
      module="Admin"
      darkmode
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-medium">Training Topics</h2>
          <Button
            color="white"
            className="items-center"
            onClick={
              () => handleAddSelect()
            }
          >
            <IconAdd className="fill-current mr-4" />
            Add Training Topic 
          </Button>
        </div>

        <Well className="mt-8 p-8 border-none bg-darkmode-900">
          <TrainingTopicsFilter
            className="flex justice-between"
            categories={categories}
            handleCategoryFilter={handleCategoryFilter}
            handleSearch={handleSearch}
          />
        </Well>
        <div className="relative min-h-sm">
          {processing
            ? <Loader darkmode/>
            : (<div className="mt-6 test">
                <TrainingTopicsTable
                  sort={sort}
                  items={trainings}
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

export default TrainingTopicsPage;
