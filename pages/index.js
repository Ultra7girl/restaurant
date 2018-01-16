import React from 'react'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function OrderList({ orderlist, removeOrder }) {
  return (
    <ul>
      {orderlist
        .map(function (order) {
          return (
            <OrderItem
              key={order.id}
              order={order}
              removeOrder={removeOrder}
            />
          )
        })}
    </ul>
  )
}

function OrderItem({ order, removeOrder }) {
  return (
    <li>
      <span>{order.title}</span>
      <input
        type="text"
        value={order.amount}
        onChange={amountOrderchange(this, order.amount)}
      />
      <button onClick={removeOrder(order.id)}>
        X
      </button>
    </li>
  )
}

function HomePage({ data, orderlist, handleOrder, removeOrder }) {
  // console.log('data', data)
  const { loading, postMenuIndex } = data

  if (loading === true) return 'Loading...'
  return (
    <div>
      <Head>
        <title>Restaurant </title>
      </Head>
      <style jsx>{`
				header {
					text-align: center;
				}
				a {
					color: #666;
					text-decoration: none;
				}
				.box {
					width: 30%;
					float: left;
					cursor: pointer;
				}
				.main-left {
					width: 70%;
					float: left;
				}
				.main-right {
					width: 30%;
					float: left;
				}
				.container {
					border-right: 1px solid grey;
				}
				.clearFix {
					clear: both;
				}
			`}</style>
      <div className="container">
        <div className="main-left">
          {postMenuIndex.map(function (menus) {
            return (
              <div key={menus.id} className="box">
                <Link route="item" params={{ id: menus.id }}>
                  <div>
                    <br />
                    <img
                      width="180"
                      height="150"
                      src={`/static/images/menus/${menus.images}`}
                    />
                    <br />
                    <a>{menus.name}</a>
                    <br />
                    {menus.price}.- <br />
                    <br />
                  </div>
                </Link>
                <button value={menus.id} onClick={handleOrder.bind(null, menus)}>Order</button>
              </div>
            )
          })}
          <div className="clearFix" />
        </div>
        <div className="main-right">
          <OrderList
            orderlist={orderlist}
            removeOrder={removeOrder}
          />
        </div>
      </div>
    </div>
  )
}

class OrderContrainer extends React.Component {

  state = {
    orderlist: []
  }

  amountOrderchange = id => () => {
    this.setState({
      orderlist: this.state.orderlist.filter(function (order) {
        if (order.id !== id) {
          1
        }
      })
    })
  }

  removeOrder = id => () => {
    this.setState({
      orderlist: this.state.orderlist.filter(function (order) {
        return order.id !== id
      })
    })
  }

  handleOrder = menu => {
    let x = true
    this.state.orderlist.map(function (order) {
      if (order.id === menu.id) {
        return x = false
      }
    })
    if (x === true) {
      this.setState({

        orderlist: this.state.orderlist.concat([
          {
            id: menu.id,
            title: menu.name,
            price: menu.price,
            amount: 1
          }
        ])
      })
    }
  }

  render() {
    return (
      <HomePage
        data={this.props.data}
        orderlist={this.state.orderlist}
        handleOrder={this.handleOrder}
        removeOrder={this.removeOrder}
      />
    )
  }
}

const QUERY_POSTS = gql`
	query {
		postMenuIndex(first: 20) {
			id
			categoryId
			images
			name
			price
    }
    
	}
`

export default compose(page, graphql(QUERY_POSTS))(OrderContrainer)
