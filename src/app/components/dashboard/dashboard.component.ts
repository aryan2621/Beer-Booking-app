import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  scrollTo(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
