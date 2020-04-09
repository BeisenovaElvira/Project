import { Injectable } from '@angular/core';
import {products, Product} from './products';
import {Observable, of} from 'rxjs';
import {Category} from './categories';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProducts(id: number): Observable<any> {
    return of(products.filter(product => product.category_id === id));
  }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
        catchError(this.handleError<Category[]>('getCategories', []))
      );
    //return of(categories);
  }
  private categoriesUrl = 'api/categories';  // URL to web api
  constructor(
    private http: HttpClient,
    
  ) {}
  addCategory (category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions).pipe(
      //tap((newCategory: Category) => this.log(`added hero w/ id=${newCategory.id}`)),
      catchError(this.handleError<Category>('Category'))
    );
  }

  deleteCategory (category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoriesUrl}/${id}`;
  
    return this.http.delete<Category>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Category>('deleteHero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };  
}
