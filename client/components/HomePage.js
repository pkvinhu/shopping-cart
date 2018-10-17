import React, { Component, Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import { Typography, Paper, Tabs, Tab, Icon, TabContainer } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Cart from './Cart'
import Orders from './Orders'
import Home from './Home'


export default class HomePage extends Component {
  constructor(){
  	super()
  	this.state = {
  	  time: new Date(),
  	  value: 0
  	}
  	this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value){
  	this.setState({ value })
  }

  componentDidMount(){
  	this.timerID = setInterval(
  		()=>this.tick(), 1000
  	)
  }

  compnentWillUnmount(){
  	clearInterval(this.timerID)
  }

  tick(){
  	this.setState({time: new Date()})
  }

  render(){
  	const { value } = this.state;
  	return (
  	<div>
  	  <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
  	    <Typography variant='display3' color='inherit'>PRODUCTS AHOY</Typography>
  	      <Typography variant='display3' color='secondary'>{this.state.time.toLocaleTimeString()}</Typography>
  	  </div>
  	  <Paper>
  	    <Tabs style={{flexGrow: 1}}
  	    	  value={value}
              onChange={this.handleChange}
              textColor="inherit"
              fullWidth
              indicatorColor='secondary'
              centered
              >	
          <Tab component={Link} 
          	   to='/home'
          	   style={{textAlign: 'center'}} 
          	   icon={<HomeIcon/>} 
          	   label='Home'></Tab>
          <Tab component={Link} 
          	   to='/cart'
          	   style={{textAlign: 'center'}} 
          	   icon={<Icon>shopping_cart</Icon>} 
          	   label='Cart'></Tab>
          <Tab component={Link} 
          	   to='/orders'
          	   style={{textAlign: 'center'}} 
          	   icon={<Icon>view_list</Icon>} 
          	   label='Orders'></Tab>
  	    </Tabs>

  	  </Paper>
  	  <div>
  	  	<Route path='/home' component={Home}/>
  	    <Route path='/cart' component={Cart}/>
  	    <Route path='/orders' component={Orders}/>  	    
  	  </div>
  	  </div>
  	)
  }
}