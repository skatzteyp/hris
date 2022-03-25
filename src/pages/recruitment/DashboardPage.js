import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
  Dashboard,
  Well,
  Button,
  ColumnGraph,
  Loader
} from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';
import { route, routes } from '../../utils/routes';
import { CONSTANTS } from '../../utils/constants';
import { updateApplicant, getNewApplicants } from '../../redux/modules/applicant/applicantActions';
import { getApplicantReport } from '../../redux/modules/applicantReport/applicantReportActions';

import { ReactComponent as IconAdd } from '../../assets/images/icon-plus-fill.svg';

const DashboardPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { applicants, processing, applicant, pagination } = useSelector(state => state.applicant);
  // const state = useSelector(state => state);
  const { reports } = useSelector(state => state.applicantReport);
  const [modules, setModule] = useModules();
  const userName = JSON.parse(localStorage.getItem('token')).user?.name || '';

  const [totalHired, setTotalHired] = useState(0);
  const [totalInProcess, setTotalInProcess] = useState(0);
  const [totalFallouts, setTotalFallouts] = useState(0);

  const columnData = [
    ['Year', 'HIRED', 'IN-PROGRESS', 'REJECT'],
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

  useEffect(() => {
    dispatch(getNewApplicants({ first: 3, filters: {statuses: [{key: CONSTANTS.STATUS.NEW, value: 'New'}]} }));
  }, [dispatch]);

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

  useEffect(() => {
    dispatch(getApplicantReport());
  }, [dispatch])

  useEffect(() => {
    if (reports.getTotalHired) {
      reports.getTotalHired.forEach((hired) => {
        setTotalHired(hired.total)
      })
    }

    if (reports.getTotalInProcess) {
      reports.getTotalInProcess.forEach((process) => {
        setTotalInProcess(process.total)
      })
    }

    if (reports.getTotalFallouts) {
      reports.getTotalFallouts.forEach((fallout) => {
        setTotalFallouts(fallout.total)
      })
    }
  }, [reports.getTotalHired, reports.getTotalInProcess, reports.getTotalFallouts])

  let totalApplicants = totalHired + totalInProcess + totalFallouts;

  return (
    <Dashboard
      menuItems={dashboard.getMenu('recruitment', 'dashboard')}
      modules={modules}
      onModuleChange={setModule}
      module="Recruitment"
    >
      <div className="px-12 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl text-white font-medium">Dashboard</h2>
          <Button
            color="white"
            className="items-center"
            onClick={handleApplicantAdd}
          >
            <IconAdd className="fill-current mr-4" />
            Add New Applicant
          </Button>
        </div>
        <Well className="mt-8 p-8 text-black">
          <div className="flex justify-between">
            <div>
              <p className="text-2xl font-semibold">Welcome back, {userName}!</p>
              <p className="text-sm font-light mt-2">You have {pagination.total} new applicants as of {moment().format('LL')}</p>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={() => history.push(routes.recruitment.applicantList)}
              >
                View Applicant List
              </Button>
            </div>
          </div>
          <div className="text-sm mt-4 relative">
            {processing
              ? <div className="py-12"><Loader /></div>
            : applicants.map((applicant) => (
              <div key={applicant.id} className="flex border-b border-blue-100 py-4">
                <div className="w-24"><span className="ml-2 font-bold rounded bg-green-900 text-white text-xs py-1 px-2">NEW</span></div>
                <div className="flex-auto font-medium">{applicant.fullName}</div>
                <div className="w-48 font-light">{applicant.jobTitle ? applicant.jobTitle.name : ''}</div>
                <div className="w-32 font-light">{applicant.level ? applicant.level.name : ''}</div>
                <div className="w-32 font-light">{applicant.source ? applicant.source.name : ''}</div>
                <div className="w-32 font-light">{applicant.appliedAt}</div>
                <div className="w-12 font-medium text-xs">
                  <Button onClick={() => history.push(route(routes.recruitment.applicantDetail, applicant))}>
                    VIEW
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Well>
        <div className="mt-8 flex justify-between items-center">
          <h3 className="font-semibold text-black text-base">TOTAL NUMBER OF APPLICANTS: <span className="text-blue">{ totalApplicants }</span></h3>
          <Button
            variant="outline">
            View All Reports
          </Button>
        </div>
        <Well className="mt-8 p-8">
          <ColumnGraph
            data={columnData}
          />
        </Well>
      </div>
    </Dashboard>
  );
}

export default DashboardPage;
