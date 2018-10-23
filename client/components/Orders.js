import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { _loadOrders, _deleteOrder } from '../store'
import { connect } from 'react-redux'
import { Typography, SnackbarContent, Button, IconButton, Icon } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

class Orders extends Component {
  constructor(){
  	super()
  	this.deleteOrder = this.deleteOrder.bind(this);
  }

  deleteOrder(orderId){
  	this.props._deleteOrder(orderId)
  }

  componentDidMount(){
  	this.props._loadOrders();
  }

  render(){
  	const { orders } = this.props;
  	const { deleteOrder } = this;

  	return (
  	  <div style={{ padding:'50px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
  	  {orders.length ? 
  	   orders.map(order => {
  	   	 return (
  	   	 	<Fragment>
  	   	 	<form style={{display:'flex'}}>
  	   	 	<SnackbarContent style={{ backgroundColor: 'transparent', 
  	   	 							  color:'black', 
  	   	 							  padding:'10px', 
  	   	 							  justifyContent:'space-between',
  	   	 							  width:'80%'}} 
  	   	 					 key={order.id}
  	   	 				     message={order.id} 
  	   	 				     action={<Button>{order.status}</Button>}/>

  	   	 	<Button component={Link} to='/orders' onClick={()=>deleteOrder(order.id)}>
  	   	 	<Icon>delete_icon</Icon>
  	   	 	</Button>
  	   	 	</form>
  	   	 	</Fragment>
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
  _loadOrders: () => dispatch(_loadOrders()),
  _deleteOrder: orderId => dispatch(_deleteOrder(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)