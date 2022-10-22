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

  ngOnInit(): void {
    // init arrays
    this.clearAll();
  }

  /**
   * called When user submits the form
   */
  submit() {
    this.purchases?.push(Number(this.purchaseForm.value.amount));
    this.updateTotal();
    this.calculateChange();
    this.purchaseForm.reset();
  }

  /**
   * updates the total amount of purchases
   */
  updateTotal() {
    this.totalAmount = this.purchases?.reduce((partialSum, a) => partialSum + a, 0);
  }

  /**
   * calculates the number of banknotes and coins to give back to the client as change
   */
  calculateChange() {
    if (this.totalAmount) {
      this.resetChange();
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

/**
 * resets the number of banknotes and coins to give back to the client as change
 */
    resetChange() {
    this.tenBucks = new Array();
    this.fiveBucks = new Array();
    this.bucks = new Array();
  }

  /**
   * clears all purchases and associated data
   */
  clearAll() {
    this.purchaseForm.reset();
    this.purchases = new Array();
    this.resetChange();
    this.totalAmount = undefined;
  }

}
