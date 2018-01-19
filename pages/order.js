import React from 'react'

import { connect } from 'react-redux'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function OrderPage({ data, orderList }) {
  //   const { loading } = data
  //   console.log('order list =>', orderList)

  //   if (loading === true) return 'Loading...'
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
        .container{
          width:983px;
          height:650px;          
          border-left: 1px solid grey;
          border-right: 1px solid grey;
        }
        .box {
          width: 30%;
          float: left;
          cursor: pointer;
        }
        .clearFix {
          clear: both;
        }

        .btn {
        
        -webkit-border-radius: 3;
        -moz-border-radius: 3;
        border-radius: 3px;
        font-family: Arial;
        color: #11111;
        font-size: 15px;
        padding: 5px 10px 5px 11px;
        text-decoration: none;
      }
      
      .btn:hover {
        background: #11111;
        text-decoration: none;
        cursor:pointer;
      }

      .greyGridTable {
        border: 2px solid #FFFFFF;
        width: 750px;
        text-align: center;
        border-collapse: collapse;
        align:center;
      }
      .greyGridTable td, .greyGridTable th {
        border: 1px solid #FFFFFF;
        padding: 3px 4px;
      }
      .greyGridTable tbody td {
        font-size: 13px;
      }
      .greyGridTable td:nth-child(even) {
        background: #EBEBEB;
      }
      .greyGridTable thead {
        background: #FFFFFF;
        border-bottom: 4px solid #333333;
      }
      .greyGridTable thead th {
        font-size: 15px;
        font-weight: bold;
        color: #333333;
        text-align: center;
        border-left: 2px solid #333333;
      }
      .greyGridTable thead th:first-child {
        border-left: none;
      }
      
      .greyGridTable tfoot {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        border-top: 4px solid #333333;
      }
      .greyGridTable tfoot td {
        font-size: 14px;
        text-align: right;
      }
      `}</style>
      <Head>
        <title>Restaurant </title>
      </Head>
      <br />
      <div className="container">
        <br /><br /><center>
          <table className="greyGridTable" >
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="4">
                  <Link route="home">
                    <button className="btn">Back</button>
                  </Link>
                  <Link route="checkbill">
                    <button className="btn">Check Bill</button>
                  </Link>
                </td>
              </tr>
            </tfoot>
            {orderList.map(function (list, i = 1) {
              {
                return (
                  <tr key={list.id}>
                    <td>{i += 1}</td>
                    <td>{list.name}</td>
                    <td>{list.amount}</td>
                    <td>{list.price}</td>
                  </tr>
                )
              }
            })}

          </table>
        </center>
      </div>
    </div>
  )
}

class OrderContrainer extends React.Component {
  render() {
    return <OrderPage data={this.props.data} orderList={this.props.orderList} />
  }
}

function stateSelecter(state) {
  return { orderList: state.orderList }
}

export default compose(page, connect(stateSelecter))(OrderContrainer)
