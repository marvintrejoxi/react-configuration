import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Col, Card, Row } from 'antd';

function ProcessView(props) {
  if (props.dataSource && props.dataSource.length > 0) {
    let content = props.dataSource.map((item, index) => {
      let status;
      let assignments;
      let assignCases = [];

      switch (item.assigned_accounts.length) {
        case 0:
          assignCases = extraAssignments(5);
          break;
        case 1:
          assignCases = extraAssignments(4);
          break;
        case 2:
          assignCases = extraAssignments(3);
          break;
        case 3:
          assignCases = extraAssignments(2);
          break;
        case 4:
          assignCases = extraAssignments(1);
          break;
        default:
          break;
      }


      assignments = item.assigned_accounts.map((assignment, key) => {
        switch (assignment.status) {
          case 'pending':
            status = <span className='in-backward'>Atrasada</span>
            break;
          case 'assigned':
            status = <span className='in-process'>En proceso</span>
            break;
          case 'approved':
            status = <span className='not-started'>No iniciada</span>
            break;
          default:
            break;
        }
        return(
          <Tr key={key}>
            <Td>{assignment.account_name}</Td>
            <Td>{status}</Td>
            <Td>{assignment.final_date}</Td>
          </Tr>
        )
      });
      return(
        <Col
          span={12} 
          xs={24} 
          sm={24} 
          md={12} 
          lg={12} 
          xl={12} 
          xxl={12} 
          className='ProcessesList'
          key={index}
        >
          <Card title={item.name}>
            <Table>
              <Thead>
                <Tr>
                  <Th width='45%'>Solicitud</Th>
                  <Th width='27%'>Estado</Th>
                  <Th width='27%'>Dia final</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assignments}
                {assignCases}
              </Tbody>
            </Table>
            <div className='ProcessLink'>
              <NavLink to={`/${item.name}`}>
                Ver detalles
              </NavLink>
            </div>
          </Card>
        </Col>
      )
    });
    return(
      <Row type="flex" align='middle' gutter={16}>
        {content}
      </Row>
    )
  }else {
    return(
      <Card className='align-center empty'>
        No se encontro ninguna solicitud en proceso
      </Card>
    )
  }
}

function extraAssignments(number) {
  let extras = [];
  for (let i = 0; i < number; i++) {
    extras.push(
      <tr key={i}>
        <td colSpan={3}>
          <NavLink to='/assignments' className='MoreAssignments'>
            Asignar caso
          </NavLink>
        </td>
      </tr>
    )
  }
  return(extras)
}

export default ProcessView;