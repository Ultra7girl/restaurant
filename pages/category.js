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
				<div className="main-left">
					{postMenus.map(function(menus) {
						return (
							<div key={menus.id} className="box">
								<Link route="item" params={{ id: menus.id }}>
									<div>
										<br />
										<img
											width="180"
											height="150"
											src={`../static/images/menus/${menus.images}`}
										/>
										<br />
										<a>{menus.name}</a>
										<br />
										{menus.price}.- <br />
										<br />
									</div>
								</Link>
								<input type="button" value="Order" />
							</div>
						)
					})}
				</div>
				<div className="main-right">order list</div>
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
			price
			images
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
