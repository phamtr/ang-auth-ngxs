import { State, Action, StateContext, Actions } from '@ngxs/store';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, LogOut } from './auth.actions';
import { AuthService } from '../services/auth.service';

import { map, catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
//import { Action } from 'rxjs/internal/scheduler/Action';


export interface AppStatemodel {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
  }
  
  export const initialState: AppStatemodel = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };

  @State<AppStatemodel>({
    name: 'app',
    defaults: initialState
})
export class AppState {
    constructor(private authService: AuthService, private router: Router
        ,private actions$: Actions
    ) { }
    @Action(LogIn)
    logIn$(ctx: StateContext<AppStatemodel>, action: LogIn) {
        return this.authService.logIn(action.payload.email, action.payload.password)
            .pipe(
                map(user => ctx.dispatch(new LogInSuccess({token: action.payload.user.token, email: action.payload.email}))),
                catchError((error) => ctx.dispatch(new LogInFailure({ error: error })))
            );
    }
    @Action(LogInSuccess)
    logInSuccess(ctx: StateContext<AppStatemodel>, action: LogInSuccess) {
        const state = ctx.getState();

        const current = {
            isAuthenticated: true,
            user: {
              token: action.payload.token,
              email: action.payload.email
            },
            errorMessage: null
        };

        ctx.setState({
            ...state,
            ...current
        });
        this.actions$.pipe(tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
          }))
    
    }
       
    @Action(LogInFailure)
    logInFailure(ctx: StateContext<AppStatemodel>, action: LogInFailure) {
        const state = ctx.getState();

        const current = {
            errorMessage: 'Incorrect email and/or password.'
        };

        ctx.setState({
            ...state,
            ...current
        });
    }
    @Action(SignUp)
    signUp$(ctx: StateContext<AppStatemodel>, action: SignUp) {
        return this.authService.signUp(action.payload.email, action.payload.password)
            .pipe(
                map(x => ctx.dispatch(new SignUpSuccess(x))),
                catchError((error) => ctx.dispatch(new SignUpFailure(error)))
            );
    }
    @Action(SignUpSuccess)
    signUpSuccess(ctx: StateContext<AppStatemodel>, action: SignUpSuccess) {
        const state = ctx.getState();

        const current = {
            isAuthenticated: true,
            user: {
              token: action.payload.token,
              email: action.payload.email
            },
            errorMessage: null
        };

        ctx.setState({
            ...state,
            ...current
        });
        this.actions$.pipe(tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
          }))
    }
    @Action(SignUpFailure)
    signUpFailure(ctx: StateContext<AppStatemodel>, action: SignUpFailure) {
        const state = ctx.getState();

        const current = {
            errorMessage: 'That email is already in use.'
        };

        ctx.setState({
            ...state,
            ...current
        });
    }
    @Action(LogOut)
    logOut(ctx: StateContext<AppStatemodel>, action: LogOut) {
        const state = initialState;

        ctx.setState({
            ...state
        });
        this.actions$.pipe(tap((user) => {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/');
          }))
    }
}
  