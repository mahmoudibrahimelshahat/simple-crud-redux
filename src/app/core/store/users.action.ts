import { createAction, props } from "@ngrx/store";
import { user } from "./user.model";


export const addUserSuccess = createAction('[add_user_success]add user success',props<{ user: user }>())
export const addUserFailure = createAction('[add_user_failure]add user failure', props<{ errorMessage: string }>())

export const editUserSuccess = createAction('[edit_user_success]edit user success',props<{ user: user }>())
export const editUserFailure = createAction('[edit_user_failure]edit user failure', props<{ errorMessage: string }>())


export const loadUser = createAction('[load_user]Load user')
export const loadUserSuccess = createAction('[load_user_success]load user success',props<{ list: user[] }>())
export const loadUserFailure = createAction('[load_user_failure]load user failure', props<{ errorMessage: string }>())

export const deleteUserById = createAction('[delete_user]delete user', props<{ id:number }>())
export const deleteUserByIdSuccess = createAction('[delete_user_success]delete user success',props<{ id:number }>())
