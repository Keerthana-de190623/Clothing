import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule, ReactiveFormsModule, ValidatorFn, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {

  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    price: '',
    image: '',
    rating: 0,
  };

  productform!: FormGroup;

  ngOnInit() {
    this.productform = this.formBuilder.group({
      name: ['', [Validators.required, this.specialCharacterValidator()]],
      image: [''],
      price: ['', [Validators.required]],
      rating: [0],
    });
  }

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  ngOnChanges() {
    if (this.productform) {
      this.productform.patchValue(this.product);
    }
  }

  @Output() confirm = new EventEmitter<Product>();
  onConfirm() {
    const { name, image, price, rating } = this.productform.value;

    this.confirm.emit({
      name: name || '',
      price: price || '',
      image: image || '',
      rating: rating || 0,
    });

    this.display = false;
    this.displayChange.emit(this.display);
  }

  @Output() cancel = new EventEmitter<void>();
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}