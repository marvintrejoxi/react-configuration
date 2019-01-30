import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { setAuth } from '../../actions';
import Logo from '../../images/logo.png';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

class Login extends Component {

  state = {
    buttonLoading: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({buttonLoading: true});

    let { baseUrl } = this.props
    let params = new FormData();
    params.append('grant_type', 'password');
    params.append('email', this.state.email);
    params.append('password', this.state.password);
    params.append('scope', 'employee');

    Axios({
      method: 'post',
      url: `${baseUrl}oauth/token`,
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(jsonresponse => {
      let obj = {
        authorize: true,
        token: 'bearer '+jsonresponse.data.access_token
      }
      this.props.setAuth(obj);
      this.setState({buttonLoading: false});
      this.props.history.push('/');
    }).catch(error => {
      this.setState({buttonLoading: false});
    });
  }

  render() {
    return (
      <section className='LoginForm'>
        <Form onSubmit={this.handleSubmit}>
          <div className='LoginFormLogo'>
            <img src={Logo} width='50%' alt='DataPaga logo' />
          </div>
          <FormItem>
            <label 
              htmlFor='email' 
              className='LoginFormLabel'
            >
              Email
            </label>
            <Input 
              type='email'
              name='email'
              id='email'
              className='LoginFormInput'
              onChange={this.handleChange}
            />
          </FormItem>
          <FormItem>
            <label 
              htmlFor='password' 
              className='LoginFormLabel'
            >
              Contraseña
            </label>
            <Input 
              type='password'
              name='password' 
              id='password'
              className='LoginFormInput'
              onChange={this.handleChange}
            />
          </FormItem>
          <FormItem>
            <Button 
              className='LoginFormButtonRed'
              htmlType='submit'
              loading={this.state.buttonLoading}
              shape='circle'
            >
              Ingresar
            </Button>
          </FormItem>
        </Form>
        <Link to='/'>¿No recuerdas tu contraseña?</Link>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    baseUrl: state.data.baseUrl,
  }
}

export default withRouter(connect(mapStateToProps, { setAuth })(Login));