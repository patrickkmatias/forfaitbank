import { ColorGeneratorService } from '../services/color-generator.service';
import { Operation } from './operation.model';

export class Package {
  billType: number;
  billQuantity: number;
  totalValue: number;
  color: string;
  isClosed: boolean;
  parentsOperations: Operation[];

  constructor(billType: number, billQuantity: number, po: Operation[]) {

    let MAX_BILL_QUANTITY = 50;

    if (billType == 10 || 50 || 100) {
      this.billType = billType;
    } else {
      throw new Error('Invalid bill; valid bills are: 10, 50 and 100.');
    }

    if (billQuantity <= MAX_BILL_QUANTITY) {
      this.billQuantity = billQuantity;
    } else {
      throw new Error('Package bill quantity cannot be over 50.');
    }

    let cg = new ColorGeneratorService();
    this.totalValue = billType * billQuantity;
    this.color = cg.generateRandomHexColor();
    this.isClosed = billQuantity == 50 ? true : false;
    this.parentsOperations = po;
  }
}
