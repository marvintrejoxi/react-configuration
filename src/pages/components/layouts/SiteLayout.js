import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../../../store';
import { Layout } from 'antd';
import SidebarMenu from '../../containers/SidebarMenu';
import HeaderMenu from '../../containers/HeaderMenu';
const { Header, Content } = Layout;

class SiteLayout extends React.Component {
  render() {
    const Component = this.props.component;
    let options = { ...this.props };
    delete options['component'];

    return (
      <Route {...options} render={matchProps => (
        store.getState().data.auth.authorize ? (
          <Layout className='SiteLayoutContent'>
            <SidebarMenu />
            <Layout>
              <Header className='SiteHeader'>
                <HeaderMenu 
                  showHeaderMenu={this.props.showHeaderMenu} 
                  backButton={this.props.backButton}
                />
              </Header>
              <Content className='Container'>
                <div className='ComponentContent'>
                  <Component {...matchProps} />
                </div>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Redirect to='/admin/sign_in'/>
        )
      )} />
    )
  }  
}

export default SiteLayout;