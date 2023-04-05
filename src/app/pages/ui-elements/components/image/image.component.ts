import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {AppSetting} from "../../../../appsetting";

//
@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input('imageProp') imageProp: String;
    @Input('imageRoomProp') imageRoomProp: String;
    @Input('url') public url: any;
    @Input('listImgCurrent') listImgCurrent: any;
    @Input('listRoomImgCurrent') listRoomImgCurrent: any;
    @Input('indexRoom') index: number;
    @Output() imageSrcUrl = new EventEmitter();
    @Output() indexRoomDelete = new EventEmitter();
    @Output() indexDelete = new EventEmitter<string>();
    @Input('multiple') multiple = true
    api_key = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImlhdCI6MTY4MDM1NzQyMiwiZXhwIjoxNjgwNDQzODIyfQ.eeRrMbearD3XA3OM63aI1ZcC0jCZAUEPGnofdrwLkJAFGvUSRgV1EjkI9cCfrLvo3wn9YrM0iG2088eQh0AJaw";

    public uploader: FileUploader = new FileUploader({
        url: AppSetting.BASE_SERVER_URL + '/api/file/upload',
        itemAlias: 'image',
        headers: [{ name: 'Autenfication', value: `Bearer ${this.api_key}` }]
    });
    public imageUrl = '';
    listImgPreview: SafeUrl[] = [];
    BASE_URL = AppSetting.BASE_SERVER_URL+"/api/file/upload";
//
    previewImg: SafeUrl;

//
    constructor(private toastr: ToastrService, private sanitizer: DomSanitizer) {
    }

//
    ngOnInit() {
        console.log('IMAGE :');
        console.log(this.listRoomImgCurrent);
        console.log(this.index);
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
            console.log('Uploaded File Details:', this.uploader);
            this.previewImg = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));
            this.listImgPreview.push(this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file))));
            console.log(this.listImgPreview)
            console.log(this.previewImg)
        };
        this.uploader.onCompleteItem = (data) => {
            console.log('Uploaded File Details:', data._xhr.response);
            this.imageUrl += data._xhr.response;
            this.imageSrcUrl.emit(this.imageUrl)
        };
        this.uploader.onCompleteAll = () => {
            // this.chatService.showNotification('success', 'File successfully uploaded!')
            this.toastr.success("file upload successfully")
        }
    }

//
    removeSelectedFile(i) {
        this.listImgPreview.splice(i, 1)
        this.uploader.queue[i].remove()
        this.indexDelete.emit(i)
        // this.chatService.showNotification('success', 'File remove Thành công')
        this.toastr.success("file upload success")
    }

    removeImageRoomCurrent(i: any) {
        console.log('zô');
        this.listRoomImgCurrent[this.index].splice(i, 1);
        console.log(this.listRoomImgCurrent[this.index]);
    }

//
    removeImageCurrent(i) {
        this.listImgCurrent.splice(i, 1);
    }

//
    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
           // readfile as data  url
            reader.onload = (event) => {
                // called  once  readAsDataURL is completed
                this.url = event.target.result;
            }
        }
        this.uploader.uploadAll();
    }
}

//
export enum ImageUpload {
    profile = 'profile'
}

//
//
