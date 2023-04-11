import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services';
import { routes } from '../../../../consts';
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  res : any
  categories: any = []
  id: number = 0;
  public routes: typeof routes = routes;
  constructor(
    private categoriesService: CategoriesService,
    private _route: ActivatedRoute,
    protected toastrService: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public idFind: number,
    ) {
    this.id = idFind
  }

  categoryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [''],
    parentCategoryId: [0, [Validators.required]],
  })

  hasValue() {
    return Object['values'](this.categoryForm.value).join('').length > 0
  }

  onUpdateCategory() {
    if (this.id != 0) {
      this.categoriesService.updateCategory(this.categoryForm.value).subscribe(data => {
        this.toastrService.success('Chúc mừng bạn', 'Sửa thành công');
        console.log(this.categoryForm.value)
        console.log(data)
      })
    } else {
      this.categoriesService.createCategory(this.categoryForm.value).subscribe(data => {
        this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');
        console.log(this.categoryForm.value)
        console.log(data)
      })
    }
  }

  findCategory() {
    if (this.id !== 0) {
      let res: any;
      this.categoriesService.getListCategory().subscribe(data => {
        res = data['data'].filter(item => item['id'] == this.id)
        this.categoryForm = new FormGroup({
          id: new FormControl(res[0].id),
          name: new FormControl(res[0].name),
          description: new FormControl(res[0].description),
          parentCategoryId: new FormControl(res[0].parentId)
        })
      })
    }
  }

  getCategory() {
    this.categoriesService.getListCategory().pipe().subscribe(data => {
      this.categories = data['data'].filter(item => item['parentId'] == 0)
    })
  }

  ngOnInit(): void {
    this.findCategory()
    this.getCategory()
  }

}
