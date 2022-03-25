import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dashboard, Well, Button, Tabs, Tab, Loader } from '@ligph/ui';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg'
import { ReactComponent as IconUpload } from '../../assets/images/icon-upload.svg'

import { routes } from '../../utils/routes';
import { dashboard } from '../../utils/dashboard';
import { CONSTANTS } from '../../utils/constants';

import {
  getTraining,
  updateTraining,
  updateTrainingVideo,
  updateTrainingSlideshow,
  updateTrainingHandsOn,
  updateTrainingExam,
} from '../../redux/modules/training/trainingActions';

import TrainingHandsOn from '../../components/admin/TrainingHandsOn';
import TrainingQuizList from '../../components/admin/TrainingQuizList';
import TrainingVideo from '../../components/admin/TrainingVideo';
import TrainingSlideshow from '../../components/admin/TrainingSlideshow';
import TrainingDetail from '../../components/admin/TrainingDetail';

import ModalAlert from '../../components/common/ModalAlert';
import ImportCsv from '../../components/admin/training/ImportCsv';

import useTraining from '../../hooks/useTraining';
import useModules from '../../hooks/useModules';

const TrainingDetailPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [error, setError] = useState(false);
  const [updateStats, setUpdatesStats] = useState(true);
  const [modules, setModule] = useModules();
  const [selectedTab, setSelectedTab] = useState(CONSTANTS.TRAINING_STATUS.DETAIL);

  const { deleteTraining } = useTraining();

  const { id } = useParams();
  const { training: { training } } = useSelector(state => state);

  const [modalDeleteAlert, setModalDeleteAlert] = useState(false);
  const [modalImportCsv, setModalImportCsv] = useState(false);


  useEffect(() => {
    setError(false);
    setUpdatesStats(false);
  }, [error, updateStats]);

  const handleNext = () => {
    switch (+selectedTab + 1) {
      case CONSTANTS.TRAINING_STATUS.SLIDESHOW:
        dispatch(updateTrainingSlideshow({trainingId: training.id}))
        console.log('trigger mutation for slideshow');
        break;
      case CONSTANTS.TRAINING_STATUS.VIDEO:
        dispatch(updateTrainingVideo({trainingId: training.id}))
        console.log('trigger mutation for video');
        break;
      case CONSTANTS.TRAINING_STATUS.HANDSON:
        dispatch(updateTrainingHandsOn({trainingId: training.id}))
        console.log('triggger mutation for handson');
        break;
      case CONSTANTS.TRAINING_STATUS.QUIZLIST:
        console.log('trigger mutation for quiz list');
        dispatch(updateTrainingExam({title: 'New Exam', training: { connect: training.id } }));
        break;
      default:
        break;
    }

    if (selectedTab === CONSTANTS.TRAINING_STATUS.QUIZLIST) {
      history.push(routes.admin.trainingList);
    }

    const data = {
      id: training.id,
    }

    dispatch(updateTraining(data));

    // if (!error) {
    // }
    setSelectedTab(selectedTab + 1);
  }

  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(getTraining({ id }));
      if (training.exam === null) {
        dispatch(updateTrainingExam({ title: 'New Exam', training: { connect: id } }));
      }
    }
  }, [id, training.exam, dispatch]);

  const handleDeleteTraining = () => {
    deleteTraining({ id });

    setTimeout(() => {
      window.location.href = routes.admin.trainingList;
    }, 1000);
  }

  return (
    <Dashboard
      menuItems={dashboard.getMenu('admin', 'trainings')}
      modules={modules}
      onModuleChange={setModule}
      module="Admin"
      color="gray"
      darkmode
    >
    {
        training.id ?
        <>
      <div className="flex justify-between items-center px-12 mt-4">

        <ModalAlert
          modalName="Notification"
          buttonColor="red"
          show={modalDeleteAlert}
          onClose={ () => setModalDeleteAlert(false) }
          modalSize="w-1/3 h-64"
        >
            <p className="py-10 text-center">
              Are you sure you want to delete?
            </p>

            <Button
              color="red"
              variant="fill"
              className={`m-8 right-0 bottom-0 bg-red float-right my-1 py-0 mx-0`}
              onClick={() => handleDeleteTraining() }
            >
                Delete
            </Button>
        </ModalAlert>

        <ModalAlert
          modalName="Import"
          show={modalImportCsv}
          onClose={ () => setModalImportCsv(false) }
          modalSize="w-1/2 h-64"
        >

          <ImportCsv trainingId={ training.id } exam={ training.exam} show={modalImportCsv} onClose={ () => setModalImportCsv(false) } />

        </ModalAlert>

        <div className="flex">
          <Button
            color="white"
            onClick={() => history.push(routes.admin.trainingList)}
            className="mr-5"
          >
            <IconBack className="fill-current" />
          </Button>
          <h2 className="text-white text-3xl font-medium">Training Detail</h2>
        </div>
      </div>

      <div className="px-12 pb-12">
        <Well className="my-8 bg-darkmode-900 border-none">
          <Tabs selected={selectedTab} onChange={setSelectedTab} darkmode className="rounded">
            <Tab label="Detail" value={CONSTANTS.TRAINING_STATUS.DETAIL}>
              <TrainingDetail
                valid={setError}
                updateStats={setUpdatesStats}
              />
            </Tab>
            <Tab label="Slideshow" value={CONSTANTS.TRAINING_STATUS.SLIDESHOW}>
              <TrainingSlideshow
                title="Training Slideshow"
                training={training}
                valid={setError}
                updateStats={setUpdatesStats}
              />
            </Tab>
            <Tab label="Video" value={CONSTANTS.TRAINING_STATUS.VIDEO}>
              <TrainingVideo
                title="Training Video"
                training={training}
                valid={setError}
                updateStats={setUpdatesStats}
              />
            </Tab>
            <Tab label="Hands On" value={CONSTANTS.TRAINING_STATUS.HANDSON}>
              <TrainingHandsOn
                title="Training Hands On"
                training={training}
                valid={setError}
                updateStats={setUpdatesStats}
              />
            </Tab>
            <Tab label="Quiz" value={CONSTANTS.TRAINING_STATUS.QUIZLIST}>
              <TrainingQuizList
                title="Training Quiz"
                training={training}
                valid={setError}
                updateStats={setUpdatesStats}
              />
            </Tab>
          </Tabs>
        </Well>
        <div className="py-4 px-8 mt-4 bg-darkmode-900 rounded text-white flex justify-between items-center">
          <div className="flex">
            <Button
              color="red"
              variant="outline"
              onClick={() => setModalDeleteAlert(true)}
            >
              <IconX className="stroke-current stroke-2 mr-2 transform scale-75" />
                Delete
            </Button>


              {(() => {
                if( selectedTab === CONSTANTS.TRAINING_STATUS.QUIZLIST ){
                  return(
                    <Button
                      color="orange"
                      variant="outline"
                      className="ml-2"
                      onClick={() => setModalImportCsv(true)}
                    >
                      <IconUpload className="stroke-current stroke-2 mr-2 transform scale-75" />
                        Import
                    </Button>
                  );
                }
              })()}

          </div>
          <Button
            onClick={handleNext}
            variant="fill"
          >
            {selectedTab === CONSTANTS.TRAINING_STATUS.QUIZLIST ? 'DONE' : 'Next Step'}
          </Button>
        </div>
      </div>
          </>
        :
        <div className="relative min-h-sm"><Loader darkmode/></div>
    }
    </Dashboard>
  );
}

export default TrainingDetailPage;
