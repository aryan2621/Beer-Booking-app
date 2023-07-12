import { Component } from '@angular/core';
import liquorStores from '../../../APIs/States-to-Shop';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  show = false;
  shop: any;
  shopList = liquorStores;
  places = [
    {
      name: 'New Delhi',
      img: 'https://curlytales.com/wp-content/uploads/2019/10/goibibo-1.jpg',
    },
    {
      name: 'Mumbai',
      img: 'https://www.treebo.com/blog/wp-content/uploads/2018/06/27-Iconic-Places-to-Visit-in-Mumbai-1.jpg',
    },
    {
      name: 'Kolkata',
      img: 'https://img.staticmb.com/mbcontent/images/uploads/2022/6/Howrah-bridge.jpg',
    },
  ];
  goToMenu(e: { show: boolean; shop: string }) {
    this.show = e.show;
    this.shop = e.shop;
  }
}
