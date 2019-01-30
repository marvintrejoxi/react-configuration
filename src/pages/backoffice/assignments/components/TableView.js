import React from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function TableView(props) {
  let tableRows;
  
  if (props.dataSource && props.dataSource.length > 0) {
    let statusName;
    tableRows = props.dataSource.map((item, index) => {
      switch (item.status) {
        case 'pending':
          statusName = 'Pendiente';
          break;
        case 'assigned':
          statusName = 'Asignado';
          break;
        case 'approved':
          statusName = 'Aprobado';
          break;
        default:
          break;
      }
      return(
        <Tr key={index}>
          <Td>{item.created_at}</Td>
          <Td>{item.account_name}</Td>
          <Td>{item.attendant}</Td>
          <Td>{item.employee_name}</Td>
          <Td>
            <span>{statusName}</span>
          </Td>
        </Tr>
      )
    });
  }else{
    tableRows = <tr><td colSpan={5} className='empty'>No se encontró ninguna asignación</td></tr>
  }

  return(
    <Table>
      <Thead>
        <Tr>
          <Th width='25%'>
            Inicio de proceso
          </Th>
          <Th width='20%'>
            Nombre de tienda
          </Th>
          <Th width='25%'>
            Representante de tienda
          </Th>
          <Th width='15%'>
            Ejecutivo dp
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