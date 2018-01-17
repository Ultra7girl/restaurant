import React from 'react'

import { connect } from 'react-redux'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link, Router } from '../routes'

function CheckBillPage({ data, orderList, checkBill }) {
  //   const { loading } = data
  // console.log('order list =>', orderList)

  // if (loading === true) return 'Loading...'

  const total = orderList.length
  const totalPrice = orderList.reduce((prev, item) => {
    return prev + item.price * item.amount
  }, 0)

  return (
    <div>
      <style jsx>{`
        header {
          text-align: center;
        }
        a {
          color: #666;
          text-decoration: none;
        }
        .main-left {
          width: 70%;
          float: left;
        }
        .main-right {
          width: 30%;
          float: left;
        }
        .box {
          width: 30%;
          float: left;
          cursor: pointer;
        }
        .clearFix {
          clear: both;
        }
      `}</style>
      <Head>
        <title>Restaurant </title>
      </Head>
      <div className="container">
        <p>Number of Orders: {total}</p>
        <p>Total Price: {totalPrice}</p>
        <div>
          <button onClick={checkBill}>Close</button>
        </div>
      </div>
    </div>
  )
}

class CheckBillContrainer extends React.Component {
  checkBill = () => {
    this.props.dispatch({
      type: 'CHECK_BILL'
    })
    Router.pushRoute('home')
  }
  render() {
    return (
      <CheckBillPage
        data={this.props.data}
        orderList={this.props.orderList}
        checkBill={this.checkBill}
      />
    )
  }
}

function stateSelecter(state) {
  return { orderList: state.orderList }
}

export default compose(page, connect(stateSelecter))(CheckBillContrainer)
