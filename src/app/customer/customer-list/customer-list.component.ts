import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [MatPaginatorModule,MatTableModule, MatButtonModule, MatIconModule, MatMenuModule, MatFormFieldModule, FormsModule, MatInputModule, RouterOutlet, RouterLink, RouterLinkActive],
})

export class CustomerListComponent implements OnInit {

  constructor(private service: CustomerService, private router:Router) {}
  dataSources!: Array<Customer>;
  columnsToDisplay = ['documentNumber', 'CNPJ', 'Nome Fantasia'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Customer | null | undefined;
  value = '';
  data:any;
  ngOnInit(): void {
    this.service.findAll().subscribe(
      (response) => {
        debugger
        this.dataSources = response;
        this.dataTable = new MatTableDataSource(this.dataSources);
        console.log('Data fetched successfully:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  displayedColumns: string[] = ['documentNumber', 'corporateName', 'tradeName','action'];
  dataTable = new MatTableDataSource(this.dataSources);

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataTable.filter = filterValue.trim().toLowerCase();
  // }
}
export interface PeriodicElement {
  name: string;
  documentNumber: number;
  weight: number;
  symbol: string;
}
