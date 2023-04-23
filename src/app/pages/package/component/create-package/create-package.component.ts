import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../../services';
import { routes } from '../../../../consts';
import { ToastrService } from "ngx-toastr";
import { MatDialog } from '@angular/material/dialog';
import { ServerComponent } from '../server/server.component';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {

  res : any
  listServer: any = []
  id: number = 0;
  public routes: typeof routes = routes;
  constructor(
    private packageService: PackageService,
    private _route: ActivatedRoute,
    protected toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
    ) {
  }

  packageForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    unit: [0, [Validators.required]],
    rating: [0, [Validators.required]],
    attribute: ['', [Validators.required]],
    warehouseQuantity: [0, [Validators.required]],
    tradeCount: [0, [Validators.required]],
    descriptionVi: ['', [Validators.required]],
    descriptionEn: ['', [Validators.required]],
    deliveryTime: ['', [Validators.required]],
    imageId: ['', [Validators.required]],
  })

  onUpdatePackage() {
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

  openServerDialog() {
    this.matDialog.open(ServerComponent, {
      width: '700px',
      height: '500px',
      data: {
        'listServer' : this.listServer,
        'id' : this.id
      }
    })
    .afterClosed()
    .subscribe(shouldReload => {
      window.location.reload()
    });
  }

  findPackage() {
    if (this.id !== 0 && this.id !== undefined) {
      let res: any;
      this.packageService.getListPackage().subscribe(data => {
        res = data.filter(item => item['id'] == this.id)
        this.packageForm = new FormGroup({
          id: new FormControl(res[0].id),
          name: new FormControl(res[0].name, [Validators.required]),
          price: new FormControl(res[0].price, [Validators.required]),
          unit: new FormControl(res[0].unit, [Validators.required]),
          rating: new FormControl(res[0].rating, [Validators.required]),
          attribute: new FormControl(res[0].attribute, [Validators.required]),
          warehouseQuantity: new FormControl(res[0].warehouseQuantity, [Validators.required]),
          tradeCount: new FormControl(res[0].tradeCount, [Validators.required]),
          descriptionVi: new FormControl(res[0].descriptionVi, [Validators.required]),
          descriptionEn: new FormControl(res[0].descriptionEn, [Validators.required]),
          deliveryTime: new FormControl(res[0].deliveryTime, [Validators.required]),
          imageId: new FormControl(res[0].imageId, [Validators.required])
        })
        this.listServer = res[0].server
      })
    } else {
      this.id = 0;
    }
  }

  ngOnInit(): void {
    if (this._route.snapshot.params["id"] === undefined) {
      this.id = 0;
    } else {
      this.id = this._route.snapshot.params["id"];
    }
    this.findPackage()
  }

}
