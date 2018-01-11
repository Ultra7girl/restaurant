import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function CategoryPage({ data }) {
	const { loading, postMenus } = data
	// console.log(postMenus)

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
									<img src={`../static/images/menus/${menus.images}`} />
								</div>
								<Link route="item" params={{ id: menus.id }}>
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
	query getMenus($first: Int, $catId: Int!) {
		postMenus(first: $first, id: $catId) {
			id
			categoryId
			name
			images
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

export default compose(
	page,
	graphql(QUERY_POSTS, {
		options: ({ url: { query: { id } } }) => ({
			variables: {
				first: 20,
				catId: id
			}
		})
	})
)(CategoryPage)
