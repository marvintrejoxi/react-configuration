import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Axios from 'axios';
import TableView from '../components/TableView';
import { Input, Icon, Row, Col } from 'antd';

class Users extends Component {
  state = {
    data: []
  }

  fetchUsers() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;

    Axios({
      method: 'get',
      url: `${baseUrl}employees`,
      headers: { Authorization: token }
    }).then(jsonresponse => {
      this.setState({ data: jsonresponse.data });
    }).catch(error =>{
      this.setState({ data: [] });
    });
  }

  componentDidMount(){
    this.fetchUsers();
  }

  render(){
    return(
      <section>
        <Row gutter={18}>
          <Col 
            span={20} 
            xs={12} 
            sm={12} 
            md={16} 
            lg={18} 
            xl={20} 
            xxl={20}
          >
            <div className='UsersSearch'>
              <Input 
                prefix={<Icon type='search' />} 
                placeholder='Buscar Ejecutivo' 
                type='text' 
                size='large' 
              />
            </div>
          </Col>
          <Col 
            span={4} 
            xs={12} 
            sm={12} 
            md={8} 
            lg={6} 
            xl={4} 
            xxl={4}
          >
            <div className='UsersAddNew'>
              <NavLink to='/users/new'>
                <Icon type='plus' />
                Nuevo usuario
              </NavLink>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col 
            span={24} 
            xs={24} 
            sm={24} 
            md={24} 
            lg={24} 
            xl={24} 
            xxl={24}
          >
            <TableView dataSource={this.state.data} />
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

export default withRouter(connect(mapStateToProps)(Users));