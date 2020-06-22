import { Component, OnInit } from '@angular/core';
import {Role} from "../../interfaces/role";
import {RoleService} from "../../services/role.service";
import {Response} from "../../interfaces/response";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.all().subscribe(
      (res: Response) => {
        this.roles = res.data;
      }
    )
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.roleService.delete(id).subscribe(
        res => {
          this.roles = this.roles.filter(el => el.id !== id);
        }
      );
    }
  }

  canAccess(permissions) {
    return Auth.canAccess(permissions);
  }
}
