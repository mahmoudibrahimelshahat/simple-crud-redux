import { Component, OnInit, ViewChild } from '@angular/core';
import { user } from './core/store/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { addUserSuccess, deleteUserById, editUserSuccess, loadUser } from './core/store/users.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<user>();
  
  isLoading: boolean = false;
  userForm!:FormGroup;
  pageSize = 5;
  users$: Observable<user[]> = new Observable<user[]>();
  isEditingUser:boolean = false

  displayedColumns: string[] = [
    'id',
    'firstName',
    'secondName',
    'age',
    'action',
  ];

  constructor(private store: Store,private fb:FormBuilder) {}

  ngOnInit() {
    this.initializeForm()
    this.store.dispatch(loadUser());
    this.users$ = this.store.select((state: any) => {
      return state.users.list;
    });
    this.getUsersList();
  }

  initializeForm(user?:user){
    this.userForm = this.fb.group({

      firstName: [null|| user?.firstName,[Validators.required]],
      secondName: [null|| user?.secondName,[Validators.required]],
      age: [null|| user?.age,[Validators.required]],
      id: [null || user?.id,[Validators.required]],
    })
  }

  getUsersList() {
    this.isLoading = true;
    this.users$.subscribe((res) => {
      this.isLoading = false;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(userId: number) {
    let confirmValue = confirm('Are you sure to delete this user');
    confirmValue ? this.store.dispatch(deleteUserById({ id: userId })) : null;
  }

  editUser(user:user){
    this.initializeForm(user)
    this.isEditingUser = true
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
  }

  onSubmit(){
    if(this.isEditingUser){
      if(this.userForm.valid){
        console.log(this.userForm.value);
        this.store.dispatch(editUserSuccess(this.userForm.value))
        this.userForm.reset()
      }else{
        this.userForm.markAllAsTouched()
      }
    }else{
      this.userForm.get('id')?.value ? this.userForm.get('id')?.value : this.userForm.get('id')?.setValue(uuidv4())
      if(this.userForm.valid){
        console.log(this.userForm.value);
     this.store.dispatch(addUserSuccess({user:this.userForm.value}))
        this.userForm.reset()
      }else{
        this.userForm.markAllAsTouched()
      }
    }
  
  }
}
