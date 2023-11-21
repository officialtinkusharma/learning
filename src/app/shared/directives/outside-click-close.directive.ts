import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[OutsideClickClose]',
})
export class OutsideClickCloseDirective {
  constructor(private elementRef: ElementRef) {}

  @Output() public clickOutSide = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement) {
    event.stopPropagation();
    if (!targetElement) {
      return;
    }
    const clickInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickInside) {
      this.clickOutSide.emit(event);
    }
  }
}
