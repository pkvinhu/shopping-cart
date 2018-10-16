import React, { Component } from 'react'
import { Grid, Paper, Typography, Button, Icon } from '@material-ui/core'
import { connect } from 'react-redux'
import { increment, decrement } from '../store'

class Product extends Component {
  constructor(props){
  	super(props)
  	this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
  	e.preventDefault()
  	const { increment, decrement } = this.props;
  	console.log(e.target.name, e.target.value)
  	if(e.target.name === 'increment') {increment(e.target.value)}
  	else if(e.target.name === 'decrement') {decrement(e.target.value)}
  }

  render() {
  	const { name, items } = this.props;
  	const { handleClick } = this;
  	return (
  	  <Grid item sm={3} style={{ padding: '25px'}} >
	    <Paper style={{ height: '150px', padding: '10px'}} >
	       	<Typography variant='h4' >{name}</Typography>
	       	<Button variant='fab' 
	       			color='primary' 
	       			style={{ margin: '2px'}}
	       			name='increment'
	       			onClick={handleClick}
	       			value={name}>
	          <Icon name='hi' value='hello'>add</Icon>
	        </Button>
	        <Button disabled={(!items || !items.hasOwnProperty(name) || items.name === 0) ? true : false} 
	        		variant='fab' 
	        		color='secondary' 
	        		style={{ margin: '2px'}}
	       			name='decrement'
	       			onClick={handleClick}
	       			value={name}>
	          <Icon>remove</Icon>
	        </Button>
       	</Paper>
      </Grid>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { items } = state.items
  return {
  	name: ownProps.name,
  	items: items
  }
}

const mapDispatchToProps = dispatch => ({
  increment: product => dispatch(increment(product)),
  decrement: product => dispatch(decrement(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)