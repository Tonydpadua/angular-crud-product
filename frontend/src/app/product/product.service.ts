import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Product} from './product.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:3001/products';

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient) { }

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseURL, product).pipe(
      map((obj) => obj),
      catchError((e) => this.handleError(e))
    );
  }

  read(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseURL);
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseURL}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseURL}/${product.id}`;
    return this.httpClient.put<Product>(url, product);
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`;
    return this.httpClient.delete<Product>(url);
  }

  handleError(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
