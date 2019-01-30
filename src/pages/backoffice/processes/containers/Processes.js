import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Row, Col, Input, Icon } from 'antd';
import ProcessView from '../components/ProcessView';

class Processes extends Component {
  state = {
    data: [],
    backlogAssignmentsCount: 0
  }

  fetchBacklogAssignments() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;

    Axios({
      method: 'get',
      url: `${baseUrl}assignments/status_count`,
      headers: { Authorization: token },
      params: { status: 'pending' }
    }).then(jsonresponse => {
      this.setState({ backlogAssignmentsCount: jsonresponse.data });
    }).catch(error => {
      this.setState({ backlogAssignmentsCount: 0 });
    });
  }

  fetchProcesses() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;

    Axios({
      method: 'get',
      url: `${baseUrl}assignments/processing`,
      headers: { Authorization: token }
    }).then(jsonresponse => {
      this.setState({ data: jsonresponse.data });
    }).catch(error => {
      this.setState({ data: [] });
    });
  }

  componentWillMount() {
    this.fetchProcesses();
    this.fetchBacklogAssignments();
  }

  render(){
    return(
      <section>
        <Row type="flex" align='bottom' gutter={16}>
          <Col span={12} xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <div 
              className={`panel ${ this.state.backlogAssignmentsCount > 0 ? 'red' : 'white' }`}
            >
              <span>{this.state.backlogAssignmentsCount}</span>
              Solicitudes atrasadas
            </div>
          </Col>
          <Col 
            span={12} 
            xs={12} 
            sm={12} 
            md={16} 
            lg={18} 
            xl={18} 
            xxl={18}
          >
            <div className='ProcessesSearch'>
              <Input 
                prefix={<Icon type='search' />} 
                placeholder='Buscar Ejecutivo' 
                type='text' 
                size='large' 
              />
            </div>
          </Col>
        </Row>
        <br />
        <ProcessView dataSource={this.state.data}/>
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

export default withRouter(connect(mapStateToProps)(Processes));