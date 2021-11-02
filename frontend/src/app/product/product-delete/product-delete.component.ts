import { Component, OnInit } from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.sass']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => this.product = product);
  }

  deleteProduct() {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso!'),
        this.router.navigate(['/products']);
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
