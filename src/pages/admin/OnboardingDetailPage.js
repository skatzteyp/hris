import React from 'react';
import { Dashboard, Button, Dropdown, Well } from '@ligph/ui';

import useModules from '../../hooks/useModules';
import { dashboard } from '../../utils/dashboard';

import { ReactComponent as IconBurger } from '../../assets/images/icon-burger.svg';
import { ReactComponent as IconX } from '../../assets/images/icon-x.svg';
import { ReactComponent as IconBack } from '../../assets/images/icon-back.svg';

const OnboardingDetailPage = () => {
  const [modules, setModule] = useModules();

  return (
    <Dashboard
      color="gray"
      menuItems={dashboard.getMenu('admin', 'onboarding')}
      modules={modules}
      onModuleChange={setModule}
      module="Admin"
      darkmode
    >
      <div className="px-12 py-4">
        <div className="flex items-center">
          <Button
            color="white"
            className="mr-5"
          >
            <IconBack className="fill-current" />
          </Button>
          <h2 className="text-3xl text-white font-medium">Onboarding Detail</h2>
        </div>

        <Well className="mt-8 p-8 border-none bg-darkmode-900">
          <ul className="flex">
            <li className="flex-initial px-1 py-1 mr-12">
              <span className="font-medium text-white text-xs">Position Applied</span>
              <p className="font-light text-white text-sm">Ruby Developer</p>
            </li>
            <li className="flex-initial px-1 py-1 mr-12">
              <span className="font-medium text-white text-xs">Level</span>
              <p className="font-light text-white text-sm">Senior Level</p>
            </li>
          </ul>
        </Well>

        <div className="w-full mt-6">
          <ul className="block">
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">1</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">2</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">3</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">4</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">5</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">6</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">7</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">8</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">9</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
            <li className="flex items-center py-1">
              <span className="w-1 font-semibold text-white text-sm mr-4">10</span>
              <div className="bg-black-600  w-8 h-10 rounded-l"><IconBurger className="text-white fill-current mt-3 mx-auto" /></div>
              <div className="w-full h-10 flex items-center relative bg-darkmode-800 rounded px-2 py-2 rounded-l-none"><p className="font-light flex-1 text-white text-sm leading-none">Slack</p>
              <Button>
                <IconX className="stroke-current stroke-2 text-gray-400 w-2" />
              </Button>
              </div>
            </li>
          </ul>
        </div>

        <Well className="mt-8 p-8 border-none bg-darkmode-900">
          <span className="flex text-xs text-white font-light">Add Application</span>
          <div className="relative mt-2 flex">
            <div className="mx-1 w-1/2">
              <Dropdown
                placeholder="Select Application"
                className="text-white not-italic"
                darkmode
              />
            </div>
            <div className="mx-1 w-1/2">
              <Button
                color="orange"
                variant="fill"
                className="px-10 py-3 mx-3"
              >Add
              </Button>
            </div>
          </div>
        </Well>

        <Well className="mt-5 p-8 border-none bg-darkmode-900">
          <Button
            color="red"
            variant="outline"
            className="px-6 py-3 mx-3"
          >
            <IconX className="stroke-current stroke-2 mr-2 text-red w-2" />Delete
          </Button>
        </Well>

      </div>
    </Dashboard>
  );
}

export default OnboardingDetailPage;