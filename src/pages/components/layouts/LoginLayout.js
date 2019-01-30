import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../../../store';
import { Row, Col } from 'antd';

const LoginLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      !store.getState().data.auth.authorize ? (
        <div className='LoginLayout'>
          <Row align='middle' justify='center' type='flex'>
            <Col span='24' align='center'>
              <Component {...matchProps} />
            </Col>
            <Col span='24' align='center' className='LoginCopyright'>
              Copyright © Techlatam 2018
            </Col>
          </Row>
        </div>
      ) : (
        <Redirect to='/'/>
      )
    )} />
  )
};

export default LoginLayout;