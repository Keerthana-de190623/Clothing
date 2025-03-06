import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';

@Component({
  selector: 'app-product',
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule, PricePipe, TruncateNamePipe],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] 
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton', { static: false }) deleteButton: any;
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }

  

  confirmDelete() {
    if (!this.deleteButton?.nativeElement) {
      console.error("Delete button not found.");
      return;
    }

    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => this.deleteProduct()
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
    console.log("Product deleted:", this.product);
  }

  ngOnInit() {
    console.log("Product received:", this.product);
  }
}
