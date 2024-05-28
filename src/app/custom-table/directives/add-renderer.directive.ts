import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddRenderer]',
})
export class AddRendererDirective implements OnInit {
  @Input() cellParam: any;
  @Input() col: any;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.el.nativeElement.innerHTML = this.col?.cellRenderer(this.cellParam);
  }
}
