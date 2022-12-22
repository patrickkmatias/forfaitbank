import { Directive, HostBinding, HostListener, ElementRef, OnInit } from "@angular/core"

/**
 * It changes the max-width property accordingly to the parent's width.
 *
 * @export
 * @class MaxWidthDirective
 */
@Directive({
  selector: "[appMaxWidth]",
})
export class MaxWidthDirective implements OnInit {
  @HostBinding("style.max-width") maxWidth: string = ""

  constructor(private elementRef: ElementRef) {}

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.maxWidth = `${this.elementRef.nativeElement.offsetParent.offsetWidth}px`
  }

  ngOnInit(): void {
    this.maxWidth = `${this.elementRef.nativeElement.offsetParent.offsetWidth}px`
  }
}
