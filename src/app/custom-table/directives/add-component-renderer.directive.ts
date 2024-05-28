import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddComponentRenderer]',
})
export class AddComponentRendererDirective {
  @Input() cellParam: any;
  @Input() col: any;
  constructor(private vcf: ViewContainerRef) {
    // console.log(vcf.nativeElement)
    // vcf.nativeElement.createComponent(this.col?.cellRenderer)
  }
  ngOnInit() {
    this.vcf?.clear();

    let ref: any = this.vcf.createComponent(this.col?.cellRenderer);

    ref.instance.tableInit(this.cellParam);
  }
}
