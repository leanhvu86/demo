// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {FileUploader} from 'ng2-file-upload';
// import {AppSetting} from '../../../appsetting';
// import {ToastrService} from 'ngx-toastr';
// import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
// import {ChatService} from '../../service/chat.service';
//
// @Component({
//     selector: 'app-image',
//     templateUrl: './image.component.html',
//     styleUrls: ['./image.component.scss']
// })
// export class ImageComponent implements OnInit {
//     @Input('imageProp') imageProp: String;
//     @Input('imageRoomProp') imageRoomProp: String;
//     @Input('url') private url: any;
//     @Input('listImgCurrent') listImgCurrent: any;
//     @Input('listRoomImgCurrent') listRoomImgCurrent: any;
//     @Input('indexRoom') index: number;
//     @Output() imageSrcUrl = new EventEmitter();
//     // @Output() indexRoomDelete = new EventEmitter();
//     @Output() indexDelete = new EventEmitter<string>();
//
//     // tslint:disable-next-line:no-input-rename
//     @Input('multiple') multiple = true
//
//     public uploader: FileUploader = new FileUploader({
//         url: AppSetting.BASE_SERVER_URL + '/api/upload',
//         itemAlias: 'image'
//     });
//     public imageUrl = '';
//     listImgPreview: SafeUrl[] = [];
//     BASE_URL = 'http://localhost:8000/api/images/';
//
//     // previewImg: SafeUrl;
//
//     constructor(private toastr: ToastrService, private sanitizer: DomSanitizer, private chatService: ChatService) {
//     }
//
//     ngOnInit() {
//         console.log('IMAGE :');
//         console.log(this.listRoomImgCurrent);
//         console.log(this.index);
//         this.uploader.onAfterAddingFile = (file) => {
//             file.withCredentials = false;
//             console.log('Uploaded File Details:', this.uploader);
//             // this.previewImg = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));
//             this.listImgPreview.push(this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file))));
//             console.log(this.listImgPreview)
//             // console.log(this.previewImg)
//         };
//         this.uploader.onCompleteItem = (data) => {
//             console.log('Uploaded File Details:', data._xhr.response);
//             this.imageUrl += data._xhr.response;
//             this.imageSrcUrl.emit(this.imageUrl)
//         };
//         this.uploader.onCompleteAll = () => {
//             this.chatService.showNotification('success', 'File successfully uploaded!')
//         }
//     }
//
//     removeSelectedFile(i) {
//         this.listImgPreview.splice(i, 1)
//         this.uploader.queue[i].remove()
//         this.indexDelete.emit(i)
//         this.chatService.showNotification('success', 'File remove Thành công')
//
//     }
//
//     removeImageRoomCurrent(i: any) {
//         console.log('zô');
//         this.listRoomImgCurrent[this.index].splice(i, 1);
//         console.log(this.listRoomImgCurrent[this.index]);
//     }
//
//     removeImageCurrent(i) {
//         this.listImgCurrent.splice(i, 1);
//     }
//
//     onSelectFile(event) {
//         if (event.target.files && event.target.files[0]) {
//             const reader = new FileReader();
//             reader.readAsDataURL(event.target.files[0]); // read file as data url
//             // tslint:disable-next-line:no-shadowed-variable
//             reader.onload = (event) => { // called once readAsDataURL is completed
//                 this.url = event.target.result;
//             }
//         }
//         this.uploader.uploadAll();
//     }
// }
//
// // export enum ImageUpload {
// //     profile = 'profile'
// // }
//
//
