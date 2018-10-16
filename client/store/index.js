import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import axios from 'axios'

// INITIAL STATE
const initialState = {
  products: [],
  items: {},
  orders: []
}

// ACTION CONSTANTS
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ORDERS = 'GET_ORDERS'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

// ACTION CREATORS
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export  const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const increment = product => ({
  type: INCREMENT,
  product
})

export const decrement = product => ({
  type: DECREMENT,
  product
})

// THUNK CREATORS
export const _loadProducts = () => async dispatch => {
  const response = await axios.get('/api/products')
  const products = response.data
  const action = getProducts(products)
  dispatch(action)
}

export const _loadOrders = () => async dispatch => {
  const response = await axios.get('/api/orders')
  const orders = response.data
  const action = getOrders(orders)
  dispatch(action)
}

// REDUCER
const reducer = (state=initialState, action)=> {
	switch(action.type){
	  case GET_PRODUCTS:
	    return {
	      ...state, 
	      products: action.products
	    }

	  case GET_ORDERS:
	    return {
	      ...state,
	      orders: action.orders
	    }

	  case INCREMENT:
	  return state.items.action.product ?
	    {
	      ...state,
	      items: {...state.items, [action.product]: state.action.product+1}
	    } :
	    {
	      ...state,
	      items: {...state.items, [action.product]: 1}
	    }

	  case DECREMENT:
	    return {
	      ...state,
	      items: {...state.items, [action.product]: state.action.product-1}
	    }


	  default:
	    return state
	}
}

export default createStore(reducer, applyMiddleware(loggingMiddleware, thunk))