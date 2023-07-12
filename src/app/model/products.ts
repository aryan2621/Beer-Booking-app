export class CartItem {
  id: number = 0;
  name: string = '';
  quantity: number = 0;
  shopName: string = '';
  photo: string = '';
  constructor(json: any) {
    if (json) {
      this.id = json._id;
      this.name = json.name;
    }
  }
}

export class Cart {
  items: CartItem[] = [];
  constructor(cartItems: CartItem[]) {
    this.items = cartItems;
  }
}
