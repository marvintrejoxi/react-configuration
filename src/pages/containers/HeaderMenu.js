import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { destroySession } from '../../actions';
import { Menu, Button, Icon } from 'antd';
const MenuItem = Menu.Item;

class HeaderMenu extends Component {
  state = {
    current: '/',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  handleClickLogout = (e) => {
    this.props.destroySession();
    this.props.history.push('/admin/sign_in');
  }

  render() {
    if (this.props.showHeaderMenu) {
      return(
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode='horizontal'
          className='HeaderMenu'
        >
          <MenuItem key='/'>
            <NavLink to='/'>En proceso</NavLink>
          </MenuItem>
          <MenuItem key='/consolidateds'>
            <NavLink to='/consolidateds'>Consolidados</NavLink>
          </MenuItem>
          <MenuItem key='/assignments'>
            <NavLink to='/assignments'>Mis asignaciones</NavLink>
          </MenuItem>
          <MenuItem key='/logout' className='HeaderMenuBtnLogout'>
            <Button 
              icon='poweroff' 
              className='' 
              onClick={this.handleClickLogout}
            >
              SALIR
            </Button>
          </MenuItem>
        </Menu>
      )
    }else{
      if(this.props.backButton) {
        return(
          <Menu
            mode='horizontal'
            className='backMenu'
          >
            <MenuItem key={this.props.backButton.url} className='backButton'>
              <NavLink to={this.props.backButton.url}>
                <Icon type='arrow-left' />
              </NavLink>
            </MenuItem>
            <MenuItem key='/' className='textBackButton'>
              <NavLink to={this.props.backButton.url}>
                {this.props.backButton.message}
              </NavLink>
            </MenuItem>
          </Menu>
        )
      } else {
        return(
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode='horizontal'
          >
            <MenuItem key='/logout' className='HeaderMenuBtnLogout'>
              <Button 
                icon='poweroff' 
                className='' 
                onClick={this.handleClickLogout}
              >
                SALIR
              </Button>
            </MenuItem>
          </Menu>
        )
      }
    }
  }
}

export default withRouter(connect(null, { destroySession })(HeaderMenu));