import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgModel,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import {
  AngularMyDatePickerDirective,
  IAngularMyDpOptions,
  IMyDateModel,
} from 'angular-mydatepicker';
import * as IMask from 'imask';
import * as moment from 'moment';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field">
      <div class="form-field-title">{{ control.title }}</div>
      <label
        class="form-field-label form-field-group"
        [ngClass]="{
          invalid: inputControl.touched && inputControl.errors,
          valid: inputControl.valid
        }"
        [ngSwitch]="control.fieldType"
      >
        <span
          class="form-control-icon form-control-prepend"
          [ngClass]="{
            'border-invalid': inputControl.touched && inputControl.errors,
            'border-valid': inputControl.valid
          }"
          *ngIf="control.fieldIcon && control.iconPosition === 'prepend'"
        >
          <i [class]="control.fieldIcon"></i>
        </span>
        <!--          text-field          -->
        <input
          *ngSwitchCase="'text'"
          type="text"
          class="form-control"
          [formControl]="inputControl"
          [placeholder]="control.placeholder"
          [imask]="control.mask ? { mask: control.mask } : null"
        />
        <!--          text-field          -->

        <!--          date-field          -->
        <input
          [imask]="dateMask"
          [unmask]="'typed'"
          [formControl]="inputControl"
          class="form-control"
          *ngSwitchCase="'datepicker'"
        />
        <!--          (accept)="onAccept($event)"-->
        <input
          type="hidden"
          *ngSwitchCase="'datepicker'"
          angular-mydatepicker
          name="mydate"
          [options]="myDpOptions"
          #dp="angular-mydatepicker"
          [locale]="'ru'"
          autocomplete="off"
          (inputFieldChanged)="onInputChanged($event)"
        />
        <!--          date-field          -->

        <!--        select field      -->
        <ng-select
          *ngSwitchCase="'select'"
          class="custom-select w-100"
          appearance="outline"
          [items]="control.options"
          bindLabel="value"
          bindValue="key"
          [placeholder]="control.placeholder"
          [formControl]="inputControl"
          [loadingText]="'Загружается'"
          [searchable]="false"
          [clearable]="true"
          [notFoundText]="'Данные отсутствуют'"
        ></ng-select>
        <!--        select field      -->

        <span
          class="form-control-icon form-control-append"
          [ngClass]="{
            'border-invalid': inputControl.touched && inputControl.errors,
            'border-valid': inputControl.valid
          }"
          *ngIf="control.fieldIcon && control.iconPosition === 'append'"
          (click)="
            control.fieldType === 'datepicker'
              ? toggleCalendar()
              : $event.preventDefault()
          "
        >
          <i [class]="control.fieldIcon"></i>
        </span>
      </label>
      <button
        class="form-field-hint"
        *ngIf="inputControl.errors && inputControl.touched"
      >
        <span
          class="form-field-hint-text"
          [class.invalid-text]="inputControl.errors"
        >
          {{ control['errorText'] }}
        </span>
      </button>
      <button
        class="form-field-hint"
        *ngIf="!inputControl.value && inputControl.touched"
      >
        <span class="form-field-hint-text">
          {{ control['hintText'] }}
        </span>
      </button>
    </div>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: FormFieldComponent,
    //   multi: true,
    // },
  ],
})
export class FormFieldComponent
  implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() control: any;

  @ViewChild('dp') myDp: AngularMyDatePickerDirective;

  customPatterns = { S: { pattern: new RegExp('[a-zA-Z]') } };

  inputControl!: FormControl;
  onChange: any;
  onTouch: any;

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd',
    minYear: 1900,
    maxYear: 2100,
  };

  dateMask = {
    mask: Date, // enable date mask
    pattern: 'd.`m.`Y',
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        placeholderChar: 'д',
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        placeholderChar: 'м',
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        placeholderChar: 'г',
        from: 1900,
        to: 2099,
        maxLength: 4,
      },
    },
    format(date): any {
      return moment(date).locale('ru').format('L');
    },
    min: new Date(1900, 0, 1), // defaults to `1900-01-01`
    max: new Date(2100, 0, 1), // defaults to `9999-01-01`
    autofix: true, // defaults to `false`
    lazy: false,
    overwrite: false, // defaults to `false`
  };

  // regexp = {mask: this.control.regexp === '0' ? /^\d+$/ : this.control.regexp === 'Aa' ? /^\D+$/ : /^$/ };
  // '0'=only-digits, 'A-0'=only-letter-digits, 'Aa'=only-letter, 'A'=only-letter-upper, 'a'=only-letter-lower, 'mail', 'phone', date //

  constructor(public applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.inputControl = new FormControl(
      null,
      Validators.compose(this.control.validators)
    );

    // console.log(this.control);
  }
  ngAfterViewInit(): void {
    this.inputControl.valueChanges.subscribe((val) => {
      // console.log(val);
      // this.isChecked.emit(val);

      if (this.onChange && val !== null) {
        if (this.control.fieldType === 'datepicker' && val.singleDate) {
          this.onChange(val.singleDate?.formatted);
        } else {
          this.onChange(val);
        }
      }

      setTimeout(() => {
        if (val !== null && val) {
          this.applicationService.updateFormControlState(this.control.parentList, this.control.parentId, this.control.controlName, true);
        } else {
          this.applicationService.updateFormControlState(this.control.parentList, this.control.parentId, this.control.controlName, false);
        }
      }, 1000);
    });
  }
  ngOnDestroy(): void {}

  writeValue(value: any): void {
    // this.setValue(value);
    this.inputControl.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {}

  toggleCalendar(): void {
    this.myDp.toggleCalendar();
  }

  onInputChanged(event: any): void {
    this.inputControl.setValue(new Date(event.value));
  }
}
