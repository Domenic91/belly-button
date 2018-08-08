import gql from 'graphql-tag'

export const gameFieldQuery = gql`
    query GameFieldQuery {
        gameField @client {
            id
            value
        }
    }
`
export const callCellMutation = gql`
    mutation CallCellMutation($id: ID!) {
        callCell(id: $id) @client {
            id
            value
        }
    }
`
