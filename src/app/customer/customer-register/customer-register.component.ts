
import {Component, ViewEncapsulation} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { emailExistsValidator } from '../../customer/validators/emailExistsValidator.validator';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,NgxMaskDirective,
     MatFormFieldModule, MatInputModule,
      MatDatepickerModule,MatFormFieldModule,
       MatInputModule, MatSelectModule, MatCardModule,
        MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter(),provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CustomerRegisterComponent {
  
  constructor(private service: CustomerService, private router:Router) {}

  formCustomer = new FormGroup({
    documentNumber: new FormControl('', [Validators.required]),
    corporateName: new FormControl('', [Validators.required]),
    tradeName: new FormControl('', [Validators.required]),
    dateFoundation:new FormControl(''),
    email:new FormControl('', {
      validators:[Validators.required, Validators.email],
      asyncValidators: [emailExistsValidator(this.service)]
    }
    ),
    phoneNumber:new FormControl('', [Validators.required]),
    address: new FormGroup({
      street:new FormControl('' , [Validators.required]),
      number:new FormControl('', [Validators.required]),
      city:new FormControl('' , [Validators.required]),
      state:new FormControl('' , [Validators.required]),
      neighborhood:new FormControl('', [Validators.required]),
      zipcode:new FormControl('', [Validators.required]),
    }),
  });
  customerRequest!: Customer;
  matcher = new MyErrorStateMatcher();
  
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  save() {
    debugger
    this.service.save(this.createCustomerFromForm()).subscribe({
      next: (response) => {
        console.log('Item salvo com sucesso', response);
        this.router.navigate(['/customer-list']);
      },
      error: (error) => {
        console.error('Erro ao salvar item', error);
      }
    });
  }
  cancel(){
    // this.router.navigate(['/customer-list']);
    
    console.log(this.formCustomer)
  }

  safeString(value: string | null | undefined): string {
    return value ?? ''; // Retorna uma string vazia caso o valor seja null ou undefined
  }

  // Função para obter os dados do formulário e criar a instância de Customer
  createCustomerFromForm(): Customer {
    const formValues = this.formCustomer.value; // Pega todos os valores do formulário

    // Cria uma instância de Customer a partir dos valores do formulário
    const customer: Customer = {
      documentNumber: this.safeString(formValues.documentNumber),
      corporateName: this.safeString(formValues.corporateName),
      tradeName: this.safeString(formValues.tradeName),
      dateFoundation: this.safeString(formValues.dateFoundation),
      email:this.safeString(formValues.email),
      phoneNumber:this.safeString(formValues.phoneNumber),
      address: {
        street: this.safeString(formValues.address?.street),
        number: this.safeString(formValues.address?.number),
        city: this.safeString(formValues.address?.city),
        state: this.safeString(formValues.address?.state),
        neighborhood: this.safeString(formValues.address?.neighborhood),
        zipcode: this.safeString(formValues.address?.zipcode),
      }
    };
    return customer;
  }


}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
