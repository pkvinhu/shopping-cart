import React, { Component } from 'react'
import { _loadOrders } from '../store'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

class Orders extends Component {
  
  render(){
  	const { orders } = this.props;
  	return (
  	  <div>
  	  {orders.length ? 
  	   orders.map(order => {
  	   	 return (
  	   	 	<div>
  	   	 	<h1>{order.id}</h1>
  	   	 	<h2>{order.status}</h2>
  	   	 	</div>
  	   	 )
  	   }) :
  	  <Typography style={{ position: 'absolute', bottom: '0', right: '0', float: 'right' }} variant='display2' color='secondary'>You currently have no orders!</Typography>
  	  }
  	  </div>
  	)
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  _loadOrders: () => dispatch(_loadOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)