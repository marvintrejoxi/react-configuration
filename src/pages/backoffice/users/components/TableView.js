import React from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function TableView(props) {
  let tableRows;
  
  if (props.dataSource && props.dataSource.length > 0) {
    let roleName;
    tableRows = props.dataSource.map((item, index) => {
      switch (item.role_name) {
        case 'administrator':
          roleName = 'Administrador';
          break;
        case 'executive':
          roleName = 'Ejecutivo de ventas';
          break;
        case 'compliance officer':
          roleName = 'Supervisor';
          break;
        default:
          break;
      }
      return(
        <Tr key={index}>
          <Td>{item.created_at}</Td>
          <Td>{item.name}</Td>
          <Td>{item.email}</Td>
          <Td>{roleName}</Td>
          <Td>
            {item.status === 'enable' ? 
              (<span className='active'>Activo</span>) : 
              (<span className='inactive'>Deshabilitado</span>) 
            }
          </Td>
        </Tr>
      )
    });
  }else{
    tableRows = <tr><td colSpan={5} className='empty'>No se encontró ningún usuario</td></tr>
  }

  return(
    <Table>
      <Thead>
        <Tr>
          <Th width='25%'>
            Fecha de ingreso
          </Th>
          <Th width='20%'>
            Nombre del ejecutivo
          </Th>
          <Th width='25%'>
            Correo electrónico
          </Th>
          <Th width='15%'>
            Rol
          </Th>
          <Th width='20%'>
            Estado
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableRows}
      </Tbody>
    </Table>
  )
}

TableView.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default TableView;