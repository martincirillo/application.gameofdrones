import { Directive, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { Spinner } from 'spin.js';

@Directive({
  selector: '[sucSpinner]'
})
export class SpinnerDirective implements OnInit, OnDestroy {
  /* Orientation can be inline-spinner-right */
  @Input('godSpinner') inlineOrientation: string = "";
  public spinner;
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    var opts = null;
    switch (this.inlineOrientation) {
      case "": {
        opts = {
          lines: 13, // The number of lines to draw
          length: 20, // The length of each line
          width: 8, // The line thickness
          radius: 30, // The radius of the inner circle
          scale: 0.4, // Scales overall size of the spinner
          corners: 1, // Corner roundness (0..1)
          color: '#2a2a2a', // CSS color or array of colors
					opacity: 0.25, // Opacity of the lines
          fadeColor: 'transparent', // CSS color or array of colors
          speed: 1.1, // Rounds per second
          rotate: 0, // The rotation offset
          animation: 'spinner-line-fade-more', // The CSS animation name for the lines
          direction: 1, // 1: clockwise, -1: counterclockwise
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          className: 'spinner', // The CSS class to assign to the spinner
          top: '50%', // Top position relative to parent
          left: '50%', // Left position relative to parent
          shadow: '0 0 2px transparent', // Box-shadow for the lines
          position: 'absolute' // Element positioning
        }
        break;
      }
    }

    this.spinner = new Spinner(opts).spin(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.spinner.stop();
  }
}
