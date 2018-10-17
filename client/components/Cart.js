import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Icon } from '@material-ui/core'
import faker from 'faker'
import { withStyles } from '@material-ui/core/styles';
import { _loadProducts } from '../store'
import Product from './Product'

class Cart extends Component {
  
  componentDidMount() {
  	this.props._loadProducts()
  }

  render(){
  	const { products, items } = this.props;

  	return (
  	  <div>
  	   <Grid container spacing={12} style={{ padding: '60px'}}>
  	    {products.map(product=> {
  	      return (
  	      	<Product product={product}/>
  	      )
  	    })}
  	    </Grid>
  	    <Button disabled={Object.keys(items).length < 1 || Object.values(items).reduce((acc, curr)=>{return acc+=curr}, 0) === 0 ? true : false}><Icon>shopping-cart-plus</Icon>{' CREATE'}</Button>
  	  </div>
  	)
  }
}

const mapStateToProps = state => {
  const { products, items } = state
  return {
  	products: products,
  	items: items
  }
}

const mapDispatchToProps = dispatch => ({
  _loadProducts: () => dispatch(_loadProducts())	
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)