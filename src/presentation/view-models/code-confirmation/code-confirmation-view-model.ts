import { Signup } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface CodeConfirmationViewModel extends BaseViewModel {
  signup: Signup;
  codeValue: string;

  handleCodeInputChange(value: string): void;
  handleSubmit(): void;
}
