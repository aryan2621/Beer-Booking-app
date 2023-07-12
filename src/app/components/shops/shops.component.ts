import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
})
export class ShopsComponent implements OnInit {
  @Output() menu = new EventEmitter<{
    show: boolean;
    shop: string;
  }>();
  currentPage = 1;
  pageSize = 5;
  @Input() shopList: any;
  _liquorStores: {
    name: string;
    address: string;
    rating: number;
    openingHours: string;
    photo: string;
  }[] = [];

  show = false;
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
    this._liquorStores = this.shopList.slice(start, end);
  }
  getStars(rating: number) {
    const whole = Math.floor(rating);
    const half = rating - whole;
    let star = '⭐';
    for (let i = 0; i < whole; i++) {
      const stars = [];
      star += ' ⭐';
    }
    return star;
  }
  goToMenu(shop: any) {
    this.show = !this.show;
    this.menu.emit({
      show: this.show,
      shop: shop,
    });
  }
}
