import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowModalPlacement]',
})
export class ShowModalPlacementDirective implements OnInit {
  constructor(private el: ElementRef) {
    // console.log(el.nativeElement.clientX, 'el');
    if (el.nativeElement.offsetLeft <= 0) {
      el.nativeElement.style.left = 0;
    }
  }
  ngOnInit(): void {
    // console.log(this.el);
  }
}
