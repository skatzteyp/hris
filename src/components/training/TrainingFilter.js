import React, { useState } from 'react';
import { Text, Button } from '@ligph/ui';

import { ReactComponent as IconSearch } from '../../assets/images/icon-search.svg';
import { ReactComponent as IconCategory } from '../../assets/images/icon-category.svg';

const TrainingFilter = ({
  categories,
  handleCategoryFilter,
  handleSearch,
  buttonText = "Select Category"
}) => {
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [valueSearch, setValueSearch] = useState('');

  const handleAdvanceFilter = () => {
    setShow(!show)
  }

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
          <Text placeholder="Search Topics..."
            icon={<IconSearch className=" fill-current" />}
            value={valueSearch}
            onChange={(e) => handleText(e.target.value)}
          />
        </div>
        <Button
          onClick={handleAdvanceFilter}
          variant={show ? 'fill' : 'outline'}
          color="purple"
        >
          <IconCategory className="fill-current mr-2" />
          {buttonText}
        </Button>
      </div>
      <div className={`items-center mt-5 relative z-10 ${show ? 'block' : 'hidden'}`}>
        <div className="flex flex-wrap">
        {categories && categories.map(({ id, name }, index) => (
          <div key={`${id}-${index}`} className="mr-4 mb-4">
              <Button
                variant="fill"
                color={parseInt(categoryId) === parseInt(id) ? 'purple' : 'gray'}
                colorWeight="100"
                textColor="purple"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingFilter;
