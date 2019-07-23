import { Directive, ElementRef , Input, Renderer2, HostListener} from '@angular/core';

@Directive({
	selector: '[app-tooltip]'
})
export class TooltipDirective {


	private tooltipDiv = null;
	private renderer = null;
	private el = null;

	@Input('app-tooltip') content: string;
	constructor (el: ElementRef, renderer: Renderer2){
		this.renderer = renderer;
		this.el = el;
	}


	setPosition(): void {
		let targetElement = this.el.nativeElement;

		let bottom = window.innerHeight - targetElement.offsetTop;
		let left = targetElement.offsetLeft;
		this.renderer.setStyle(this.tooltipDiv, 'position', 'absolute');
		this.renderer.setStyle(this.tooltipDiv, 'bottom', bottom.toString()+"px");
		this.renderer.setStyle(this.tooltipDiv, 'left', left.toString()+"px");
		this.renderer.setStyle(this.tooltipDiv, 'border', '2px solid black');
		this.renderer.setStyle(this.tooltipDiv, 'padding', '5px');
		this.renderer.setStyle(this.tooltipDiv, 'background-color', 'white');

	}

	@HostListener('click')
	onClick(): void {

		if (!this.tooltipDiv){
			this.tooltipDiv = this.renderer.createElement('div');
			this.renderer.addClass(this.tooltipDiv, 'tooltip-div');

	        let text = this.renderer.createText(this.content);

	        let parent = this.el.nativeElement.parentNode;
	        let refPos= this.el.nativeElement;
	        this.setPosition();


	        this.renderer.appendChild(this.tooltipDiv, text);
			this.renderer.insertBefore(parent, this.tooltipDiv, refPos);
		}
	}

	@HostListener('blur')
	hideTooltip(): void {
		this.renderer.removeChild(this.el.nativeElement.parentNode, this.tooltipDiv);
		this.tooltipDiv = null;

	}
}