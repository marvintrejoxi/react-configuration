import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Row, Col, Input, Select } from 'antd';
import UsersFilter from '../components/UsersFilter';
import TableView from '../components/TableView'
const InputGroup = Input.Group;
const Option = Select.Option;

class Consolidateds extends Component {

  state = {
    priorityAssignmentsCount: 0,
    approvedAssignmentsCount: 0,
    pendingAssignmentsCount: 0,
    usersList: [],
    data: []
  }

  fetchPriorityAssignments() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    
    Axios({
      method: 'get',
      url: `${baseUrl}assignments/status_count`,
      headers: { Authorization: token },
      params: { status: 'inmediate'}
    }).then(jsonresponse => {
      this.setState({ priorityAssignmentsCount: jsonresponse.data });
    }).catch(error => {
      this.setState({ priorityAssignmentsCount: 0 })
    });
  }

  fetchApprovedAssignments() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    
    Axios({
      method: 'get',
      url: `${baseUrl}assignments/status_count`,
      headers: { Authorization: token },
      params: { status: 'approved'}
    }).then(jsonresponse => {
      this.setState({ approvedAssignmentsCount: jsonresponse.data });
    }).catch(error => {
      this.setState({ approvedAssignmentsCount: 0 })
    });
  }

  fetchPendingAssignments() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    
    Axios({
      method: 'get',
      url: `${baseUrl}assignments/status_count`,
      headers: { Authorization: token },
      params: { status: 'pending'}
    }).then(jsonresponse => {
      this.setState({ pendingAssignmentsCount: jsonresponse.data });
    }).catch(error => {
      this.setState({ pendingAssignmentsCount: 0 })
    });
  }

  fetchUsersForFilter() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    
    Axios({
      method: 'get',
      url: `${baseUrl}employees`,
      headers: { Authorization: token }
    }).then(jsonresponse => {
      this.setState({ usersList: jsonresponse.data });
    }).catch(error => {
      this.setState({ usersList: [] })
    });
  }

  fetchAssignments() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    
    Axios({
      method: 'get',
      url: `${baseUrl}assignments`,
      headers: { Authorization: token }
    }).then(jsonresponse => {
      this.setState({ data: jsonresponse.data });
    }).catch(error => {
      this.setState({ data: [] })
    });
  }

  prioritizeAccount = (account_id, employee_id, handleError, handleSuccess) => {
    console.log(employee_id)
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    let data = new FormData();

    data.append('employee_id', employee_id);

    Axios({
      method: 'patch',
      url: `${baseUrl}accounts/${account_id}/prioritize`,
      headers: { Authorization: token },
      data: data
    }).then(jsonresponse => {
      handleSuccess() 
      this.setState({ priorityAssignmentsCount: this.state.priorityAssignmentsCount+1 });
      this.fetchAssignments();
    }).catch(error => {
      handleError()
      console.log(error)
    })
  }

  componentWillMount() {
    this.fetchPriorityAssignments();
    this.fetchApprovedAssignments();
    this.fetchPendingAssignments();
    this.fetchUsersForFilter();
    this.fetchAssignments();
  }

  render(){
    return(
      <section>
        <Row type='flex' align='bottom' gutter={16}>
          <Col span={12} xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <div 
              className='panel red'
            >
              <span>{this.state.priorityAssignmentsCount}</span>
              Solicitudes prioritarias
            </div>
          </Col>
          <Col span={12} xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <div 
              className='panel white color-gray'
            >
              <span>{this.state.approvedAssignmentsCount}</span>
              Solicitudes activas
            </div>
          </Col>
          <Col span={12} xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <div 
              className='panel white color-gray'
            >
              <span>{this.state.pendingAssignmentsCount}</span>
              Solicitudes pendiente
            </div>
          </Col>
        </Row>
        <br />
        <Row type='flex' align='middle' className='ConsolidatedsFilters'>
          <Col span={24} xs={24} sm={8} md={8} lg={6} xl={4} xxl={4}>
            <InputGroup compact size='large' className=''>
              <UsersFilter dataSource={this.state.usersList} />
            </InputGroup>
          </Col>
          <Col span={24} xs={24} sm={8} md={8} lg={6} xl={4} xxl={4}>
            <InputGroup compact size='large' className=''>
                <Select defaultValue='Estado' size='large' className='selectStatus'>
                  <Option value='pending'>Pendientes</Option>
                  <Option value='approved'>Aprobadas</Option>
                  <Option value='assigned'>Asignadas</Option>
                  <Option value='normal'>Normal</Option>
                  <Option value='inmediate'>Prioridad</Option>
                </Select>
            </InputGroup>
          </Col>
          <Col span={24} xs={24} sm={8} md={8} lg={12} xl={16} xxl={16} align='right'>
            <InputGroup compact size='large' className=''>
              <Select defaultValue='Más recientes' size='large'className='selectRecent'>
                <Option value='asc'>ASC</Option>
                <Option value='desc'>DESC</Option>
              </Select>
            </InputGroup>
          </Col>
        </Row>
        <br />
        <Row type='flex' align='middle'>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
            <TableView 
              dataSource={this.state.data} 
              onPrioritizeAccount={this.prioritizeAccount}
            />
          </Col>
        </Row>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    baseUrl: state.data.baseUrl,
    auth: {
      ...state.data.auth
    }
  }
}

export default withRouter(connect(mapStateToProps)(Consolidateds));