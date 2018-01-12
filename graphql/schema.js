import { makeExecutableSchema } from 'graphql-tools'
import 'isomorphic-fetch'

// import { format as formatDate } from 'date-fns'

import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
    type Query {
        postCats(first: Int = 20): [PostCatType]
        postMenus(first: Int = 20, id: Int!): [PostMenuType]
        postMenu(first: Int = 20, id: Int!): [PostMenuType]

        postMenuIndex(first: Int = 20):[PostMenuType]

        postComments(first: Int = 20): [PostCommentType]
    }
    type PostCatType {
        id: Int
        name: String
        images: String
    }

    type PostMenuType {
        id: Int
        categoryId: Int
        name: String
        images: String
        price: Int
        rating: RatingType
        relateComments(first: Int = 5, id: Int = 1): [PostCommentType]
    }

    type RatingType {
        rawRating: RawRatingType!
        totalRating: Int!
        avgRating: Float!
    }

    type RawRatingType {
        one: Int!
        two: Int!
        three: Int!
        four: Int!
        five: Int!
    }
    
    type PostCommentType{
        id: Int
        body: String
        menuId: Int
    }
`

const resolvers = {
	Query: {
		postCats: async (_, { first }) => {
			const { data } = await fetchAPI(`/categories?_limit=${first}`)
			return data
		},

		postMenus: async (_, { first, id }) => {
			const { data } = await fetchAPI(`/menus?_limit=${first}&categoryId=${id}`)
			return data
		},
		postMenu: async (_, { id }) => {
			const { data } = await fetchAPI(`/menus?id=${id}`)
			return data
		},
		postMenuIndex: async () => {
			const { data } = await fetchAPI(`/menus`)
			return data
		},

		postComments: async (_, { id }) => {
			const { data } = await fetchAPI(`/comments?menuId=${id}`)
			return data
		}
	},

	PostMenuType: {
		relateComments: async ({ id }, { first }) => {
			const { data } = await fetchAPI(`/comments?_limit=${first}&menuId=${id}`)
			return data
		},

		rating: postMenu => {
			const { rating } = postMenu
			const total = Object.keys(rating).reduce((prev, key) => {
				return prev + rating[key]
			}, 0)

			if (total) {
				const sumTotal = Object.keys(rating).reduce((prev, key) => {
					var multiplier = 0
					switch (key) {
						case 'two':
							multiplier = 2
							break
						case 'three':
							multiplier = 3
							break
						case 'four':
							multiplier = 4
							break
						case 'five':
							multiplier = 5
							break
						case 'one':
						default:
							multiplier = 1
					}
					return prev + rating[key] * multiplier
				}, 0)

				return {
					rawRating: postMenu.rating,
					totalRating: total,
					avgRating: Math.round(sumTotal / total)
				}
			}
			return {
				rawRating: postMenu.rating,
				totalRating: 0,
				avgRating: 0
			}
		}
	}

	// (5*252 + 4*124 + 3*40 + 2*29 + 1*33) / (252+124+40+29+33) = 4.11
	// PostCommentType: {
	//     relateComments: async (_, { first }) => {
	//         const { data } = await fetchAPI(`/comments?_limit=${first}`)
	//         return data
	//     }
	// }
}

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

// http://localhost:5000/graphiql

// {
//     postCats {
//       id,
//       name,
//       images
//     }

//     postMenu(id:1){
//       id,
//       categoryId,
//       name,
//       rating{
//         one, two, three, four, five
//       },
//       relateComments{
//         id,
//         body,
//         menuId
//       }
//     }

//           postMenus(first:2, id:1){
//       id,
//       categoryId,
//       name,
//       rating{
//       one, two, three, four, five
//       }

//           }

// }

//////////////////////////////////////////
