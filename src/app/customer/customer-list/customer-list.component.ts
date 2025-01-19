import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ModalConfirmActionComponent } from '../../shared/modal-confirm-action/modal-confirm-action.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  providers: [provideNativeDateAdapter(),provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [MatPaginatorModule,MatTableModule,NgxMaskDirective,
     MatButtonModule, MatIconModule,
      MatMenuModule, MatFormFieldModule,
       FormsModule, MatInputModule,
        RouterOutlet, RouterLink,
         RouterLinkActive,MatButtonModule],
})

export class CustomerListComponent implements OnInit {

  constructor(private dialog: MatDialog,private service: CustomerService, private router:Router) {}
  dataSources!: Array<Customer>;
  displayedColumns: string[] = ['documentNumber', 'corporateName', 'tradeName','action'];
  dataTable = new MatTableDataSource<any>();
  data:any;
  value!: '';
  documentNumberToDelete!: string;
  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, documentNumber: string): void {
    this.documentNumberToDelete = documentNumber;
    const dialogRef = this.dialog.open(ModalConfirmActionComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteConfirm()
      } else {
        this.deleteCancel()
      }
    }); 
  }
  ngOnInit(): void {
    this.findAllPaginated(this.currentPage, this.pageSize)
  }

  search(){
    this.findAllPaginated(this.currentPage, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;   // A nova página (base 0)
    this.pageSize = event.pageSize;       // O novo tamanho da página
    this.findAllPaginated(this.currentPage, this.pageSize);  // Recarrega os dados com a nova página e tamanho
  }

  findAllPaginated(page: number, size: number){
    this.service.findAllPaginated(page,size).subscribe(
      (response) => {
        this.dataSources = response.content;
        this.dataTable = new MatTableDataSource(this.dataSources);
        console.log('Data fetched successfully:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  deleteConfirm(){
    this.service.deleteByDocumentNumber(this.documentNumberToDelete).subscribe(
      (response) => {
        this.findAllPaginated(this.currentPage, this.pageSize); 
        console.log('Data deleted successfully:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  deleteCancel(){
    this.documentNumberToDelete = '';
  }
  
  

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataTable.filter = filterValue.trim().toLowerCase();
  // }
}