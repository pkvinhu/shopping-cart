import React, { Component } from 'react'
import { Grid, Paper, Typography, Button, ButtonBase, Icon } from '@material-ui/core'
import { connect } from 'react-redux'
import { increment, decrement, clear, _createOrder, _createLineItem } from '../store'

class Product extends Component {
  constructor(props){
  	super(props)
  	this.state={ 
  		disable: true,
  		count: 0
  	}
  	/*this.handleSubmit = this.handleSubmit.bind(this)*/
  	this.incrementPro = this.incrementPro.bind(this)
  	this.decrementPro = this.decrementPro.bind(this)
  }

  /*handleSubmit(e, edit, product){
  	const { increment, decrement } = this.props;
  	console.log(e.target.name, e.target.value)
  	if(edit === 'increment') {increment(product)}
  	else if(edit === 'decrement') {decrement(product)}
  }*/

  incrementPro(product){
  	const { increment, lineItems, _createOrder, currentOrder, _createLineItem } = this.props;
  	const ids = lineItems.reduce((acc, each)=>{return [...acc, each.productId]}, []);
  	if(!lineItems.length){
  	  _createOrder()
  	  	.then(()=>{
  	  	console.log('Product: ', product, ' Current: ', currentOrder, ' LineItems: ', lineItems)
  	    increment()
        _createLineItem(product, this.props.currentOrder)
        })
  	}
  	else if(lineItems && !ids.includes(product.id)) {
  		console.log(ids)
  	  _createLineItem(product, this.props.currentOrder)
  	  increment()  	  
  	}
  	else {
  	  increment()
  	}
  	this.setState({ disable: false, count: this.state.count+1 })
  }

  decrementPro(product){
  	this.props.decrement()
  	this.state.count <= 1 ?
  	this.setState({ count: this.state.count-1, disable: true }) :
  	this.setState({ count: this.state.count-1 })
  }

  componentDidMount(){
  	//const { product } = this.props;
  	if(this.state.count === 0){
  	  this.setState({ disable: true })
  	}
  }

  componentWillUnmount(){
  	this.props.clear()
  }

  render() {
  	const { product, items, increment, decrement, currentOrder } = this.props;
  	const { incrementPro, decrementPro } = this;
  	const name = product.name;
  	/*let disable = !items || items[name] !== undefined;*/
  	console.log('This is the current order: ', currentOrder)

  	return (
  	  <Grid item sm={3} style={{ padding: '25px'}} >
	    <Paper style={{ height: '150px', padding: '10px'}} >
	       	<Typography variant='h4' >{product.name}</Typography>
	       	<Button variant='fab' 
	       			color='primary' 
	       			style={{ margin: '2px'}}
	       			name='increment'
	       			onClick={()=>incrementPro(product)}
	       			value={name}>
	          <Icon>add</Icon>
	        </Button>
	        <Button disabled={this.state.disable} 
	        		variant='fab' 
	        		color='secondary' 
	        		style={{ margin: '2px'}}
	       			name='decrement'
	       			onClick={()=>decrementPro(product)}
	       			value={name}>
	          <Icon>remove</Icon>
	        </Button>
	        <Typography variant='body1' 
	                    color='inherit'
	                    style={{ position: 'relative', float: 'right'}}>{this.state.disable !== true ? 
	                    	             this.state.count + ' Selected!' : 
	                    	             'None Selected!'}</Typography>
       	</Paper>
      </Grid>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { lineItems, current } = state
  return {
  	product: ownProps.product,
  	lineItems: lineItems,
  	currentOrder: current
  }
}

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  _createOrder: () => dispatch(_createOrder()),
  _createLineItem: (item, currentOrder) => dispatch(_createLineItem(item, currentOrder)),
  clear: () => dispatch(clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)