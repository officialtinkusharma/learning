import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizeFromLeft]',
})
export class ResizeFromLeftDirective implements OnInit {
  dragging: boolean = false;
  @Input() resizableGrabWidth = 5;
  @Input() resizableMinWidth = 1;
  @Input() grabColor: string = 'transparent';
  @Input() resizeCursor = 'col-resize';
  constructor(private el: ElementRef) {
    function preventGlobalMouseEvents() {
      document.body.style['pointerEvents'] = 'none';
    }
    function restoreGlobalMouseEvents() {
      document.body.style['pointerEvents'] = 'auto';
    }
    const newWidth = (wid: number) => {
      const newWidth = Math.max(this.resizableMinWidth, wid);
      el.nativeElement.style.width = newWidth + 'px';
    };

    const mouseMoveG = (event: any) => {
      if (!this.dragging) {
        return;
      }
      newWidth(event.clientX - el.nativeElement.offsetLeft);
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
        el.nativeElement.style.cursor = this.resizeCursor;
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
    this.el.nativeElement.style[
      'border-right'
    ] = `${this.resizableGrabWidth}px solid ${this.grabColor}`;
  }
  inDragRegion(event: any): boolean {
    return (
      this.el.nativeElement.clientWidth -
        event.clientX +
        this.el.nativeElement.offsetLeft <
      this.resizableGrabWidth
    );
    // return (
    //   -(this.resizableGrabWidth / 2) <
    //     window.innerWidth -
    //       (this.el.nativeElement.clientWidth +
    //         event.clientX +
    //         (27 - this.resizableGrabWidth)) &&
    //   window.innerWidth -
    //     (this.el.nativeElement.clientWidth +
    //       event.clientX +
    //       (27 - this.resizableGrabWidth)) <
    //     this.resizableGrabWidth / 2
    // );
  }
}
