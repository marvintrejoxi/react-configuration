import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Stores extends Component {
  render(){
    return(
      <section>
        <div>
          Estoy en stores
        </div>
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

export default withRouter(connect(mapStateToProps)(Stores));