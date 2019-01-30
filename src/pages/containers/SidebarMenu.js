import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import Logo from '../../images/logo.png';

const { Sider } = Layout;

class SidebarMenu extends Component {
  render() {
    return(
      <Sider
        breakpoint='md'
        className='SidebarMenu'
      >
        <NavLink to='/'>
          <div className='SidebarMenuLogo'>
            <img src={Logo} alt='DataPaga logo' width='60%' />
          </div>
        </NavLink>
        <Menu theme='light' mode='inline'>
          <Menu.Item key='1'>
            <NavLink to='/'>
              <Icon type='home' />
              <span className='nav-text'>Inicio</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='2'>
            <NavLink to='/stores'>
              <Icon type='shop' />
              <span className='nav-text'>Tiendas</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='3'>
            <NavLink to='/users'>
              <Icon type='user' />
              <span className='nav-text'>Usuarios</span>
            </NavLink>
          </Menu.Item>
        </Menu>
        <div className='Copyright'>
          Copyright ©
          <br />
          Techlatam 2018
        </div>
      </Sider>
    )
  }
}

export default withRouter(SidebarMenu);