import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Row, Col, Divider, Button, Form, Input, Radio } from 'antd';
import Roles from '../components/Roles';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class NewUser extends Component {

  state = {
    roles: [],
    btnCreateUserLoading: false
  }

  fetchRoles() {
    let { baseUrl } = this.props
    let { token } = this.props.auth

    Axios({
      method: 'get',
      url: baseUrl+'roles',
      headers: { Authorization: token }
    }).then(jsonresponse => {
      this.setState({ roles: jsonresponse.data });
    }).catch(error => {
      this.setState({ roles: [] });
    });
  }

  componentWillMount(){
    this.fetchRoles();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ btnCreateUserLoading: true });
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    let data = new FormData();

    data.append('role_id', this.state.role_id);
    data.append('name', this.state.name);
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    data.append('password_confirmation', this.state.password_confirmation);

    Axios({
      method: 'post',
      url: `${baseUrl}employees`,
      headers: { Authorization: token },
      data: data
    }).then(jsonresponse => {
      this.setState({ btnCreateUserLoading: false });
      this.props.history.push('/users');
    }).catch(error => {
      this.setState({ btnCreateUserLoading: false });
    });

  }

  render(){
    return(
      <section>
        <Row align='middle' type='flex' justify='center'>
          <Col span={10} align=''>
            <h2 className='NewUserTitle'>Nuevo usuario</h2>
            <Divider />
            <Form onSubmit={this.handleSubmit} layout='vertical' className='NewUserForm'>
              <label
                htmlFor='role_id'
              >
                Tipo de usuario
              </label>
              <FormItem>
                <RadioGroup name='role_id' onChange={this.handleChange} size='large'>
                  <Roles roles={this.state.roles} />
                </RadioGroup>
              </FormItem>
              <label
                htmlFor='name'
              >
                Nombre completo
              </label>
              <FormItem>
                <Input 
                  type='text' 
                  name='name' 
                  id='name' 
                  size='large' 
                  onChange={this.handleChange}
                />
              </FormItem>
              <label
                htmlFor='email'
              >
                Email
              </label>
              <FormItem>
                <Input 
                  type='text' 
                  name='email' 
                  id='email' 
                  size='large' 
                  onChange={this.handleChange}
                />
              </FormItem>
              <label
                htmlFor='password'
              >
                Contraseña
              </label>
              <FormItem>
                <Input 
                  type='password' 
                  name='password' 
                  id='password' 
                  size='large' 
                  onChange={this.handleChange}
                />
              </FormItem>
              <label
                htmlFor='password_confirmation'
              >
                Confirmar Contraseña
              </label>
              <FormItem>
                <Input 
                  type='password' 
                  name='password_confirmation' 
                  id='password_confirmation' 
                  size='large' 
                  onChange={this.handleChange}
                />
              </FormItem>
              <div className='align-center'>
                <Button 
                  htmlType='submit'
                  className='AddUser'
                  loading={this.state.btnCreateUserLoading}
                >
                  Agregar usuario
                </Button>
              </div>
            </Form>
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

export default withRouter(connect(mapStateToProps)(NewUser));