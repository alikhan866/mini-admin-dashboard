import { LISTS_OF_COLLEGES,LIST_OF_USERS,UPDATE_USER,DELETE_USER } from '../actions/actions';

const initialState = {
    listOfUsers:[],
    listOfColleges:[]
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LISTS_OF_COLLEGES:
            return {
                ...state,
                listOfColleges:[...state.listOfColleges,action.colleges]
            }
        case LIST_OF_USERS:
            return {
                ...state,
                listOfUsers:[...state.listOfUsers,action.user]
            }

        case UPDATE_USER:
            const newArr = [...state.listOfUsers]
            newArr[action.index] = action.value
            return {
                ...state,
                listOfUsers:newArr
            }

        case DELETE_USER:
            return {
                ...state,
                listOfUsers:[...state.listOfUsers.filter((ele) =>ele.key !== action.key)]
            }
        default:
            return state;
    }
};

export default Reducer;