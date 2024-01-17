import React, { Component } from 'react'
import loading from './loading.gif'

export default class spinner extends Component {
  render() {
    return (
      <div>
        <img className='container d-flex justify-content-center my-3' src={loading} alt="loading" style={{height: "25px", width: "50px"}}/>
      </div>
    )
  }
}
