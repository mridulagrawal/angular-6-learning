import { Directive, ElementRef, Renderer2, HostListener, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  // isOpen: Boolean = false;
  @HostBinding('class.open') isOpen: Boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('click') onDropDownClick(event: Event) {
    this.isOpen = !this.isOpen;
  }
  // commented code is my way of doing it without hostBinding
  // @HostListener('click') onDropDownClick(event: Event) {
  //   if (!this.isOpen) {
  //     this.renderer.addClass(this.elRef.nativeElement, 'open');
  //   } else {
  //     this.renderer.removeClass(this.elRef.nativeElement, 'open');
  //   }
  //   this.isOpen = !this.isOpen;
  // }

}
