import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../services/users.service";
import {  addUserFailure, addUserSuccess, deleteUserById, deleteUserByIdSuccess, editUserFailure, editUserSuccess, loadUser, loadUserFailure, loadUserSuccess } from "./users.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class userEffect {
  
  constructor(private userService:UsersService,private action$:Actions, private MatSnackBar:MatSnackBar){}



  _addUser = createEffect(()=>this.action$.pipe(
    ofType(addUserSuccess),
    exhaustMap((action:any)=>{      
       return this.userService.addUser(action.user).pipe(
          map((data)=>{
            this.MatSnackBar.open('User Added Successfully', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            })
            return addUserSuccess({user:data})
          }),    
          catchError((err:any)=>{
            this.MatSnackBar.open('Fail To Add User', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            })
            return of(addUserFailure({errorMessage:err}))
          }
          )     
        )      
    })
  ))


  _editUser = createEffect(()=>this.action$.pipe(
    ofType(editUserSuccess),
    exhaustMap((action:any)=>{            
       return this.userService.editUser(action,action.id).pipe(
          map((data)=>{
            this.MatSnackBar.open('User Editted Successfully', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            })
            return editUserSuccess({user:data})
          }),    
          catchError((err:any)=>{
            this.MatSnackBar.open('Fail To Edit User', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            })
            return of(editUserFailure({errorMessage:err}))
          }
          )     
        )      
    })
  ))


  _loadUsers = createEffect(()=>this.action$.pipe(
    ofType(loadUser), // this is an operator in ngrx allow or list on  only action that triggerd to be filter data on it 
    exhaustMap((action:any)=>{ // exhaustMap it is an operator that use the inner observable and ignore other like big circle inside it
      // there is other small observables so it take only one and ignore others
       return this.userService.getUsers().pipe(
          map((data)=>{
            return loadUserSuccess({list:data}) // here he will go to the action and from action go to reducer
          }),    
          catchError((err:any)=>{
            this.MatSnackBar.open('Fail To load Data', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            })
            return of(loadUserFailure({errorMessage:err}))
          }
          )     
        )      
    })
  ))

  _deleteUser = createEffect(()=> this.action$.pipe(
    ofType(deleteUserById),
    exhaustMap((action)=>{      
      return this.userService.deleteUser(action.id).pipe(
        map((data)=>{
          this.MatSnackBar.open('User Deleted Successfully', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          })
          return  deleteUserByIdSuccess({id:data.id})
        }),    
        catchError((err:any)=>{
          this.MatSnackBar.open('Failed To Delete User', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          })
          return of(loadUserFailure({errorMessage:err}))
        }
        )     
      )
    })
  ))

}