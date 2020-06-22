import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: User = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
