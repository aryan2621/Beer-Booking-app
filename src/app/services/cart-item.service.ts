import { Injectable } from '@angular/core';
import { CartItem } from '../model/products';
import { DB } from 'src/APIs/db/db';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor() {}

  getTotalCountOfCartItem(cartItem: CartItem, shop: any) {
    let count = 0;
    cartItem.shopName = shop && shop.name ? shop.name : '';
    cartItem.photo = shop && shop.photo ? shop.photo : '';
    const cartItems = JSON.parse(localStorage.getItem(DB.CART_ITEMS) || '[]');
    if (cartItems.length > 0) {
      cartItems.forEach((item: any) => {
        if (item.id === cartItem.id) {
          count = item.quantity;
        }
      });
    }
    return count;
  }
  addItemToCart(cartItem: CartItem, shop: any) {
    const cartItems = JSON.parse(localStorage.getItem(DB.CART_ITEMS) || '[]');
    let isItemExist = false;
    if (cartItems.length > 0) {
      cartItems.forEach((item: any) => {
        if (item.id === cartItem.id) {
          item.quantity += 1;
          isItemExist = true;
        }
      });
    }
    if (!isItemExist) {
      cartItem.quantity = 1;
      cartItems.push(cartItem);
    }
    cartItem.shopName = shop && shop.name ? shop.name : '';
    cartItem.photo = shop && shop.photo ? shop.photo : '';
    localStorage.setItem(DB.CART_ITEMS, JSON.stringify(cartItems));
  }
  removeItemFromCart(cartItem: CartItem, shop: any) {
    const cartItems = JSON.parse(localStorage.getItem(DB.CART_ITEMS) || '[]');
    if (cartItems.length > 0) {
      cartItems.forEach((item: any) => {
        if (item.id === cartItem.id) {
          item.quantity -= 1;
        }
      });
    }
    cartItem.shopName = shop && shop.name ? shop.name : '';
    cartItem.photo = shop && shop.photo ? shop.photo : '';
    localStorage.setItem(DB.CART_ITEMS, JSON.stringify(cartItems));
  }
  getAllCartItems() {
    return JSON.parse(localStorage.getItem(DB.CART_ITEMS) || '[]');
  }
  removeAllCartItems() {
    localStorage.removeItem(DB.CART_ITEMS);
  }
}
