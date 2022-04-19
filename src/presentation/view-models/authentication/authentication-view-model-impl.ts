import { AuthenticationViewModel } from './authentication-view-model';

export class AuthenticationViewModelImpl implements AuthenticationViewModel {
  public emailField: string;

  public passwordField: string;

  public constructor() {
    this.emailField = '';
    this.passwordField = '';
  }
}
