import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import { Modal, Form, Select, Button } from 'antd';
const FormItem = Form.Item
const Option = Select.Option;

class PrioritizeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
      optionsForSelectEmployees: [],
      employee_id: ''
    }
  }

  fetchEmployees() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;
    
    Axios({
      method: 'get',
      url: `${baseUrl}employees`,
      headers: { Authorization: token }
    }).then(jsonresponse => {
      let options = jsonresponse.data.map((item, index) => {
        return(
          <Option key={index} value={item.id}>{item.name}</Option>
        )
      });

      this.setState({ optionsForSelectEmployees: options });
    }).catch(error => {
      this.setState({ optionsForSelectEmployees: [] })
    });
  }

  handleCancel = (e) => {
    this.setState({ visible: false });
  }

  handleChange = (e) => {
    this.setState({ employee_id: e })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onPrioritizeAccount(this.state.employee_id)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchEmployees();
    this.setState({ visible: nextProps.visible });
  }

  render() {
    return(
      <Modal 
        title=''
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={null}
        className='modalAssignments'
      >
        <div className='requestNumber'>
          Solicitud <span>Nº {this.props.requestNumber}</span>
        </div>
        <div className='accountName'>
          {this.props.accountName}
          <br />
          <small>Nombre de la tienda</small>
        </div>
        <Form layout='inline' onSubmit={this.handleSubmit} className='PriotitizeForm'>
          <FormItem>
            <Select
              showSearch
              placeholder='No asignado'
              optionFilterProp='children'
              onChange={this.handleChange}
              name='employee_id'
              className='PrioritizeFormSelect'
            >
              {this.state.optionsForSelectEmployees}
            </Select>
          </FormItem>
          <FormItem>
            <Button htmlType='submit' size='large' className='PrioritizeFormBtnSubmit'>
              Asignar
            </Button>
          </FormItem>
        </Form>
      </Modal>
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

export default withRouter(connect(mapStateToProps)(PrioritizeModal));