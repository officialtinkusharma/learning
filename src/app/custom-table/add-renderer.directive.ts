import { Directive, ElementRef, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddRenderer]'
})
export class AddRendererDirective implements OnInit {
  @Input() cellParam: any;
  @Input() col: any;
  constructor(private el: ViewContainerRef) {
    // console.log(el.nativeElement)
    // el.nativeElement.createComponent(this.col?.cellRenderer)
  }
  ngOnInit() {
    this.el?.clear();
    let ref: any = this.el.createComponent(this.col?.cellRenderer);
    ref.instance.tableInit(this.cellParam)
  }
}
