import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryList: string = environment.baseUrl + 'category/list';
  private categoryFilter: string = environment.baseUrl + 'category/filterByCategoryActive?name=';
  private categoryCreate: string = environment.baseUrl + 'category/create';

constructor(private http: HttpClient) { }

getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(this.categoryList);
}

filterByCategoryAndActiveNote(name: string): Observable<Category> {
  const url = `${this.categoryFilter}${name}`;
  return this.http.get<Category>(url);
}
createCategory(category: Category): Observable<Category> {
  const url = this.categoryCreate;
  return this.http.post<Category>(url, category)
}
}
