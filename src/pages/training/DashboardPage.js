import React from 'react';
import { routes } from '../../utils/routes';
import { useHistory } from 'react-router-dom';
import {
  Dashboard,
  Button,
  Well,
  Progress,
  Link, } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

import topicDummy from '../../assets/images/topic-dummy.jpg';

const DashboardPage = () => {
  const history = useHistory();
  const [modules, setModule] = useModules();

  const trainingItem = [
    {
      title: 'Introduction to Flutter Developement Using Dart',
      tags: [
        {
          name: 'FE'
        },
        {
          name: 'BE'
        }
      ],
      image: topicDummy,
      progress: '50',
      due: '00/00/00'
    },
    {
      disabled: 'true',
      title: 'Introduction to Flutter Developement Using Dart',
      tags: [
        {
          name: 'BE'
        },
        {
          name: 'FE'
        }
      ],
      image: topicDummy,
      progress: '80',
      due: '00/00/00'
    }
  ]

  const articleItem = [
    {
      title: 'Introduction to Flutter Developement Using Dart',
      tags: [
        {
          name: 'FE'
        },
        {
          name: 'BE'
        }
      ],
      image: topicDummy,
    },
    {
      disabled: 'true',
      title: 'Introduction to Flutter Developement Using Dart',
      tags: [
        {
          name: 'BE'
        },
        {
          name: 'FE'
        }
      ],
      image: topicDummy,
    },
    {
      title: 'Introduction to Flutter Developement Using Dart',
      tags: [
        {
          name: 'FE'
        },
        {
          name: 'BE'
        }
      ],
      image: topicDummy,
    },
    {
      title: 'Introduction to Flutter Developement Using Dart',
      tags: [
        {
          name: 'FE'
        },
        {
          name: 'BE'
        }
      ],
      image: topicDummy,
    },
  ]

  const recentQuiz = [
    {
      title: 'Introduction to Javascript',
      dateTaken: '00/00/00',
      score: '12',
      remark: 'PASSED',
      remarkColor: '#3fb223'
    },
    {
      title: 'Introduction to Javascript',
      dateTaken: '00/00/00',
      score: '5',
      remark: 'FAILED',
      remarkColor: 'red'
    },
    {
      title: 'Introduction to Javascript',
      dateTaken: '00/00/00',
      score: '12',
      remark: 'PASSED',
      remarkColor: '#3fb223'
    },
  ]

  return (
    <Dashboard
      color="purple"
      menuItems={dashboard.getMenu('training', 'dashboard')}
      modules={modules}
      onModuleChange={setModule}
      module="Training"
    >
      <div className="mb-4 px-12">
        <div className="flex justify-between">
          <h2 className="text-3xl text-white font-medium">Dashboard</h2>

        </div>
        <div className="flex justify-between mt-8">
          <Well className="p-8 text-black w-full mr-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold">Hello, Maximus!</p>
                <p className="text-sm font-light mt-2">Welcome to Cody Academy</p>
              </div>
            </div>
          </Well>
          <Well className="p-8 w-full flex justify-between items-center">
            <div className="flex flex-col text-center">
              <p className="text-xs font-light">TRAINING TOPICS</p>
              <span className="text-xl font-semibold">22</span>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs font-light">COMPLETED</p>
              <span className="text-xl font-semibold">20</span>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs font-light">IN PROGRESS</p>
              <span className="text-xl font-semibold">2</span>
            </div>
            <div className="">
              <Button
                variant="fill"
                color="purple"
                className="font-light"
                onClick={() => history.push(routes.training.trainingList)}
              >
                My Training Topics
              </Button>
            </div>
          </Well>
        </div>
      </div>
      <div className="flex justify-between px-12 mt-8">
        <div className="mr-4 w-full">
          <h3 className="font-semibold text-black text-base mb-4">Continue your training</h3>
          <div className="grid grid-cols-2 gap-2">
            {trainingItem.map((item, index) => (
              <Link to="" key={index} className={`relative ${item.disabled ? 'pointer-events-none' : ''}`}>
                <div className={`bg-white rounded border border-black-100 p-4 ${item.disabled ? 'opacity-50' : ''}`}>
                  <div className="mb-4">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="flex mb-4">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="inline-block rounded-sm py-1 px-4 bg-purple-100 text-purple text-xs font-normal mr-2">{tag.name}</span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-black mb-4">{item.title}</h3>
                  <div className="mb-4">
                    <Progress min="10" max="100" value={item.progress} color="purple" />
                  </div>
                  <p className="text-xxs text-yellow-300 font-normal">Due Until {item.due}</p>
                </div>
                { item.disabled ?
                  <div className="w-11/12 bg-purple-100 absolute transform -translate-x-1/2 bottom-0 left-1/2 px-6 py-4 rounded-sm -mb-6">
                    <span className="bg-purple-100 block w-4 h-4 transform -translate-x-1/2 rotate-45 left-1/2 top-0 -mt-2 absolute "></span>
                    <p className="text-xs font-light leading-5">You need to finish your current training before proceeding to this topic.</p>
                  </div>
                 : ''
                }
              </Link>
            ))}

          </div>
        </div>

        <div className="flex flex-col w-full">
          <h3 className="font-semibold text-black text-base mb-4">Your recent quiz</h3>
          <Well className="h-full px-4 pt-8 ">
            <div className="flex justify-between">
              <div className="flex justify-between w-full mr-8">
                <div className="flex flex-col text-center">
                  <p className="text-xs font-light">GENERAL AVERAGE</p>
                  <span className="text-2xl font-semibold">89%</span>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs font-light">FAILED EXAMS</p>
                  <span className="text-2xl font-semibold text-red">20</span>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs font-light">PASSED EXAMS</p>
                  <span className="text-2xl font-semibold text-green">2</span>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  color="purple"
                  className="whitespace-no-wrap"
                  onClick={() => { }}
                >
                  My Results
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-light mb-4">RECENT QUIZ:</p>
              <ul>
                {recentQuiz.map((item, index) => (
                  <li key={index} className={`flex justify-between align-center pb-1 mb-4 ${index + 1 === recentQuiz.length ? '' : 'border-yellow-100 border-b' }`}>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{item.title}</p>
                      <span className="text-xxs text-yellow-300 font-normal block">Date Taken: <time>{item.dateTaken}</time></span>
                    </div>
                    <div className="mr-10">
                      <p className="font-semibold">{item.score}/20</p>
                    </div>
                    <div className="w-16">
                      <span className="inline-block uppercase text-xxs font-medium border rounded px-2 py-1" style={{ borderColor: item.remarkColor, color: item.remarkColor}} >{item.remark}</span>
                    </div>
                  </li>
                ))
                }
              </ul>
            </div>
            {/* <span className="italic text-sm font-light">You have not taken any  quizzes yet.</span> */}
          </Well>
        </div>
      </div>

      <div className="px-12 mt-8 pb-8">
        <h3 className="font-semibold text-black text-base mb-4">Helpful Articles</h3>
        <div className="grid grid-cols-4 gap-4">
          {articleItem.map((item, index) => (
            <Link to="" key={index} className={`relative`}>
              <div className={`bg-white rounded border border-black-100 p-4`}>
                <div className="mb-4">
                  <img src={item.image} alt="" />
                </div>
                <div className="flex mb-4">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="inline-block rounded-sm py-1 px-4 bg-purple-100 text-purple text-xs font-normal mr-2">{tag.name}</span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-black mb-4">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            color="purple"
            onClick={() => history.push(routes.training.trainingList)}
          >
            View More Articles
          </Button>
        </div>
      </div>

    </Dashboard>
  );
}

export default DashboardPage;
