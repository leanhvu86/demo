import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from '../../services';
import { routes } from '../../../../consts';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {

  res : any
  banner: any = []
  public files: File;
  url = '../../../../../assets/image/no-image.jpg';
  id: number = 0;
  public routes: typeof routes = routes;
  constructor(
    private bannerService: BannerService,
    private _route: ActivatedRoute,
    protected toastrService: ToastrService,
    private formBuilder: FormBuilder,
    ) {}

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    if (event.target.files) {
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event: any) => {
            this.url = event.target.result
        }
        this.files = event.target.files[0];
    }
}

onUpload() {
    const formData = new FormData();
    formData.append('file', this.files);
    formData.append('type', 'banner');
    this.bannerService.uploadFile(formData).subscribe(data => {
      this.toastrService.success('Thêm ảnh thành công');
    })
}
}
