import { ColorGeneratorService } from "../services/color-generator.service";

export class Package {
  noteType: number;
  noteQuantity: number;
  totalValue: number;
  color: string;

  constructor(
    noteType: number,
    noteQuantity: number,
  ) {
    let cg = new ColorGeneratorService();
    this.noteType = noteType;
    this.noteQuantity = noteQuantity;
    this.totalValue = noteType * noteQuantity;
    this.color = cg.generateRandomHexColor();
  }
}
