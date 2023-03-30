// import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
// import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
// import {ComponentPortal} from '@angular/cdk/portal';
// import {TooltipImgPreviewComponent} from './tooltip-img-preview.component';
//
// @Directive({
//     selector: '[appTooltipImgPre]'
// })
// export class TooltipImgPreviewDirective implements OnInit {
//
//     @Input('appTooltipImgPre') image: string;
//     private overlayRef: OverlayRef;
//
//     constructor(private overlay: Overlay,
//                 private overlayPositionBuilder: OverlayPositionBuilder,
//                 private elementRef: ElementRef) {
//     }
//
//     ngOnInit(): void {
//
//         const positionStrategy = this.overlayPositionBuilder
//             .flexibleConnectedTo(this.elementRef)
//             .withPositions([{
//                 originX: 'end',
//                 originY: 'bottom',
//                 overlayX: 'center',
//                 overlayY: 'bottom',
//                 offsetY: -8,
//             }]);
//
//         this.overlayRef = this.overlay.create({positionStrategy});
//     }
//
//     @HostListener('mouseenter')
//     show() {
//         const tooltipRef: ComponentRef<TooltipImgPreviewComponent>
//             = this.overlayRef.attach(new ComponentPortal(TooltipImgPreviewComponent));
//         tooltipRef.instance.image = this.image;
//         console.log(this.image);
//     }
//
//     @HostListener('mouseout')
//     hide() {
//         this.overlayRef.detach();
//     }
// }
