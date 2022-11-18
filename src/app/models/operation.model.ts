import { Package } from './package.model';

export class Operation {
  name: string;
  value: number;
  billType: number;
  packages: Package[];

  /**
   * Creates an instance of Operation.
   * @param {string} n Name
   * @param {number} v Value
   * @param {number} bt Bill type
   * @memberof Operation
   */
  constructor(n: string, v: number, bt: number) {
    const MAX_OP_VALUE = 5000;

    this.name = n;

    if (v <= MAX_OP_VALUE) {
      this.value = v;
    } else {
      this.value = MAX_OP_VALUE;
      this.createChildOperation(v - MAX_OP_VALUE);
    }

    if (bt == 10 || 50 || 100) {
      this.billType = bt;
    } else {
      throw new Error('Invalid bill; valid bills are: 10, 50 and 100.');
    }

    this.packages = this.generatePackages(v, bt)
  }

  /**
   * Creates a child operation with the
   * remaining value of the parent operation
   *
   * @private
   * @param {number} v Value
   * @memberof Operation
   */
  private createChildOperation(v: number) {
    // new Operation()
  }

  /**
   * Generate packages accordingly the value and
   * the bill type of the operation
   *
   * @private
   * @param {number} v Value
   * @param {number} bt Bill type
   * @memberof Operation
   */
  private generatePackages(v: number, bt: number): Package[] {

    let packages: Package[] = [];

    let totalClosedPackages = Math.round(v / bt);

    for (let i = totalClosedPackages; i > 0; i - 1) {
      packages.push(new Package(bt, 50, [this]))
    }

    return packages;
  }
}
