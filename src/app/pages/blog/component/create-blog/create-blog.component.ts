import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../../services';
import {routes} from '../../../../consts';
import {ToastrService} from "ngx-toastr";
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-create-blog',
    templateUrl: './create-blog.component.html',
    styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

    public files: File;
    url = '../../../../../assets/image/no-image.jpg';
    getImageId = '';
    res: any;
    blogForm: FormGroup;
    successProcess = false;
    changeStatus = false;
    id: number = 0;
    public routes: typeof routes = routes;
    status: any;

    constructor(
        private blogService: BlogService,
        private _route: ActivatedRoute,
        protected toastrService: ToastrService,
        private formBuilder: FormBuilder,
    ) {
        this.blogForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            author: ['', [Validators.required]],
            imageId: ['', [Validators.required]],
            contentVI: ['', [Validators.required]],
            contentEN: ['', [Validators.required]],
            link: ['', [Validators.required]],
        })
    }

    onFileChanged(event: any) {
        if (event.target.files) {
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.url = event.target.result
            }
            this.files = event.target.files[0];
            // console.log(`Image size before compressed: ${this.files.size} bytes.`)
        }
        this.blogService.compress(this.files)
            .pipe(take(1))
            .subscribe(compressedImage => {
                this.files = compressedImage
                // console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
            })
        this.onUpload()
    }

    onUpload() {
        const formData = new FormData();
        formData.append('file', this.files);
        formData.append('type', 'banner');
        this.blogService.uploadFile(formData).subscribe(data => {
            if (data['status']!==200){
                this.toastrService.error('File upload lỗi vui long liên hệ admin', 'Lỗi');
            }else{
                this.getImageId = data['data']['id']
            }
        })
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.params["id"];
        this.findBlog(this.id);
    }

    onCreateBlog() {
        this.blogForm.value['imageId'] = this.getImageId;
        this.blogService.createBlog(this.blogForm.value).subscribe(data => {
            this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');
            this.successProcess = true;
        })
    }

    onUpdateBlog() {
        this.blogForm.value['imageId'] = this.getImageId;
        this.blogService.updateBlog(this.id, this.blogForm.value).subscribe(data => {
            this.toastrService.success('Chúc mừng bạn', 'Sửa thành công');
            this.successProcess = true;
        })
    }

    onChangeStatus() {

        this.blogService.changeStatus(this.id).subscribe(data => {
            this.toastrService.success('Update trạng thái thanh cong', 'Change status');
            this.changeStatus = true;
            this.status = data['data'].status;
        })
    }

    findBlog(idFind: number) {
        let res: any;
        let all: any;
        if (idFind == 0 || idFind == undefined) {
            return
        } else {
            this.blogService.getBlog(idFind).subscribe(data => {
                res = data['data']
                this.blogForm = this.formBuilder.group({
                    id: [res.id, [Validators.required]],
                    title: [res.title, [Validators.required]],
                    contentEN: [res.contentEN, [Validators.required]],
                    contentVI: [res.contentVI, [Validators.required]],
                    imageId: [res.imageId, [Validators.required]],
                    link: [res.link, [Validators.required]],
                    author: [res.author, [Validators.required]],
                })
                this.status = res.status;
                this.getImageId = res.imageId;
                this.url = res.imageUrl;
            })

        }
    }

}
