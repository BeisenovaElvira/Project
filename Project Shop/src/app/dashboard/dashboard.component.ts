import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../product.service';
import { Category } from '../categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories: any;
  products: any;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.router.events.subscribe((value => {
        this.getCategories();
        this.getProducts();
      }))
    }

  getCategories(): void {
    this.productsService.getCategories().subscribe(categories => this.categories = categories);
  }
  getProducts() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProducts(id).subscribe(products => this.products = products);
  }

  ngOnInit(): void {
    this.getCategories();
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.productsService.addCategory({ name } as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
  }
  delete(category: Category): void {
    this.categories = this.categories.filter(h => h !== category);
    this.productsService.deleteCategory(category).subscribe();
  }
}
