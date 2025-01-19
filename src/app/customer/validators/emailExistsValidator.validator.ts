import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { CustomerService } from '../../services/customer.service';

export function emailExistsValidator(customerService: CustomerService): AsyncValidatorFn {
    
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    debugger
    const email = control.value;
    if (!email) {
      return of(null);  // Se o campo está vazio, não realiza a validação
    }
    
    // Debounce para evitar requisições excessivas
    return customerService.checkEmailExists(email).pipe(
      debounceTime(300), // Aguarda 300ms após a última digitação
      switchMap(response => {
        return response ? of({ emailTaken: true }) : of(null);
      }),
      catchError(() => of(null))  // Caso o backend falhe, consideramos como válido
    );
  };
}