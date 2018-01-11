import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function HomePage({ data }) {
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

        }
        .clearFix {
          clear: both;
        }
      `}</style>
      <div>
        <div>
          {postMenuIndex.map(function (menus) {
            return (
              <div key={menus.id} className="box">
                <div>
                  <img width="200" height="200" src={`/static/images/menus/${menus.images}`} />
                </div>

                <Link route="menu" params={{ id: menus.id }}>
                  <a>{menus.name}</a>
                </Link>
                <br />ราคา {menus.price} บาท
              </div>
            )
          })}
          <div className="clearFix"></div>
        </div>

        <div />
      </div>
    </div>
  )
}

const QUERY_POSTS = gql`
  query {
    postMenuIndex(first: 20) {
      id
      categoryId
      images
      name
      price
      rating {
        one
        two
        three
        four
        five
      }
    }
  }
`

export default compose(page, graphql(QUERY_POSTS))(HomePage)
