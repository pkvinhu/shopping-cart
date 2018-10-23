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
  	const { products, count } = this.props;

  	return (
  	  <div>
  	   <Grid container spacing={16} style={{ padding: '60px'}}>
  	    {products.map(product=> {
  	      return (
  	      	<Product key={product.id} product={product}/>
  	      )
  	    })}
  	    </Grid>
  	    <Button disabled={!count ? true : false}><Icon>shopping-cart-plus</Icon>{' CREATE'}</Button>
  	  </div>
  	)
  }
}

const mapStateToProps = state => {
  const { products, count } = state
  return {
  	products: products,
  	count: count
  }
}

const mapDispatchToProps = dispatch => ({
  _loadProducts: () => dispatch(_loadProducts())	
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)