import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BannerService} from '../../services';
import {routes} from '../../../../consts';
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-create-banner',
    templateUrl: './create-banner.component.html',
    styleUrls: ['./create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {

    res: any;
    banner: any = [];
    public files: File;
    url = '../../../../../assets/image/no-image.jpg';
    id: string;
    public routes: typeof routes = routes;
    bannerForm: FormGroup;

    constructor(
        private bannerService: BannerService,
        private _route: ActivatedRoute,
        protected toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CreateBannerComponent>
    ) {
    }

    ngOnInit(): void {
        this.bannerForm = this.formBuilder.group({
            fileId: '',
            imageUrl: ''
        });
    }

    onFileChanged(event: any) {
        if (event.target.files) {
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.url = event.target.result;
            }
            this.files = event.target.files[0];
            const formData = new FormData();
            formData.append('file', this.files);
            formData.append('type', 'banner');
            this.bannerService.uploadFile(formData).subscribe(data => {
                if (data['status']!==200){
                    this.toastrService.error('File upload lỗi vui long liên hệ admin', 'Lỗi');
                }else{
                    this.url = data['data'].url;
                    this.id = data['data'].id;
                }


            });
        }
    }

    onUpload() {
        this.bannerForm.value['fileId'] = this.id;
        this.bannerForm.value['imageUrl'] = this.url;
        this.bannerService.createBanner(this.bannerForm.value).subscribe(data => {
            this.toastrService.success('Thêm banner thành công');
            this.dialogRef.close();
        });
    }

}
