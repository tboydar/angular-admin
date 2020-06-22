import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {Response} from "../../interfaces/response";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  lastPage: number;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(currentPage = 1) {
    this.userService.all(currentPage).subscribe(
      (res: Response) => {
        this.users = res.data;
        this.lastPage = res.meta.last_page;
      }
    )
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(
        res => {
          this.users = this.users.filter(el => el.id !== id);
        }
      );
    }
  }

  canAccess(permissions) {
    return Auth.canAccess(permissions);
  }
}
