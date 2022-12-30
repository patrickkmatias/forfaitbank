import { Component, Input, OnChanges } from "@angular/core"

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
})
export class IconComponent implements OnChanges {
  @Input() icon!:
    | "spinner-loader"
    | "spinner-loader-relative"
    | "adjustments"
    | "add"
    | "close"
    | "three-dots"
    | "chevron-right"
    | "trash-can"
    | "check"
    | "alert"
    | "question"
    | "return"

  @Input() size: "normal" | "xs" | "sm" | "lg" | "xl" = "normal"

  sizeClass: string = "w-6 h-6"

  constructor() {}

  ngOnChanges(): void {
    this.sizeClass =
      this.size === "normal"
        ? "w-6 h-6"
        : this.size === "xs"
        ? "w-3 h-3"
        : this.size === "sm"
        ? "w-4 h-4"
        : this.size === "lg"
        ? "w-8 h-8"
        : this.size === "xl"
        ? "w-10 h-10"
        : "w-6 h-6"
  }
}
