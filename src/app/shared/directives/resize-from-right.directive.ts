import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizeFromRight]',
})
export class ResizeFromRightDirective implements OnInit {
  @Input() resizableMinWidth: number = 90;
  @Input() resizableWidth: any = 100; //
  @Input() resizableGrabWidth: number = 5;
  dragging: boolean = false;
  x: any;
  w: any;
  dx = 0;
  constructor(private el: ElementRef) {
    const self = this;
    function preventGlobalMouseEvents() {
      document.body.style['pointerEvents'] = 'none';
    }
    function restoreGlobalMouseEvents() {
      document.body.style['pointerEvents'] = 'auto';
    }
    const newWidth = (wid: number) => {
      const newWidth = Math.max(this.resizableMinWidth, wid);
      el.nativeElement.style.width = `${newWidth}px`;
      // console.log(el.nativeElement.style.width);
    };
    const mouseMoveG = (event: any) => {
      if (!this.dragging) {
        return;
      }
      console.log(
        event.clientX,
        el.nativeElement.offsetLeft,
        el.nativeElement.clientX
      );
      if (event.clientX > el.nativeElement.offsetLeft) {
      }
      let divStyle = window.getComputedStyle(el.nativeElement, undefined);
      let wi = parseInt(divStyle.width, 10);
      newWidth(2 * (el.nativeElement.offsetLeft - event.clientX + wi));
    };
    const mouseUpG = (event: any) => {
      if (!this.dragging) {
        return;
      }
      restoreGlobalMouseEvents();
      this.dragging = false;
      event.stopPropagation();
    };
    const mouseDown = (event: any) => {
      if (this.inDragRegion(event)) {
        this.dragging = true;
        preventGlobalMouseEvents();
        event.stopPropagation();
      }
    };
    const mouseMove = (event: any) => {
      if (this.inDragRegion(event) || this.dragging) {
        el.nativeElement.style.cursor = 'col-resize';
      } else {
        el.nativeElement.style.cursor = 'default';
      }
    };
    document.addEventListener('mousemove', mouseMoveG, true);
    document.addEventListener('mouseup', mouseUpG, true);
    el.nativeElement.addEventListener('mousedown', mouseDown, true);
    el.nativeElement.addEventListener('mousemove', mouseMove, true);
  }
  ngOnInit(): void {
    this.el.nativeElement.style.overflow = `hidden`;
    this.el.nativeElement.style['border-left'] =
      this.resizableGrabWidth + 'px solid #e4e4e4';
    this.el.nativeElement.style.height = '100vh';
  }
  inDragRegion(event: any) {
    return (
      this.resizableGrabWidth > event.clientX - this.el.nativeElement.offsetLeft
    );
  }
}
