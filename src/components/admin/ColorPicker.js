import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = () => {
  const [color, setColor] = useState('#ff0000');

  return (
    <div>
      <ChromePicker
        color={color}
        onChangeComplete={ (color) => {setColor(color.hex)} }
      />
    </div>
  );
}

export default ColorPicker;