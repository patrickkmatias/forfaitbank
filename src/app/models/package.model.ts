import { ColorGeneratorService } from '../services/color-generator.service';
import { Operation } from './operation.model';

export class Package {
  billType: number;
  billQuantity: number;
  status: string;
  parentsOperations: Operation[];
  totalValue: number;
  color: string;

  constructor(billType: number, billQuantity: number, parentsOperations: Operation[]) {

    if (billType == 10 || 50 || 100) {
      this.billType = billType;
    } else {
      throw new Error('Invalid bill; valid bills are: 10, 50 and 100.');
    }

    const MAX_BILL_QUANTITY = 50;

    if (billQuantity <= MAX_BILL_QUANTITY) {
      this.billQuantity = billQuantity;
    } else {
      throw new Error('Package bill quantity cannot be over 50.');
    }

    let cg = new ColorGeneratorService();
    this.totalValue = billType * billQuantity;
    this.color = cg.generateRandomHexColor();
    this.status = billQuantity == 50 ? 'closed' : 'opened';
    this.parentsOperations = parentsOperations;
  }
}
