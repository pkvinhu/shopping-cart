import React, { Component } from 'react'
import { Grid, Paper, Typography, Button, Icon } from '@material-ui/core'
import { connect } from 'react-redux'

class Product extends Component {
  constructor(props){
  	super(props)

  }
  render() {
  	const {name} = this.props;
  	return (
  	  <Grid item sm={3} style={{ padding: '25px'}}>
	    <Paper style={{ height: '150px', padding: '10px'}}>
	       	<Typography variant='h4'>{name}</Typography>
	       	<Button variant='fab' color='primary' style={{ margin: '2px'}}>
	          <Icon>add</Icon>
	        </Button>
	        <Button disabled={true} variant='fab' color='secondary' style={{ margin: '2px'}}>
	          <Icon>remove</Icon>
	        </Button>
       	</Paper>
      </Grid>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  
  return {
  	name: ownProps.name
  }
}

export default connect(mapStateToProps)(Product)