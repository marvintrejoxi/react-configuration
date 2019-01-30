import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
const RadioButton = Radio.Button;


function Roles(props) {
  if (props.roles && props.roles.length > 0) {
    let roles = props.roles.map((item, index) => {
      let roleName;
      if (item.name !== 'administrator') {
        if (item.name === 'compliance officer') {
          roleName = 'Supervisor';
        } else if (item.name === 'executive') {
          roleName = 'Ejecutivo de ventas';
        }

        return(
          <RadioButton
            key={index}
            value={item.id}
            id={`role_id_${index}`}
          >
            {roleName}
          </RadioButton>
        )
      }
      return(null);
    });
    return(roles);
  }
  else{
    return(null);
  }
}

Roles.propTypes = {
  roles: PropTypes.array.isRequired,
};

export default Roles