import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent implements OnChanges {

  @Input() icon!: string

  @Input() size: string = "normal"

  sizeClass: string = "w-6 h-6"

  constructor() {}

  ngOnChanges(): void {
    this.sizeClass =
      this.size === "normal"
        ? "w-6 h-6"
        : this.size === "small"
        ? "w-4 h-4"
        : this.size === "big"
        ? "w-8 h-8"
        : this.size === "extra"
        ? "w-10 h-10"
        : (this.size = "w-6 h-6")
  }

}
