import React, { Component } from 'react'
import { Tr, Td } from 'react-super-responsive-table';
import { Button } from 'antd';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import PrioritizeModal from './PrioritizeModal';

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClass: props.priority === 'inmediate' ? 'priorityAccount' : '',
      buttonIcon: props.priority === 'inmediate' ? 'exclamation' : '',
      disableButton: props.priority === 'inmediate' ? true : false,
      visible: false
    }
  }

  handleOpenModal = () => {
    this.setState({ visible: true })
  }

  handleSuccess = () => {
    this.setState({
      buttonClass: 'priorityAccount',
      buttonIcon: 'exclamation',
      visible: false
    })
  }

  handleError = () => {
    console.log('errror')
  }

  render() {
    let statusName;
    switch (this.props.status) {
      case 'pending':
        statusName = 'Pendiente';
        break;
      case 'assigned':
        statusName = 'Asignado';
        break;
      case 'approved':
        statusName = 'Aprobado';
        break;
      default:
        break;
    }
    return(
      <Tr>
        <PrioritizeModal 
          visible={this.state.visible} 
          onPrioritizeAccount={(employee_id)=> this.props.onPrioritizeAccount(this.props.account_id, employee_id, this.handleError, this.handleSuccess)}
          requestNumber={this.props.id}
          accountName={this.props.account_name}
        />
        <Td>
          <Button 
            shape="circle" 
            icon={this.state.buttonIcon}
            onClick={this.handleOpenModal}
            className={this.state.buttonClass}
            disabled={this.state.disableButton}
            type='default'
          />
        </Td>
        <Td>{this.props.created_at}</Td>
        <Td>{this.props.account_name}</Td>
        <Td>{this.props.attendant}</Td>
        <Td>{this.props.employee_name}</Td>
        <Td>
          <span>{statusName}</span>
        </Td>
      </Tr>
    )
  }
}

export default Item;