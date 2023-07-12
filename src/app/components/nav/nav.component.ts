import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserData } from 'src/app/model/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @ViewChild('navRef', { static: false }) navRef: ElementRef | undefined;
  showNav = false;
  user: UserData | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = new UserData(user);
        this.authService.storeInLocalStorage(this.user);
      } else {
        this.user = null;
        this.authService.clearLocalStorage();
      }
    });
  }

  toggleNav(): void {
    this.showNav = !this.showNav;
  }
  logOut(): void {
    this.authService.logOut();
    this.authService.clearLocalStorage();
    this.user = null;
  }
  login(): void {
    this.authService.siginInWithGoogle();
  }
  timeToTime = (epoch: string | undefined) => {
    if (!epoch) return 'Not available';
    let date = new Date(parseInt(epoch));
    return date.getHours() + ':' + date.getMinutes();
  };
  timeToExp(time: number | undefined) {
    if (!time) return 'Not available';
    const date = new Date(time);
    return date.getHours() + ':' + date.getMinutes();
  }
}
