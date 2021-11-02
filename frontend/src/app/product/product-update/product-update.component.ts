import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.sass']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => this.product = product);
  }

  updateProduct() {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!'),
        this.router.navigate(['/products']);
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
