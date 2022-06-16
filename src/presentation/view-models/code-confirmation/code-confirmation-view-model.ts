import { BaseViewModel } from '../base-view-model';

export interface CodeConfirmationViewModel extends BaseViewModel {
  codeValue: string;

  handleCodeInputChange(value: string): void;
  handleSubmit(): void;
}
