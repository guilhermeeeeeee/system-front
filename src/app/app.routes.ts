import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerRegisterComponent } from './customer/customer-register/customer-register.component';

export const routes: Routes = [
    {
        path:"customer-list",
        component:CustomerListComponent
    },
    {
        path:"customer-detail/:documentNumber",
        component:CustomerDetailComponent
    },
    {
        path:"customer-register",
        component:CustomerRegisterComponent
    }
    
];
