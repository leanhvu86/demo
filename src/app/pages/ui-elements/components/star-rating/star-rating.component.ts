// import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
//
// @Component({
//     selector: 'app-star-rating',
//     templateUrl: './star-rating.component.html',
//     styleUrls: ['./star-rating.component.css'],
//     encapsulation: ViewEncapsulation.Emulated
// })
// export class StarRatingComponent implements OnInit {
//
//
//     // tslint:disable-next-line:no-input-rename
//     @Input('rating') private rating = 3;
//     // tslint:disable-next-line:no-input-rename
//     @Input('starCount') private starCount = 5;
//     // tslint:disable-next-line:no-input-rename
//     @Input('color') private color = 'accent';
//     @Output() private ratingUpdated = new EventEmitter();
//
//     private snackBarDuration = 2000;
//     private ratingArr = [];
//
//     constructor() {
//     }
//
//
//     ngOnInit() {
//         console.log('a ' + this.starCount)
//         for (let index = 0; index < this.starCount; index++) {
//             this.ratingArr.push(index);
//         }
//     }
//
//     onClick(rating: number) {
//         // this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
//         //     duration: this.snackBarDuration
//         // });
//         this.ratingUpdated.emit(rating);
//         return false;
//     }
//
//     showIcon(index: number) {
//         if (this.rating >= index + 1) {
//             return 'star';
//         } else {
//             return 'star_border';
//         }
//     }
// }
//
// export enum StarRatingColor {
//     primary = 'primary',
//     accent = 'accent',
//     warn = 'warn',
//     warning = 'success'
// }
