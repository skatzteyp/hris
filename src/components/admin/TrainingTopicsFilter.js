import React, {useState} from 'react';
import { Text, Button } from '@ligph/ui';

import { ReactComponent as IconSearch } from '../../assets/images/icon-search.svg';
import { ReactComponent as IconCategory } from '../../assets/images/icon-category.svg';

const TrainingTopicsFilter = ({categories, handleCategoryFilter, handleSearch}) => {
  const [categoryId, setCategoryId] = useState();
  const [valueSearch, setValueSearch] = useState('');
  // const [listIds, setListIds] = useState([]);


  const handleClick = (id) => {
    setCategoryId(id);
    // setListIds(prevIds => [...prevIds, id])
    handleCategoryFilter(id);
    
  }
  
  const resetClick = () => {
    handleCategoryFilter();
    setCategoryId(null);
  }

  const handleText = (value) => {
    handleSearch(value);
    setValueSearch(value);
  }
  
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-auto mr-8">
          <Text placeholder="Search Application..."
            icon={<IconSearch className=" fill-current" />}
            darkmode
            value={valueSearch}
            onChange={(e) => handleText(e.target.value)}
          />
        </div>
        <Button
          color="orange"
          variant="outline"
        >
          <IconCategory className="fill-current mr-2" />
          Select Category
        </Button>
      </div>
      <div className={`items-center mt-5 relative z-10`}>
        <div className="flex flex-wrap">
          {categories && categories.map(({ id, name }, index) => (
            <Button
              variant={'fill'}
              // color={buttonColor}
              color={parseInt(categoryId) === parseInt(id) ? 'orange' : 'gray'}
              className="py-3 px-6 mr-3 mb-3"
              key={`${name}-${id}`}
              onClick={() =>
                parseInt(categoryId) === parseInt(id)
                  ?
                  resetClick()
                  :
                  handleClick(id)}
            >
                {name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingTopicsFilter;
