import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from '@angular/core';
import liquorProducts from '../../../APIs/Shops-to-Drinks';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CartItem } from 'src/app/model/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  @ViewChild('offCanvas', { static: false }) offCanvas: ElementRef | undefined;
  _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (this.offCanvas) {
      if (!this._show) {
        this.offCanvas.nativeElement.classList.add('show');
      } else {
        this.offCanvas.nativeElement.classList.remove('show');
      }
    }
  }
  _shop: any;
  @Input() set shop(value: any) {
    this._shop = value;
  }

  drinks = liquorProducts;
  currentPage = 1;
  pageSize = 2;
  _products: {
    _id: string;
    name: string;
    ingredients: string[];
    manufacturer: string;
    expiry: string;
    price: number;
    photo: string;
  }[] = [];

  constructor(private cartItemSerice: CartItemService) {}

  closeCanvas() {
    this.show = true;
  }
  ngOnInit(): void {
    this.calculation();
  }
  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.calculation();
  }
  calculation() {
    const end = this.currentPage * this.pageSize;
    const start = end - this.pageSize;
    this._products = this.drinks.slice(start, end);
  }
  getQty(liquor: any) {
    return this.cartItemSerice.getTotalCountOfCartItem(
      new CartItem(liquor),
      this._shop
    );
  }
  increateQty(liquor: any) {
    this.cartItemSerice.addItemToCart(new CartItem(liquor), this._shop);
  }
  decreaseQty(liquor: any) {
    this.cartItemSerice.removeItemFromCart(new CartItem(liquor), this._shop);
  }
}
