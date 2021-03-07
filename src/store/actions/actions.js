export const LISTS_OF_COLLEGES = 'LIST_OF_COLLEGES'
export const LIST_OF_USERS = 'LIST_OF_USERS'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

export const listOfUsers = userDetails => {
    return {
        type:LIST_OF_USERS,
        user:userDetails
    }
}

export const listsOfColleges = colleges => {
    return {
        type:LISTS_OF_COLLEGES,
        colleges:colleges
    }
}

export const updateUser = (index,updatedValues) => {
    return {
        type:UPDATE_USER,
        value:updatedValues,
        index:index
    }
}

export const deleteUser = userKey => {
    return {
        type:DELETE_USER,
        key:userKey
    }
}