import React from 'react'

import { connect } from 'react-redux'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function ItemPage({ data, orderList, addOrder }) {
  const { loading, postMenu } = data

  if (loading === true) return 'Loading...'
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
          height:1600px;          
          border-left: 1px solid grey;
          border-right: 1px solid grey;
          
        }
        .main-left {
          width: 68%;
          height: 1600px;
          float: left;
          border-right: 1px solid grey;
          text-align:center;
        }
        .main-right {
          width: 28%;
          height: 1600px;
          float: left;
        }
        .box {
          width: 100%;
          float: left;
          cursor: pointer;
          text-align:left;
        }
        .clearFix {
          clear: both;
        }

        .rating {
          float: left;
        }

        /* :not(:checked) is a filter, so that browsers that don’t support :checked don’t 
					follow these rules. Every browser that supports :checked also supports :not(), so
					it doesn’t make the test unnecessarily selective */
        .rating:not(:checked) > input {
          position: absolute;
          top: -9999px;
          clip: rect(0, 0, 0, 0);
        }

        .rating:not(:checked) > label {
          float: right;
          width: 1em;
          padding: 0 0.1em;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          font-size: 200%;
          line-height: 1.2;
          color: #ddd;
          text-shadow: 1px 1px #bbb, 2px 2px #666,
            0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
        }

        .rating:not(:checked) > label:before {
          content: '★ ';
        }

        .rating > input:checked ~ label {
          color: #f70;
          text-shadow: 1px 1px #c60, 2px 2px #940,
            0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
        }

        .rating:not(:checked) > label:hover,
        .rating:not(:checked) > label:hover ~ label {
          color: gold;
          text-shadow: 1px 1px goldenrod, 2px 2px #b57340,
            0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
        }

        .rating > input:checked + label:hover,
        .rating > input:checked + label:hover ~ label,
        .rating > input:checked ~ label:hover,
        .rating > input:checked ~ label:hover ~ label,
        .rating > label:hover ~ input:checked ~ label {
          color: #ea0;
          text-shadow: 1px 1px goldenrod, 2px 2px #b57340,
            0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
        }

        .rating > label:active {
          position: relative;
          top: 2px;
          left: 2px;
        }

        .order-list{
          width: 90%;
          float: left;
          text-align:left;
        }
        .order-list span p {
          font-size: 15px;
        }

        .order-list-num{
          width: 7%;
          float: right;
          text-align:center;
        }
        .order-list-num span p {
          font-size: 15px;
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
        h2{
          text-decoration: underline;
        }
      `}</style>
      <Head>
        <title>Restaurant </title>
      </Head>
      <br />
      <div className="container">
        {postMenu.map(function (item) {
          return (
            <div key={item.id}>
              <div className="main-left">

                <div className="box">
                  <div>
                    <img
                      width="550"
                      height="500"
                      src={`../static/images/menus/${item.images}`}
                    />
                  </div>
                  <p>
                    <div className="rating">
                      <input
                        type="radio"
                        id="star5"
                        checked={item.rating.avgRating == 5}
                        name="rating"
                        value="5"
                      />
                      <label htmlFor="star5" title="Rocks!">
                        5 stars
                      </label>
                      <input
                        type="radio"
                        id="star4"
                        checked={item.rating.avgRating == 4}
                        name="rating"
                        value="4"
                      />
                      <label htmlFor="star4" title="Pretty good">
                        4 stars
                      </label>
                      <input
                        type="radio"
                        id="star3"
                        checked={item.rating.avgRating == 3}
                        name="rating"
                        value="3"
                      />
                      <label htmlFor="star3" title="Meh">
                        3 stars
                      </label>
                      <input
                        type="radio"
                        id="star2"
                        checked={item.rating.avgRating == 2}
                        name="rating"
                        value="2"
                      />
                      <label htmlFor="star2" title="Kinda bad">
                        2 stars
                      </label>
                      <input
                        type="radio"
                        id="star1"
                        checked={item.rating.avgRating == 1}
                        name="rating"
                        value="1"
                      />
                      <label htmlFor="star1" title="Sucks big time">
                        1 star
                      </label>

                    </div>

                  </p>
                  <br />
                  <br />
                  <br />
                  <div>
                    <p>({item.rating.totalRating} Ratings)</p>
                    <p>
                      <h2>{item.name}</h2>
                    </p>
                    <p>ราคา {item.price}.-</p>
                    <button onClick={addOrder.bind(null, item)} className="btn">Order</button>
                  </div>


                </div>
              </div>
              <div className="main-right">
                <center><h2>Reviews</h2></center>
                <div>
                  {item.relateComments.map(function (comments) {
                    {
                      return <p key={comments.id}>&nbsp;&nbsp;{comments.body}</p>
                    }
                  })}
                </div>
                <center><h2>My Orders</h2></center>
                <div>

                  {orderList.map(function (list) {
                    {
                      return (
                        <div key={list.id}>
                          <div className="order-list">
                            <span><p> &nbsp;{list.name}</p></span>
                          </div>
                          <div className="order-list-num">
                            <span><p>{list.amount}</p></span>
                          </div>
                        </div>
                      )
                    }
                  })}
                  <br />
                  <center>
                    <Link route="order">
                      <button className="btn" >Order Now</button>
                    </Link>
                    <Link route="checkbill">
                      <button className="btn">Check Bill</button>
                    </Link>
                  </center>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

class OrderContrainer extends React.Component {
  addOrder = item => {
    this.props.dispatch({
      type: 'ADD_ORDER',
      item
    })
  }

  render() {
    return (
      <ItemPage
        data={this.props.data}
        orderList={this.props.orderList}
        addOrder={this.addOrder}
      />
    )
  }
}

function stateSelecter(state) {
  return { orderList: state.orderList }
}

const QUERY_POSTS = gql`
  query getMenus($first: Int, $itemId: Int!) {
    postMenu(first: $first, id: $itemId) {
      id
      categoryId
      name
      images
      price
      rating {
        rawRating {
          one
          two
          three
          four
          five
        }
        totalRating
        avgRating
      }
      relateComments {
        id
        body
        menuId
      }
    }
  }
`

export default compose(
  page,
  connect(stateSelecter),
  graphql(QUERY_POSTS, {
    options: ({ url: { query: { id } } }) => ({
      variables: {
        first: 1,
        itemId: id
      }
    })
  })
)(OrderContrainer)
