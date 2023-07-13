import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import liquorDrinks from '../../../APIs/Shops-to-Drinks';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @ViewChild('successModal') successModal: TemplateRef<any>;
  products: {
    name: string;
    id: string;
    quantity: number;
    shopName: string;
    photo: string;
  }[] = [];
  paymentRequest!: google.payments.api.PaymentDataRequest;

  modalRef?: BsModalRef;
  constructor(
    private cartItemService: CartItemService,
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  trackProduct(index: number, product: any) {
    return product ? product.id : undefined;
  }
  getPrice(qty: number, id: string) {
    const index = Number(id);
    const price = liquorDrinks[index].price;
    return qty * price;
  }
  getTotalPrice() {
    let total = 0;
    this.products.forEach((product) => {
      total += this.getPrice(product.quantity, product.id);
    });
    return total;
  }
  getDiscount() {
    return this.getTotalPrice() * 0.05;
  }
  getShipping() {
    return this.getTotalPrice() * 0.1;
  }
  getGrandTotal() {
    return (
      this.getTotalPrice() -
      this.getDiscount() +
      this.getShipping()
    ).toFixed(2);
  }
  ngOnInit(): void {
    this.products = this.cartItemService.getAllCartItems();
    this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant (You will Not be charged)',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: this.getGrandTotal().toString(),
        currencyCode: 'INR',
        countryCode: 'IN',
      },
      shippingAddressRequired: true,
    };
  }
  onLoadPaymentData(e: any) {
    this.modalRef = this.modalService.show(this.successModal);
    this.cartItemService.removeAllCartItems();
    this.products = [];
  }
}
