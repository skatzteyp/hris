import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Marp } from '@marp-team/marp-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@ligph/ui';
import { useDispatch } from 'react-redux';
import { updateEmployeeTraining } from '../../redux/modules/employee/employeeActions';

import { Loader } from '@ligph/ui';

import { ReactComponent as IconRaquo } from '../../assets/images/icon-raquo.svg';

const TrainingDetailSlideshow = ({ slideshow,
  setActiveStep,
  setActiveTabStats,
  completionLevel,
  employeeTrainingId,
  trainingDetailStatus,
  handleSetCompletionLevel,
  getCompletionLevel,
  handleApiCompletionLevel
}) => {

  const { content } = slideshow || {};
  const dispatch = useDispatch();

  const location = useLocation();
  const [md, setMd] = useState('');
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [process, setProcess] = useState(true);

  useEffect(() => {
    if(slideshow){
      if( slideshow.content === null){
        handleApiCompletionLevel(1);
        handleSetCompletionLevel(2);
        setActiveStep('exam');
      }
    }
  },[ slideshow, handleApiCompletionLevel,handleSetCompletionLevel, setActiveStep ]);

  useEffect(() => {

    if(content !== null){
      const params = new URLSearchParams(location.search);
      // var config = {
      //   headers: {'Access-Control-Allow-Origin': '*'}
      // };

      if (params.get('file')) {
        axios.get('https://training.cody.asia/' + params.get('file'))
          .then((res) => {
            setMd(res.data);
          });
      } else {
        const check = new RegExp(/\+/g);
        const replaceContent = check.test(content) ? content.replace(/\+/g, '%20') : content;
        axios.get(replaceContent)
          .then((res) => {
            setProcess(prevState => false);
            setMd(res.data);
          }).catch(error => {
            console.log('axios error', error);
            setMd(content);
          });
      }
    }
  }, [content, location]);

  const renderMD = (slides) => {
    setPages(slides.length)
    if (page < 0) {
      setPage(0);
      return '';
    }

    if (page >= slides.length) {
      setPage(slides.length - 1);
      return '';
    }

    return (
      slides ? (<div id="slides" className="slides" >
        {slides[page].slide}
      </div>) : <p>Loading Marp...</p>
    );
  }

  const handleClick = (page) => {
    setPage(page);
  }

  const handleKeyPress = (e) => {
    const { keyCode } = e;
    if (keyCode === 37) {
      handleClick(page - 1)
    }

    if (keyCode === 39) {
      handleClick(page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  })

  const handleSlideDone = () => {
    setActiveStep('exam');
    handleSetCompletionLevel(2);

    setActiveTabStats({ video: true, slideshow: true });
     if (completionLevel === 1) {
       if (employeeTrainingId !== null && employeeTrainingId !== undefined) {
         // trigger completetion level if slideshow blank +1 = 2 = exam
         handleApiCompletionLevel(1)
         dispatch(updateEmployeeTraining({ id: employeeTrainingId, completionLevel: 2 }));
       }
     }
  }

  return (
    <>
      { process ?
           <Loader/>
        : null
       }

      <div className="p-12 bg-black-700" onKeyDown={handleKeyPress}>

      { content !== undefined ?
        <Marp markdown={md} render={renderMD} options={{ html: true }} />
        : null
       }
        <div className="bg-black-900 flex items-center justify-between pl-4">
          <span className="flex-grow text-xs text-white">Slide {page + 1} of {pages}</span>
          <div className="flex items-center justify-between">
            <button
              className="flex justify-center items-center h-10 px-4 focus:outline-none text-white "
              onClick={() => handleClick(page - 1)}
            >
              <IconRaquo className="stroke-current transform rotate-180" />
            </button>
            <span className="block border-r-2 border-white h-4"></span>
            <button
              className="flex justify-center items-center h-10 px-4 focus:outline-none text-white"
              onClick={() => handleClick(page + 1)}
            >
              <IconRaquo className="stroke-current" />
            </button>
          </div>
        </div>
      </div>
      <div className="my-8 mr-8 flex justify-end">
        <Button
          variant="fill"
          color="purple"
          className="px-8 py-4 h-auto"
          disabled={ (page + 1 < pages) || getCompletionLevel >= 2  || process }
          onClick={handleSlideDone}
        >
          {getCompletionLevel >= 2 ? 'Next' : 'Done'}
        </Button>
      </div>
    </>
  )
}

export default TrainingDetailSlideshow;
