import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../../services';
import { routes } from '../../../../consts';
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {

  res : any
  package: any = []
  id: number = 0;
  public routes: typeof routes = routes;
  constructor(
    private packageService: PackageService,
    private _route: ActivatedRoute,
    protected toastrService: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public idFind: number,
    ) {
    this.id = idFind
  }

  packageForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    unit: [0, [Validators.required]],
    rating: [0, [Validators.required]],
    server_group: ['', [Validators.required]],
    server: ['', [Validators.required]],
    attribute: ['', [Validators.required]],
    warehouse_quantity: [0, [Validators.required]],
    trade_count: [0, [Validators.required]],
    description_vi: ['', [Validators.required]],
    description_en: ['', [Validators.required]],
    delivery_time: ['', [Validators.required]],
  })

  onUpdateCategory() {
    if (this.id != 0) {
      this.packageService.updatePackage(this.id ,this.packageForm.value).subscribe(data => {
        this.toastrService.success('Chúc mừng bạn', 'Sửa thành công');
        console.log(this.packageForm.value)
        console.log(data)
      })
    } else {
      this.packageService.createPackage(this.packageForm.value).subscribe(data => {
        this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');
        console.log(this.packageForm.value)
        console.log(data)
      })
    }
  }

  findPackage() {
    if (this.id !== 0 && this.id !== null) {
      let res: any;
      this.packageService.getListPackage().subscribe(data => {
        res = data.filter(item => item['id'] == this.id)
        this.packageForm = new FormGroup({
          id: new FormControl(res[0].id),
          name: new FormControl(res[0].name),
          price: new FormControl(res[0].price),
          unit: new FormControl(res[0].unit),
          rating: new FormControl(res[0].rating),
          server_group: new FormControl(res[0].server_group),
          server: new FormControl(res[0].server),
          attribute: new FormControl(res[0].attribute),
          warehouse_quantity: new FormControl(res[0].warehouse_quantity),
          trade_count: new FormControl(res[0].trade_count),
          description_vi: new FormControl(res[0].description_vi),
          description_en: new FormControl(res[0].description_en),
          delivery_time: new FormControl(res[0].delivery_time)
        })
      })
    } else {
      this.id = 0;
    }
  }

  // getCategory() {
  //   this.categoriesService.getListCategory().pipe().subscribe(data => {
  //     this.categories = data['data'].filter(item => item['parentId'] == 0)
  //   })
  // }

  ngOnInit(): void {
    this.findPackage()
  }

}
