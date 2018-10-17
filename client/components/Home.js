import React, { Component } from 'react'
import { Typography, GridList, GridListTile } from '@material-ui/core'

export default class Home extends Component {
  
  render(){
  	return (
  	  <div style={{ padding: '80px', textAlign: 'center'}}>
  	    <Typography variant='display2' color='textPrimary' centered>Welcome to the Shopping Cart!</Typography>

  	      <img style={{ padding:'40px', width:'40%', height:'40%' }} src='https://www.j2store.org/images/themeparrot/home_page/shopping-cart.png'/>

  	  </div>
  	)
  }
}