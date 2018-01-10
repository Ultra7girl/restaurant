import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function HomePage({ data }) {
  // console.log('data', data)
  const { loading, postMenus } = data

  if (loading === true) return 'Loading...'
  return (
    <div>
      <Head>
        <title>Restaurant </title>
      </Head>
      <div>
        <div>
          {postMenus.map(function(menus) {
            return (
              <div key={menus.id}>
                <div>
                  <img />
                </div>
                <Link route="entry" params={{ id: menus.id }}>
                  <a>{menus.name}</a>
                </Link>
              </div>
            )
          })}
        </div>

        <div />
      </div>
    </div>
  )
}

const QUERY_POSTS = gql`
  query {
    postMenus(first: 20, id: 1) {
      id
      categoryId
      name
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
