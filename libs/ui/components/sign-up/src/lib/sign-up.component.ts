import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export type SignUpFormStatus = 'submit';

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface SignUpFormEvent {
  status: SignUpFormStatus;
  data: SignUpFormData;
}

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      !!form?.form.hasError('password') ||
      !!(
        control &&
        (control.hasError('required') || control.hasError('minlength')) &&
        (control.dirty || control.touched)
      )
    );
  }
}

@Component({
  selector: 'fdx-asgmt-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  @Output() status = new EventEmitter<SignUpFormEvent>();

  public matcher = new PasswordErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.signUpForm.statusChanges.subscribe((status) =>
      changeDetectorRef.markForCheck()
    );
  }

  public signUpForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [this.passwordValidator] }
  );

  passwordValidator(form: FormGroup) {
    if (form.value.password) {
      const containsOnlyAlpha = /^[A-Za-z]+$/.test(form.value.password);
      const containsUpperCase = /[A-Z]+/.test(form.value.password);
      const containsLowerCase = /[a-z]+/.test(form.value.password);

      let containsNoUserName = true;

      if (form.value.firstName || form.value.lastName) {
        const arr: string[] = [];
        if (form.value.firstName) {
          arr.push(form.value.firstName);
        }
        if (form.value.lastName) {
          arr.push(form.value.lastName);
        }

        const regex = new RegExp(`^.*(${arr.join('|')}).*$`, 'gi');
        containsNoUserName = !regex.test(form.value.password);
      }

      const passwordValid =
        containsOnlyAlpha &&
        containsNoUserName &&
        containsUpperCase &&
        containsLowerCase;

      return !passwordValid
        ? {
            password: {
              containsOnlyAlpha,
              containsNoUserName,
              containsUpperCase,
              containsLowerCase,
            },
          }
        : null;
    }
    return null;
  }

  /**
   * Convenience method for getting hold of the form control in the template
   **/
  get fc() {
    return this.signUpForm.controls;
  }

  public onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.status.emit({ status: 'submit', data: this.signUpForm.value });
    }
  }
}
