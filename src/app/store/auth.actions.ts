
export class LogIn {
  static  readonly type = '[Auth] Login';
  constructor(public payload: any) {}
}

export class LogInSuccess {
  static  readonly type = '[Auth] Login Success';
  constructor(public payload: any) {}
}

export class LogInFailure {
  static  readonly type = '[Auth] Login Failure';
  constructor(public payload: any) {}
}

export class SignUp {
  static  readonly type = '[Auth] Signup';
  constructor(public payload: any) {}
}

export class SignUpSuccess {
  static  readonly type = '[Auth] Signup Success';
  constructor(public payload: any) {}
}

export class SignUpFailure {
  static  readonly type = '[Auth] Signup Failure';
  constructor(public payload: any) {}
}

export class LogOut {
  static  readonly type = '[Auth] Logout';
}

export class GetStatus {
  static  readonly type = '[Auth] GetStatus';
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | GetStatus;
