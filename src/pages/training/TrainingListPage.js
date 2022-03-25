import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard, Well, Button, Progress, Link, Loader } from '@ligph/ui';
import { useSelector, useDispatch } from 'react-redux';

import useModules from '../../hooks/useModules';
// import useConstants from '../../hooks/useConstants';
import useDebounce from '../../hooks/useDebounce';

import { dashboard } from '../../utils/dashboard';
import TrainingFilter from '../../components/training/TrainingFilter';

import { getTrainings, getListOfTrainingCategories } from '../../redux/modules/training/trainingActions';
import {
  getEmployeeTrainings,
} from '../../redux/modules/employee/employeeActions';


import topicDummy from '../../assets/images/topic-dummy.jpg';
import LoadingMessage from '../../components/common/LoadingMessage';
// import useEmployee from '../../hooks/useEmployee';

import useTrainingCurriculum from '../../hooks/useTrainingCurriculum';

const TainingListPage = () => {
  const dispatch = useDispatch();

  const [modules, setModule] = useModules();
  // const constants = useConstants();

  const { training: { trainings, categories, pagination, processing }, employee: { employee: {
    employeeTrainings } } } = useSelector(store => store);

  const [employeeTrainingInfos, setEmployeeTrainingInfos] = useState();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState();
  const [trainingList, setTrainingList] = useState([]);
  const [myTrainingTopics, setMyTrainingTopics] = useState([]);
  const debouncedSearch = useDebounce(search, 1000);

  const [perPageTopics, setPerPageTopics] = useState(8);
  const [myPerPageTopics, setMyPerPageTopics] = useState(4);

  const employeeId = JSON.parse(localStorage.getItem('token')).user.employeeDetail.id;

  // get training curriculum
  const {
    trainingCurriculums,
    getTrainingCurriculums,
  } = useTrainingCurriculum();

  const [processTrainingList, setProcessTrainingList] = useState(false);
  const [processMyTrainingList, setProcessMyTrainingList] = useState(false);
  const [ trainingCurriculum, setTrainingCurriculum] = useState({});

  const fetchTrainingCurriculum = useCallback(() => {
    let searchData = { isAdmin: false, levelId: 24, jobTitleId: 2,  first: 9999 }
    dispatch(getListOfTrainingCategories(), getTrainingCurriculums(searchData));
  }, [dispatch, getTrainingCurriculums ]);

  useEffect(fetchTrainingCurriculum, [dispatch]);

  // get all training curriculum
  useEffect(() => {
    const getTrainingTopics = trainingCurriculums.map((f) => f.trainingTopics);
    setTrainingCurriculum({ trainingTopics: getTrainingTopics.flat(1) });
  }, [ trainingCurriculums ]);

  useEffect(() => {
    setEmployeeTrainingInfos(employeeTrainings);
  }, [employeeTrainingInfos, employeeTrainings]);

  useEffect(() => {
    if(trainingCurriculum && trainingCurriculum.trainingTopics ){
      setMyTrainingTopics(trainingCurriculum.trainingTopics);
    }
  }, [trainingCurriculum]);
  //end of training curriculum processs

  useEffect(() => {
    dispatch(getTrainings({
      page: 1,
      first: 9999,
      categoryId: categoryFilter,
      training_title: debouncedSearch}));
    dispatch(getEmployeeTrainings({employeeId}));
  }, [dispatch, pagination, categoryFilter, debouncedSearch, employeeId]);

  const handleCategoryFilter = id => {
    setPerPageTopics( prevState => 8);
    if (id) {
      setCategoryFilter(id);
    } else {
      setCategoryFilter(undefined);
    }
  }

  const handleSearch = val => {
    setSearch(val)
  }

  useEffect(() => {
    let filterTrainings;
    if (trainings && myTrainingTopics) {
      filterTrainings = trainings.filter((r) => !myTrainingTopics.find(
        ({ pivot:{ trainingId } }) => parseInt( r.id ) === parseInt( trainingId ) )
      );
    }
    let processTrainingList = search !== '' ? trainings : filterTrainings;

    setTrainingList(processTrainingList.slice(0, perPageTopics));

  }, [trainings, myTrainingTopics, search, perPageTopics]);

  const handleLoadMoreTrainingTopic = () => {
    setProcessMyTrainingList(prevState => true);
    setTimeout(() => {
      setPerPageTopics( prevState => prevState + 8);
      setProcessMyTrainingList(prevState => !prevState);
    }, 900);
  }

  const handleLoadMoreMyTrainingTopic = () => {
    setProcessTrainingList(prevState => true);
    setTimeout(() => {
      setMyPerPageTopics( prevState => prevState + 4);
      setProcessTrainingList(prevState => !prevState);
    }, 900);
  }

  const isAvailableTrainingTopics = ( index ) => {
    let addClass = "";
    if (index !== 0){
      addClass = "hover:opacity-75 pointer-events-none opacity-50";
    }

    return addClass;
  }

  const getTrainingCategoriesName = (trainingId) => {
    let getCategories = [];
    trainings.forEach(function(topic) {
      if(parseInt(trainingId) === parseInt(topic.id)){
        getCategories  = topic.categories;
        return true;
      }
    })
    return getCategories ;
  };

  return (
    <Dashboard
      color="purple"
      menuItems={dashboard.getMenu('training', 'training-topics')}
      module="Training"
      modules={modules}
      onModuleChange={setModule}
    >
      <div className="px-12 py-4">
        <h2 className="text-3xl text-white font-medium">Training Topics</h2>
        <Well className="mt-8 p-8">
          <TrainingFilter
            categories={categories}
            handleCategoryFilter={handleCategoryFilter}
            handleSearch={handleSearch}
            search={search}
            onSearchChange={setSearch}
          />
        </Well>
       <div className="mt-8" style={ categoryFilter ||  search !== '' ? {display: 'none'} : null}>
          <h3 className="text-base font-semibold text-black mb-4">Your training topics</h3>
          <ul className="grid grid-cols-4 gap-4 list-none">
            {myTrainingTopics && myTrainingTopics.slice(0, myPerPageTopics).map((item, trainingIndx) => (
              <>
                <li className={`bg-white rounded border border-black-100 p-4 ${isAvailableTrainingTopics(trainingIndx)}`}>
                  <Link to={`/training/trainings/${item?.pivot.trainingId}`} className="block">
                    <div className="mb-4">
                      <img src={topicDummy} alt=""/>
                    </div>

                    <div className="flex mb-4">
                       {
                         getTrainingCategoriesName(item.pivot.trainingId).map(({ id, name }, catIndx) => (
                           <span key={`cat-${catIndx}-${id}`}
                             className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">
                               { name }
                           </span>
                         ))
                       }
                     </div>

                    <h3 className="text-base font-bold text-black mb-4">
                      {item?.title}
                    </h3>
                    <div className="mb-4">
                      <Progress min="10" max="100" value={80} color="purple" />
                    </div>
                    <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
                  </Link>
                </li>
              </>
            ))}
          </ul>
          <div className="flex justify-center mt-8">

            <Button
              variant="outline"
              color="purple"
              onClick={handleLoadMoreMyTrainingTopic}
              disabled={ myPerPageTopics >= myTrainingTopics.length }
            >
              Load more topics
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-base font-semibold text-black mb-4">Browse more topics</h3>
          <ul className="grid grid-cols-4 gap-4 list-none">
            {processing ? <Loader /> : (trainingList).map(({ id, title , categories }) => (
              <li className="bg-white rounded border border-black-100 p-4" key={`title-${id}`}>
                <Link to={`/training/trainings/${id}`} className="block">
                  <div className="mb-4">
                    <img src={topicDummy} alt="" />
                  </div>

                    { categories.length > 0 ? (
                      <>
                        <div className="flex mb-4">
                            {categories.map(({ id, name }, catIndx) => (
                              <span key={`cat-${catIndx}-${id}`} className="inline-block rounded-full py-1 px-4 bg-purple-100 text-purple text-xs ml-2 font-normal">
                                  { name }
                              </span>
                            ))}
                         </div>
                      </>
                    ) : null }

                  <h3 className="text-base font-bold text-black mb-4">
                    {title} <br />
                  </h3>
                  <div className="mb-4">
                    <Progress min="10" max="100" value="50" color="purple" />
                  </div>
                  <p className="text-xxs text-yellow-300 font-normal">Due Until 00/00/00</p>
                </Link>
              </li>))}
          </ul>

          {(() => {
            if(processTrainingList || processMyTrainingList){
              return(
                <LoadingMessage text="Loading"/>
              );
            }
          })()}

          <div className="flex justify-center mt-8">
            <Button variant="outline" color="purple"
               disabled={perPageTopics >= (trainings.length - myTrainingTopics.length)}
               onClick={handleLoadMoreTrainingTopic}>
               Load more topics
            </Button>
          </div>

        </div>
      </div>
    </Dashboard>
  );
}

export default TainingListPage;
