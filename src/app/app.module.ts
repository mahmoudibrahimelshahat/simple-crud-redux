import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { userReducer } from './core/store/users.reducer';
import { userEffect } from './core/store/users.effect';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({users:userReducer}),
    EffectsModule.forRoot([userEffect]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
     MatPaginatorModule,
     MatProgressSpinnerModule,
     MatSnackBarModule,
     MatFormFieldModule,
     MatButtonModule,
     MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
