import React from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import Item from '../components/Item'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function TableView(props) {
  let tableRows;

  if (props.dataSource && props.dataSource.length > 0) {
    tableRows = props.dataSource.map((item, index) => {
      return(
        <Item 
          key={index} 
          onPrioritizeAccount={props.onPrioritizeAccount}
          {...item} 
        />
      )
    });
  }else{
    tableRows = <tr><td colSpan={6} className='empty'>No se encontró ninguna asignación</td></tr>
  }

  return(
    <Table>
      <Thead>
        <Tr>
          <Th width='6%'></Th>
          <Th width='15%'>
            Inicio de proceso
          </Th>
          <Th width='23%'>
            Nombre de tienda
          </Th>
          <Th width='23%'>
            Representante de tienda
          </Th>
          <Th width='23%'>
            Ejecutivo dp
          </Th>
          <Th width='10%'>
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