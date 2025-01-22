import { createReducer, on } from '@ngrx/store';
import {
  addUserFailure,
  addUserSuccess,
  deleteUserById,
  editUserSuccess,
  loadUserFailure,
  loadUserSuccess,
} from './users.action';

const initialState = {
  list: [],
  errorMessage: '',
  userObject: {
    id: '2',
    firstName: 'hello',
    secondName: 'other',
    age: '55',
  },
};

const _userReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state: any, action: any) => {
    console.log('state=>',state);
    console.log('action=>',action);
    return {
      ...state,
      errorMessage: '',
      list: [...action.list],
    };
  }),

  on(loadUserFailure, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      list: [],
    };
  }),

  on(addUserSuccess, (state: any, action: any) => {
    const userAlreadyExists = state.list.some(
      (user: any) => user.id === action.user.id
    );
    if (!userAlreadyExists) {
      return {
        ...state,
        errorMessage: '',
        list: [...state.list, action.user],
      };
    } else {
      return {
        ...state,
        errorMessage: 'User already exists',
        list: [...state.list],
      };
    }
  }),

  on(addUserFailure, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      list: [],
    };
  }),

  on(editUserSuccess, (state: any, action: any) => {
    const userIndex = state.list.findIndex((user: any) => user.id === action.id);
    const updatedUser = { ...state.list[userIndex], ...action };
    const updatedList = [...state.list];
    updatedList[userIndex] = updatedUser;

    return {
        ...state,
        errorMessage: '',
        list: updatedList,
    };
}),

  on(deleteUserById, (state: any, action: any) => {
    return {
      ...state,
      errorMessage: '',
      list: state.list.filter((item: any) => item.id != action.id),
    };
  })
);

export function userReducer(state: any, action: any) { // state :initialState > here i let reducer know state initial value , action 
// action that reducer watch to change data (state)
  return _userReducer(state, action);
}
