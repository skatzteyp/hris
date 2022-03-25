import React, { useState, useEffect } from 'react';

import { Link } from '@ligph/ui';
import { ReactComponent as IconMenu } from '../../assets/images/icon-menu.svg';
import { ReactComponent as IconSettings } from '../../assets/images/icon-settings.svg';
import { ReactComponent as IconVideo } from '../../assets/images/icon-video.svg';
import { ReactComponent as IconSlideShow } from '../../assets/images/icon-slideshow.svg';
import { ReactComponent as IconExam } from '../../assets/images/icon-exam.svg';
import { ReactComponent as IconHandsOn } from '../../assets/images/icon-hands-on.svg';
import { ReactComponent as IconCheck } from '../../assets/images/icon-check.svg';

const TrainingDetailDashboard = ({
  children,
  title,
  dueDate ='00/00/0000',
  color = 'purple',
  activeStep,
  onActiveView,
  training: { video, exam, handsOn, slideshow, finish },
  activeTabStats: { video: videoTab, slideshow: slideshowTab },
  completionLevel,
  getCompletionLevel,
  trainingDetailStatus
}) => {

  const [sidebar, setSidebar] = useState(localStorage.getItem('dashboard') !== "false");
  const [show, setShow] = useState(false);
  const [complete] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  const handleClickOutside = (e) => {
    if (
      !e.target.classList.contains('header-dropdown') &&
      !e.target.classList.contains('header-dropdown-item')
    ){
      setShow(false); }
  }

  const disabled = (slideshowTab === false && videoTab === false)
    || (slideshowTab === false && videoTab === true)
    || (videoTab === false && slideshowTab === true);

  useEffect( () => {

    const checkMenuItems = [
      {
        name: 'video',
        label: 'Video',
        icon: IconVideo,
        status:  video !== null && video?.sourcePath !== null  ? true : false,
        link: '#',
        disabled: activeStep === 'handsOn' || activeStep === 'exam',
        checkStatus: (completionLevel <= 5 && completionLevel >= 1) || getCompletionLevel >= 1
          ? <IconCheck className="fill-current" /> : <div></div>
      },
      {
        name: 'slideshow',
        label: 'Slideshow',
        icon: IconSlideShow,
        status: slideshow !== null && slideshow?.content !== null  ? true : false,
        link: '#',
        disabled: (completionLevel === 0 || getCompletionLevel === 0) || (videoTab === false && slideshowTab === false) || (activeStep === 'handsOn' || activeStep === 'exam'),
        checkStatus: (completionLevel <= 5 && completionLevel > 1)  || getCompletionLevel > 1
          ? <IconCheck className="fill-current" /> : <div></div>
      },
      {
        name: 'exam',
        label: 'Exam',
        icon: IconExam,
        status: exam !== null ? true : false,
        link: '#',
        disabled: disabled || completionLevel <= 1,
        checkStatus: [3,4,5].includes( completionLevel ) || [3,4,5].includes( getCompletionLevel )
          ? <IconCheck className="fill-current" /> : <div></div>
      },
      {
        name: 'handsOn',
        label: 'Hands On',
        icon: IconHandsOn,
        status: handsOn !== null ? true : false,
        link: '#',
        disabled: disabled || completionLevel <= 3,
        checkStatus:   [4, 5].includes( completionLevel ) || [4, 5].includes( getCompletionLevel )
          ? <IconCheck className="fill-current" /> : <div></div>,
      },
      {
        name: 'finish',
      },
    ]
    setMenuItems(prevState => checkMenuItems);

  },[video, slideshow, exam, handsOn, activeStep, completionLevel, slideshowTab, videoTab, disabled, getCompletionLevel]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    localStorage.setItem('dashboard', !sidebar);
    setSidebar(!sidebar);
  }

  return (
    <>
    <div className="flex">
      <aside className={`h-screen flex-none flex flex-col transition-all duration-500 overflow-hidden border-gray-border border-r bg-white ${sidebar ? 'w-1/4' : 'w-20'}`}>
        <div className="flex items-start justify-between w-full mt-12">
          <div className={`overflow-hidden ${sidebar ? 'h-auto' : 'h-8'}`}>
            <h3 className="ml-10 font-bold text-base text-black">
              {title}
            </h3>
            <p className="ml-10 mt-4 text-xs text-black-300">
              {/* Due Date: <strong>{dueDate}</strong> */}
            </p>
          </div>
          <div className="w-20 h-12 p-2 flex-none">
            <button onClick={handleToggle} className={`w-full h-full rounded transition-all duration-500 focus:outline-none hover:bg-${color}-100`}>
              <IconMenu className={`fill-current m-auto text-${color} ${sidebar ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        <div className="relative w-full mt-6">
          <ul>
            { menuItems && menuItems.map((item, index) => item.status === true && (
              <li key={item.label} style={item.disabled === true ? { pointerEvents: 'none' } : null}>
                <Link className="block" to={item.link} onClick={() => onActiveView(item.name, index)}>
                  <div className="px-3 py-2">
                    <div className={`flex items-center w-full h-12 text-sm rounded
                      overflow-hidden text-${color} hover:bg-${color}-100
                      ${item.active ? `bg-${color}-100` : 'bg-white'}  ${ activeStep === item.name ? `bg-${color}-100` : null} `}>

                      <div className={`flex items-center justify-center flex-none w-12 transition-all duration-500 ${sidebar ? 'pl-6' : 'pl-2'}`}>
                        <item.icon className="fill-current stroke-current w-4 h-4" />
                      </div>
                      <div className="flex items-center font-normal flex-auto text-black pl-5">
                        {item.label}
                      </div>
                      <div className={`flex items-center justify-center rounded-full h-8 w-8 bg-white mr-4 ${complete ? 'bg-purple' : 'bg-white'}`}>
                        { (getCompletionLevel !== 0 && completionLevel !== undefined ) || !trainingDetailStatus.hasOwnProperty("id")
                          ? item.checkStatus
                          :
                           getCompletionLevel === 0 ?
                            <div></div> :
                            <IconCheck className="fill-current" />}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
            }
          </ul>
        </div>
      </aside>
      <div className="w-full flex-auto h-screen bg-gray-background overflow-y-scroll relative">
        <header className={`w-full py-8 px-12 bg-gradient-${color}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-white text-base font-semibold">
              {activeStep === 'video' ? <IconVideo className="stroke-current inline-block mr-2"/> : null}
              {activeStep === 'slideshow' ? <IconSlideShow className="stroke-current inline-block mr-2 w-4 h-4"/> : null}
              {activeStep === 'exam' ? <IconExam className="stroke-current inline-block mr-2"/> : null}
              {activeStep === 'handsOn' ? <IconHandsOn className="stroke-current inline-block mr-2 w-4 h-4"/> : null}
              {title}
            </h1>
            <div className="relative header-dropdown">
              <button
                className="flex justify-center items-center h-10 w-10 mr-3 focus:outline-none text-white"
                onClick={() => setShow(true)}
              >
                <IconSettings className="fill-current"/>
              </button>
              {show ? <>
                          <div  className="absolute top-0 right-0 transform translate-y-12 ml-2 w-64 z-20">
                            <div className="w-4 h-4 border-t border-l border-gray-border absolute right-0 top-0 transform -translate-x-6 -translate-y-2 rotate-45 z-20 bg-white"></div>
                            <div className="border border-gray-border py-4 px-5 rounded bg-white z-10 relative">
                              <div className="header-dropdown-item mb-4">
                                <Link to="">Go to Dashboard</Link>
                              </div>
                              <div className="header-dropdown-item">
                                <Link to="">Go to Training Topics</Link>
                              </div>
                            </div>
                          </div>
                          </>
                : null
              }

            </div>
          </div>
        </header>
        <div className="w-full max-w-7xl mx-auto relative">
          {children}
        </div>
      </div>
    </div>
    </>
  );
}

export default TrainingDetailDashboard;
