import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Response} from "../../../interfaces/response";
import {OrderItem} from "../../../interfaces/order-item";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  orderItems: OrderItem[] = []

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.orderService.get(params.id).subscribe(
          (res: Response) => {
            this.orderItems = res.data.order_items;
          }
        )
      }
    )
  }

}
