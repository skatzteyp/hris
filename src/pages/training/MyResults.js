import React, { useState } from 'react';
import moment from 'moment';

import { Dashboard, Text, Well, Table, Button } from '@ligph/ui';
import { dashboard } from '../../utils/dashboard';

import useModules from '../../hooks/useModules';
import useEmployee from '../../hooks/useEmployee';

import { ReactComponent as IconSearch } from '../../assets/images/icon-search.svg';
import { ReactComponent as IconCategory } from '../../assets/images/icon-category.svg';

import TrainingStatus from '../../components/training/TrainingStatus';

const MyResults = () => {
  const [modules, setModule] = useModules();
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  const { employee: { employeeTrainings } } = useEmployee();

  const tableItems = employeeTrainings && employeeTrainings.length > 0 ?
    employeeTrainings.map(({ id, training, trainingHistories }) => (
      trainingHistories && trainingHistories.length > 0 ?
        trainingHistories.map(data => ({
          id: parseInt(data.id),
          topicTitle: training.title,
          dateTaken: moment(data.dateTaken).format('YYYY-MM-DD'),
          dateFinish: data.dateFinish ? moment(data.dateFinish).format('YYYY-MM-DD') : '',
          dueDate: data.dueDate ? moment(data.dueDate).format('YYYY-MM-DD') : '',
          score: `${data.score}/${data.totalScore}`,
          rating: <TrainingStatus status={{ id:parseInt(id), name: data.score === data.totalScore ? 'PASSED' : 'FAILED' }} />
        })) : {}
    )).reduce((acc, curr) => [...acc, ...curr]) : [];

  // const rating = {
  //   id: 37,
  //   name: 'FAILED'
  // }

  const headers = [
    { value: 'topicTitle', label: 'Topic Title' },
    { value: 'dateTaken', label: 'Date Taken' },
    { value: 'dateFinish', label: 'Date Finish' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'score', label: 'Score' },
    { value: 'rating', label: 'Rating' }
  ]

  // const tableItems = [
  // {
  //   id: 1,
  //   topicTitle: 'Introduction to Flutter Developement Using Dart',
  //   dateTaken: '00/00/0000',
  //   dateFinish: '00/00/0000',
  //   dueDate: '00/00/0000',
  //   score: '12/20',
  //   rating: <TrainingStatus status={rating}/>
  // },
  // {
  //   id: 2,
  //   topicTitle: 'Introduction to Flutter Developement Using Dart',
  //   dateTaken: '00/00/0000',
  //   dateFinish: '00/00/0000',
  //   dueDate: '00/00/0000',
  //   score: '12/20',
  //   rating: <TrainingStatus status={rating}/>
  // }
  // ];

  // console.log(tableItems);
  

  const handleCategoryFilter = () => {
    setShow(!show)
  }

  return (
    <Dashboard
      color="purple"
      menuItems={dashboard.getMenu('training', 'results')}
      module="Training"
      modules={modules}
      onModuleChange={setModule}
    >
      <div className="px-12 py-4">
        <h2 className="text-3xl text-white font-medium">My Results</h2>
        <Well className="mt-8 p-8">
          <div className="flex justify-between items-center	">
            <div className="w-3/5 flex justify-between items-center">
              <div className="w-full mr-5">
                <Text placeholder="Search Topic Result"
                  icon={<IconSearch className=" fill-current" />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <Button
                  onClick={handleCategoryFilter}
                  variant={show ? 'fill' : 'outline'}
                  color="purple"
                >
                  <IconCategory className="fill-current mr-2" />
                  Category List
                </Button>
              </div>
            </div>
            <ul className="w-2/5 flex list-none justify-end">
              <li className="text-center font-light text-xs uppercase px-4">
                General Average <br/>
                <strong className="font-bold text-xl text-black">89%</strong>
              </li>
              <li className="text-center font-light text-xs uppercase px-4">
                Failed Exams <br/>
                <strong className="font-bold text-xl text-red">02</strong>
              </li>
              <li className="text-center font-light text-xs uppercase px-4">
                Passed Exams <br/>
                <strong className="font-bold text-xl text-green">10</strong>
              </li>
            </ul>
          </div>
          <div className={`${show ? 'flex' : 'hidden'} flex-wrap`}>
            <div className="mr-4 mt-4">
              <Button
                onClick={() => {}}
                variant="fill"
                color="purple"
                colorWeight="100"
                textColor="purple"
              >
                Front-End (FE)
              </Button>
            </div>
            <div className="mr-4 mt-4"> 
              <Button
                onClick={() => {}}
                variant="fill"
                color="purple"
                colorWeight="100"
                textColor="purple"
              >
                Back-End (BE)
              </Button>
            </div>
            <div className="mr-4 mt-4"> 
              <Button
                onClick={() => {}}
                variant="fill"
                color="purple"
                colorWeight="100"
                textColor="purple"
              >
                Design (DE)
              </Button>
            </div>
            <div className="mr-4 mt-4"> 
              <Button
                onClick={() => {}}
                variant="fill"
                color="purple"
                colorWeight="100"
                textColor="purple"
              >
                Quality Assurance (QA)
              </Button>
            </div>
            <div className="mr-4 mt-4"> 
              <Button
                onClick={() => {}}
                variant="fill"
                color="purple"
                colorWeight="100"
                textColor="purple"
              >
                Accounting (AC)
              </Button>
            </div>
            <div className="mr-4 mt-4"> 
              <Button
                onClick={() => {}}
                variant="fill"
                color="purple"
                colorWeight="100"
                textColor="purple"
              >
                Administration (AD)
              </Button>
            </div>
            <div className="mr-4 mt-4"> 
              <Button
                onClick={() => {}}
                variant="fill"
                color="purple"
                colorWeight="100"
                textColor="purple"
              >
                Management (MG)
              </Button>
            </div>
          </div>
        </Well>
        <div className="py-6 px-4">
          {tableItems && tableItems.length > 0 ? ( <Table
            headers={headers}
            items={tableItems}
            sort={'-dateTaken'}
            color="purple"
          />) : null}
        </div>
      </div>
    </Dashboard>
  )
}

export default MyResults;
