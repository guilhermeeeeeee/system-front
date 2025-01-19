
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,NgxMaskDirective,
     MatFormFieldModule, MatInputModule,
      MatDatepickerModule,MatFormFieldModule,
       MatInputModule, MatSelectModule, MatCardModule,
        MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter(),provideNgxMask(),],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CustomerDetailComponent implements OnInit{
  
  constructor(private service: CustomerService, private router:Router,private route: ActivatedRoute) {}

  documentNumberDetail!: string;
  customerDetail!: Customer;
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      debugger
      this.documentNumberDetail = params.get('documentNumber')!;
    });
    this.service.findByDocumentNumber(this.documentNumberDetail).subscribe(
      (response) => {
        debugger
        this.customerDetail = response;
        this.formCustomer.patchValue(this.customerDetail);
        console.log('Data fetched successfully:', this.customerDetail);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  formCustomer = new FormGroup({
    documentNumber: new FormControl('', Validators.minLength(2)),
    corporateName: new FormControl(''),
    tradeName: new FormControl(''),
    dateFoundation:new FormControl(''),
    address: new FormGroup({
      street:new FormControl(''),
      number:new FormControl(''),
      city:new FormControl(''),
      state:new FormControl(''),
      neighborhood:new FormControl(''),
      zipcode:new FormControl(''),
    }),
    emailFormControl:new FormControl('')
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
    this.router.navigate(['/customer-list']);
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


