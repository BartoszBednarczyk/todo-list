import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  constructor(private el: ElementRef) {}
  @Input() appHighlight = '';
  colors: any = {
    clouds: '#ecf0f1',
    emerald: '#2ecc71',
    peterRiver: '#3498db',
    amethyst: '#9b59b6',
    wetAsphalt: '#34495e',
    sunFlower: '#f1c40f',
    carrot: '#e67e22',
    alizarin: '#e74c3c',
  };
  ngOnInit() {
    console.log('color: ' + this.appHighlight);
    this.el.nativeElement.style.backgroundColor =
      this.colors[this.appHighlight];
  }
}
