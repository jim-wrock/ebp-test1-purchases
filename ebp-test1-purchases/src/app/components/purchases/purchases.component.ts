import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  purchases: number[] | undefined;
  totalAmount: number | undefined;
  tenBucks: number[] | undefined;
  fiveBucks: number[] | undefined;
  bucks: number[] | undefined;

  constructor() { }

  purchaseForm = new FormGroup({
    amount: new FormControl(''),
  });

  preview: number | undefined;

  ngOnInit(): void {
    this.clearAll();
  }

  save() {
    this.purchases?.push(Number(this.purchaseForm.value.amount));
    console.log("this.purchases = ", this.purchases);
    this.updateTotal();
  }

  updateTotal() {
    this.totalAmount = this.purchases?.reduce((partialSum, a) => partialSum + a, 0);
    this.calculateChange();
  }

  clearAll() {
    this.purchaseForm.setValue({amount: ''});
    this.purchases = new Array();
    this.tenBucks = new Array();
    this.fiveBucks = new Array();
    this.bucks = new Array();
    this.totalAmount = 0;
  }

  calculateChange() {
    if (this.totalAmount) {
      const tenBucks = Math.floor(this.totalAmount / 10);
      for (let index = 0; index < tenBucks; index++) {
        this.tenBucks?.push(1);
      }
      let rest = this.totalAmount - (tenBucks * 10);
      const fiveBucks = Math.floor(rest / 5);
      for (let index = 0; index < fiveBucks; index++) {
        this.fiveBucks?.push(1);
      }
      rest = rest - (fiveBucks * 5);
      const bucks = Math.floor(rest / 1);
      for (let index = 0; index < bucks; index++) {
        this.bucks?.push(1);
      }
    }
  }

}
