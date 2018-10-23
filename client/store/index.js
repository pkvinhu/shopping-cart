import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import axios from 'axios'

// INITIAL STATE
const initialState = {
  products: [],
  count: 0,
  orders: [],
  current: {},
  lineItems: []
}

// ACTION CONSTANTS
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ORDERS = 'GET_ORDERS'
const ASSIGN_CURRENT = 'ASSIGN_CURRENT'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ORDER = 'DELETE_ORDER'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const RELOAD = 'RELOAD'
const CLEAR = 'CLEAR'

// ACTION CREATORS
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const assignCurrent = order => ({
  type: ASSIGN_CURRENT,
  order
})

export const addItem = item => ({
  type: ADD_ITEM,
  item
})

export const deleteOrder = orderId => ({
  type: DELETE_ORDER,
  orderId
})

export const increment = () => ({
  type: INCREMENT
})

export const decrement = () => ({
  type: DECREMENT
})

export const reload = () => ({
  type: RELOAD
})

export const clear = () => ({
  type: CLEAR
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

export const _createLineItem = (item, currentOrder) => async dispatch => {
  const itemId = item.id;
  const {id} = currentOrder;
  const response = await axios.post(`/api/orders/${id}/lineItems`, {item})
  const newItem = response.data
  console.log('New Item: ', newItem)
  const action = addItem(newItem)
  dispatch(action)
}

export const _createOrder = () => async dispatch => {
  const response = await axios.post('/api/orders')
  const createdOrder = response.data
  const action = assignCurrent(createdOrder)
  dispatch(action)
}

export const _updateOrder = (item, currentOrder) => async dispatch => {
  const itemId = item.id;
  const {id} = currentOrder;
  const response = await axios.put(`/api/orders/${id}/lineItems/${itemId}`)
  // in process
}

export const _deleteOrder = orderId => async dispatch => {
  const response = await axios.delete(`/api/orders/${orderId}`)
  const action = deleteOrder(orderId)
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

	  case ASSIGN_CURRENT:
	    return {
	      ...state,
	      current: action.order
	    }

	  case ADD_ITEM:
	    return {
	      ...state,
	      lineItems: [...state.lineItems, action.item]
	    }

	  case DELETE_ORDER:
	  const newOrders = state.orders.filter(each => each.id != action.orderId)
	    return {
	      ...state,
	      orders: newOrders
	    }

	  case INCREMENT:
	  return {
	      ...state,
	      count: state.count+1
	    } 

	  case DECREMENT:
	    return {
	      ...state,
	      count: state.count-1
	    }

	  case RELOAD:
	    return {
	      ...state
	    }

	  case CLEAR:
	    return {
	      ...state,
	      items: {}
	    }


	  default:
	    return state
	}
}

export default createStore(reducer, applyMiddleware(loggingMiddleware, thunk))