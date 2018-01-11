import { makeExecutableSchema } from 'graphql-tools'
import 'isomorphic-fetch'

// import { format as formatDate } from 'date-fns'

import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
    type Query {
        postCats(first: Int = 20): [PostCatType]

        postMenus(first: Int = 20, id: Int!): [PostMenuType]
        postMenu(first: Int = 5, id: Int!): [PostMenuType]

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
    type RatingType{
        one: Int
        two: Int
        three: Int
        four: Int
        five: Int
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
        },
    },

    PostMenuType: {
        relateComments: async ({ id }, { first }) => {
            const { data } = await fetchAPI(`/comments?_limit=${first}&menuId=${id}`)
            return data
        }
    }

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


