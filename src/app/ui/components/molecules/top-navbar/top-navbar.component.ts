import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService }                   from 'src/app/core/services/auth.service';
import { Subscription }                  from 'rxjs';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName   = '';
  menuOpen   = false;
  private nameSub!: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.nameSub = this.auth.userName$.subscribe(name => {
      this.userName = name;
    });
  }

  ngOnDestroy(): void {
    this.nameSub.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onLogout(): void {
    this.auth.logout();
  }
}