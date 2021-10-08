import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="login">
      <div class="login-form">
        <div class="login-form-header">
          <div class="login-form-header-logo">
            <img src="assets/images/sqb-logo.svg" alt="" />
          </div>
          <div class="login-form-header-text">Вход в личный кабинет</div>
        </div>
        <form [formGroup]="loginForm">
          <div class="form-field mb-1">
            <!--            <div class="form-field-title">-->
            <!--              Логин <span class="invalid-text">*</span>-->
            <!--            </div>-->
            <label
              class="form-field-label form-field-group"
              [ngClass]="{
                invalid:
                  loginForm.get('login').touched &&
                  loginForm.get('login').errors?.required,
                valid: loginForm.get('login').valid
              }"
            >
              <input
                type="text"
                class="form-control"
                formControlName="login"
                placeholder="Логин"
              />
            </label>
            <button
              class="form-field-hint"
              *ngIf="
                loginForm.get('login').touched &&
                loginForm.get('login').errors?.required
              "
            >
              <span
                class="form-field-hint-text"
                [class.invalid-text]="loginForm.get('login').errors?.required"
              >
                Обязательное поле
              </span>
            </button>
          </div>
          <div class="form-field mb-1">
            <!--            <div class="form-field-title">-->
            <!--              Пароль <span class="invalid-text">*</span>-->
            <!--            </div>-->
            <label
              class="form-field-label form-field-group"
              [ngClass]="{
                invalid:
                  loginForm.get('password').touched &&
                  loginForm.get('password').errors?.required,
                valid: loginForm.get('password').valid
              }"
            >
              <input
                [type]="showPass ? 'text' : 'password'"
                class="form-control"
                formControlName="password"
                placeholder="Пароль"
              />
              <span
                class="form-control-icon form-control-append"
                [ngClass]="{
                  'border-invalid':
                    loginForm.get('password').touched &&
                    loginForm.get('password').errors,
                  'border-valid': loginForm.get('password').valid
                }"
                (click)="showPass = !showPass"
              >
                <i [class]="[showPass ? 'uil-eye-slash' : 'uil-eye']"></i>
              </span>
            </label>
            <button
              class="form-field-hint"
              *ngIf="
                loginForm.get('password').touched &&
                loginForm.get('password').errors?.required
              "
            >
              <span
                class="form-field-hint-text"
                [class.invalid-text]="
                  loginForm.get('password').errors?.required
                "
              >
                Обязательное поле
              </span>
            </button>
          </div>
          <label
            class="d-inline-flex align-items-center position-relative my-3 cursor-pointer"
          >
            <input
              class="d-none position-absolute"
              #checkbox
              type="checkbox"
              formControlName="remember"
            />
            <span
              class="custom-checkbox mr-1"
              [class.custom-checkbox-checked]="checkbox.checked"
            >
              <i class="uil-check"></i>
            </span>
            <span class="text-gray text-12">Запомнить меня</span>
          </label>

          <div class="login-form-error mb-3">
            <i class="uil-info-circle text-red text-20 mr-1"></i>
            Неправильно введен логин или пароль
          </div>

          <button
            type="submit"
            class="btn btn-blue w-100 text-white text-medium text-14"
            [disabled]="loginForm.invalid"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPass = false;

  constructor() {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(false),
    });
  }
}
