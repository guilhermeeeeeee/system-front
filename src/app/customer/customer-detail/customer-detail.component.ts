
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [ReactiveFormsModule,NgxMaskDirective, MatFormFieldModule, MatInputModule, MatDatepickerModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter(),provideNgxMask(),],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CustomerDetailComponent {
    
  formCustomer = new FormGroup({
    documentNumber: new FormControl('', Validators.minLength(2)),
    corporateName: new FormControl(''),
    tradeName: new FormControl(''),
    dateFoundation:new FormControl(''),
    street:new FormControl(''),
    number:new FormControl(''),
    city:new FormControl(''),
    state:new FormControl(''),
    neighborhood:new FormControl(''),
    zipcode:new FormControl('')
  });
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
    console.log(this.formCustomer)
    }

}
