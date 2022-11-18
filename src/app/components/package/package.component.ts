import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Package } from 'src/app/models/package.model';
import { ColorGeneratorService } from 'src/app/services/color-generator.service';

@Component({
  selector: 'app-package',
  providers: [ColorGeneratorService],
  template: `
    <div class="flex flex-col justify-center items-center">
      <div
        #h1wrapper
        class="w-12 h-12 -mb-6 relative z-10 flex justify-center items-center text-3xl rounded-md shadow-lg"
      >
        <h1 #h1>🧳</h1>
      </div>
      <ul
        #ul
        class="relative z-0 rounded-md pt-7 pb-1 px-2 text-center w-32 h-auto shadow-lg font-medium"
      >
        <li class="flex justify-between">
          <span>💵</span
          ><span class="flex items-center text-slate-900 text-sm">{{
            pkg.billType | currency: 'BRL'
          }}</span>
        </li>
        <li class="flex justify-between">
          <span>🔢</span
          ><span class="flex items-center text-slate-900 text-sm">{{ pkg.billQuantity }}</span>
        </li>
        <li class="flex justify-between">
          <span class="pl-[0.1rem]">💰</span
          ><span class="flex items-center text-slate-900 text-sm">{{
            pkg.totalValue | currency: 'BRL'
          }}</span>
        </li>
      </ul>
    </div>
  `,
})
export class PackageComponent implements AfterViewInit {
  @ViewChild('ul') ul!: ElementRef;
  @ViewChild('h1') h1!: ElementRef;
  @ViewChild('h1wrapper') h1wrapper!: ElementRef;
  @Input('package') pkg!: Package;

  constructor(private renderer: Renderer2, private cg: ColorGeneratorService) {}

  ngAfterViewInit(): void {
    let palette = this.cg.generateColorPalette(this.pkg.color);

    let filter = this.cg.correctIconColor(this.pkg.color);

    // add random background color
    this.renderer.setStyle(
      this.ul.nativeElement,
      'background-color',
      palette[200]
    );
    this.renderer.setStyle(
      this.h1wrapper.nativeElement,
      'background-color',
      palette[500]
    );
    this.renderer.setStyle(this.h1.nativeElement, 'filter', filter);
  }
}
