import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import TableView from '../components/TableView'

class AssignmentsList extends Component {
  state = {
    data: []
  }

  fetchAssignments() {
    let { baseUrl } = this.props;
    let { token } = this.props.auth;

    Axios({
      method: 'get',
      url: `${baseUrl}employees/assignments`,
      headers: { Authorization: token }
    }).then(jsonresponse => {
      this.setState({ data: jsonresponse.data });
    }).catch(error => {
      this.setState({ data: [] });
    });
  }

  componentWillMount() {
    this.fetchAssignments();
  }

  render(){
    return(
      <section>
        <TableView dataSource={this.state.data} />
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

export default withRouter(connect(mapStateToProps)(AssignmentsList));