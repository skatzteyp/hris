import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@ligph/ui';
import './custom-checkbox.scss'
import LoadingMessage from '../common/LoadingMessage';
import {
  updateCategoryByTraining,
  deleteCategoryByTraining,
} from '../..//redux/modules/training/trainingActions';
import { useDispatch, useSelector } from 'react-redux';

const Category = ({ title, id, trainingId, status }) => {
  
  const titleRef = useRef('');
  const dispatch = useDispatch();
  const { training: { training: { categoryDetails, processing, updating } } } = useSelector(state => state);
  const [statusCategory, setStatusCategory] = useState(false);

  useEffect(() => {
    if (categoryDetails) {
      // categoryDetails.map(({ category }) => category.id === id ? setStatusCategory(true) : setStatusCategory(false));
      const stats = categoryDetails.some(ele => ele.category.id === id);
      if (stats) {
        setStatusCategory(true);
      } else {
        setStatusCategory(false);
      }
    }
  }, [id, categoryDetails])

  const handleCheckbox = e => {
    const id = titleRef.current.id;


    let check = categoryDetails.find(({ category }) => id === category.id)

    if (e.target.checked === true && categoryDetails.length === 0) {
      const data = { category_id: id, training_id: trainingId }
      // console.log('empy category detail');
      setStatusCategory(true);
      dispatch(updateCategoryByTraining(data));
    }

    if (e.target.checked === true && categoryDetails.length > 0 && !check) {
          const data = { category_id: id, training_id: trainingId }
          // console.log('update category');
          setStatusCategory(true);
          dispatch(updateCategoryByTraining(data));
    } else {
      if (check) {
        // console.log('delete category');
        setStatusCategory(false);
        dispatch(deleteCategoryByTraining({id: check.id, training_id: trainingId}))
      }
    }
  }


  return (
    <>
      {processing && process ? <div className="relative min-h-sm"><Loader darkmode/></div> : 
      updating ? <LoadingMessage text="Saving"/>
      : null
    }
      <div className="bg-darkmode-800 w-full p-2 rounded mr-8 mt-4 custom-checkbox">
        {/* {categoryDetails.length > 0 ? categoryDetails.map(({ id: catId, category }) => (
          <input type="checkbox"
            key={`{${category.name}-${catId}}`}
            checked={id === category.id}
            onClick={handleCheckbox} />
            
        )) : 
          <input type="checkbox"
            onClick={handleCheckbox}
          />
        } */}
        <input
          type="checkbox"
            // key={`{${category.name}-${catId}}`}
          checked={statusCategory}
          onClick={handleCheckbox}
        />
        <span className="checkmark pointer-events-none"></span> <span className="ml-8" ref={titleRef} id={id}>{title}</span>
    </div>
    </>  
  )
}

export default Category
