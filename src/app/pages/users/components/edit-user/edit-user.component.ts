import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id: number = 0;
  public routes: typeof routes = routes;
  constructor(private tableService: UsersService, private _route: ActivatedRoute) { }

  userForm: FormGroup = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl(),
    address: new FormControl(),
    phoneNumber: new FormControl(),
  })

  onUpdateUser(){
    this.tableService.updateUser(this.userForm.value).subscribe(data => {
      alert('Update thành công')
    })
  }

  findUser(idFind:number) {
    let res: any ;
    this.tableService.getListUser().subscribe( data => {
      res = data['data']['content'].filter(item => item['id'] == idFind)

      this.userForm = new FormGroup({
        id: new FormControl(res[0].id),
        fullName: new FormControl(res[0].fullName),
        address: new FormControl(res[0].address),
        phoneNumber: new FormControl(res[0].phoneNumber)
      })
    })
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.params["id"];
    this.findUser(this.id)
  }

}
