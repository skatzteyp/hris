import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dashboard, Well, ColumnGraph, PieGraph, BarGraph, Button } from '@ligph/ui';

import ReportsFilter from '../../components/recruitment/ReportsFilter';

// import useDebounce from '../../hooks/useDebounce';
import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { getConstants } from '../../redux/modules/constants/constantsActions';

import { ReactComponent as IconDownload } from '../../assets/images/icon-download.svg';
import { ReactComponent as IconPrint } from '../../assets/images/icon-print.svg';

const columnData = [
  ['Month', 'HIRED', 'IN-PROGRESS', 'REJECT'],
  ['JAN', 25, 50, 30,],
  ['FEB', 11, 46, 25,],
  ['MAR', 66, 20, 30,],
  ['APR', 10, 54, 35,],
  ['MAY', 54, 77, 35,],
  ['JUN', 27, 29, 37,],
  ['JUL', 10, 18, 60,],
  ['AUG', 5, 12, 35,],
  ['SEP', 16, 32, 58,],
  ['OCT', 17, 21, 35,],
  ['NOV', 24, 3, 55,],
  ['DEC', 12, 43, 88,],
];

const barData = [
  ['Year', 'HIRED', 'IN-PROGRESS', 'REJECT'],
  ['Mynimo', 1000, 400, 200,],
  ['Jobs DB', 1170, 460, 250,],
  ['Facebook', 660, 1120, 300,],
  ['Linkedin', 1030, 540, 350,]
];

const pieData = [
  ['STATUS', 'APPLICANTS'],
  ['HIRED', 1000,],
  ['IN-PROGRESS', 250,],
  ['REJECT', 660]
];


const ReportsPage = () => {
  const dispatch = useDispatch();
  const [modules, setModule] = useModules();
  const { constants } = useSelector(state => state);

  const [filters, setFilters] = useState({
    jobTitles: [],
    sources: [],
    startDate: { start: '', end: '' },
    endDate: { start: '', end: '' }
  });

  useEffect(() => {
    dispatch(getConstants());
  }, [dispatch]);


  return (
    <Dashboard
      menuItems={dashboard.getMenu('recruitment', 'reports')}
      modules={modules}
      onModuleChange={setModule}
      module="Recruitment"
    >
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-medium">Reports</h2>
        </div>

        <Well className="mt-8 p-8">
          <ReportsFilter
            filters={filters}
            onFilterChange={setFilters}
            constants={constants}
          />
        </Well>
        <Well className="mt-8 p-8">
          <ColumnGraph
            data={columnData}
            title="TOTAL NUMBER OF APPLICANTS"
          />
        </Well>
        <div className="flex mt-8">
          <div className="w-1/2 mr-5">
            <Well className="p-8">
              <PieGraph
                data={pieData}
                height="500"
                sliceLabel
              />
            </Well>
          </div>
          <div className="w-1/2 flex flex-col">
            <Well className="p-2">
              <PieGraph
                data={pieData}
                height="255"
                title="IN PROCESS"
              />
            </Well>
            <Well className="p-2 mt-5">
              <PieGraph
                data={pieData}
                height="255"
                title="FALLOUTS"
              />
            </Well>
          </div>
        </div>
        <Well className="mt-8 p-8">
          <BarGraph
            data={barData}
            title="APPLICANTS PER SOURCE"
          />
        </Well>
        <Well className="mt-8 p-8">
          <BarGraph
            data={barData}
            title="APPLICANTS PER POSITION PER SOURCE"
          />
        </Well>
        <Well className="mt-8 p-8">
          <BarGraph
            data={barData}
            title="APPLICANTS PER POSITION"
          />
        </Well>
        <Well className="mt-8 p-5 flex justify-end">
          <Button
            variant="outline"
            className="ml-2"
          >
            <IconPrint className="fill-current mr-2" />
            Print</Button>
          <Button
            variant="outline"
            className="ml-2"
          >
            <IconDownload className="fill-current mr-2" />
            Download Data</Button>
        </Well>
      </div>
    </Dashboard>
  )
}

export default ReportsPage;
