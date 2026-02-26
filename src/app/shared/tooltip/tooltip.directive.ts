import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTooltip]',
    standalone: true
})
export class TooltipDirective {
    @Input('appTooltip') tooltipText = '';

    private tooltipEl: HTMLElement | null = null;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter')
    onMouseEnter() {
        if (!this.tooltipText) return;

        this.tooltipEl = this.renderer.createElement('span');
        this.renderer.addClass(this.tooltipEl, 'zen-tooltip');
        this.renderer.setProperty(this.tooltipEl, 'textContent', this.tooltipText);
        this.renderer.appendChild(document.body, this.tooltipEl);

        const rect = this.el.nativeElement.getBoundingClientRect();
        const tipRect = this.tooltipEl!.getBoundingClientRect();

        this.renderer.setStyle(this.tooltipEl, 'top', `${rect.top - tipRect.height - 8 + window.scrollY}px`);
        this.renderer.setStyle(this.tooltipEl, 'left', `${rect.left + (rect.width / 2) - (tipRect.width / 2) + window.scrollX}px`);
        this.renderer.setStyle(this.tooltipEl, 'opacity', '1');
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        if (this.tooltipEl) {
            this.renderer.removeChild(document.body, this.tooltipEl);
            this.tooltipEl = null;
        }
    }
}
