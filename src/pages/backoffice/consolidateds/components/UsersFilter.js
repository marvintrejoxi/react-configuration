import React from 'react';
import PropType from 'prop-types';
import { Select } from 'antd';
const Option = Select.Option;

function UsersFilter(props){
  let optionsForSelect;
  if (props.dataSource && props.dataSource.length > 0) {
    optionsForSelect = props.dataSource.map((item, index) => {
      return(
        <Option 
          key={index}
          value={item.id}
        >
          {item.name}
        </Option>
      )
    });
    return(
      <Select defaultValue='Encargado' size='large' className='selectEmployee'>
        {optionsForSelect}
      </Select>
    )
  }else {
    optionsForSelect = <Option disabled value=''>No encontrados</Option>
    return(
      <Select defaultValue='Encargado' size='large' className='selectEmployee'>
        {optionsForSelect}
      </Select>
    )
  }
}

UsersFilter.PropType = {
  dataSource: PropType.array.isRequired
};

export default UsersFilter;