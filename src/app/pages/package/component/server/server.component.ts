import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../../services';
import { routes } from '../../../../consts';
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  res: any
  listServer: any = []
  server: any = []
  serverGroup: any = []
  serverGroupName = ''
  id: number = 0;
  checkAdd : number = 0;
  public routes: typeof routes = routes;
  constructor(
    private packageService: PackageService,
    private _route: ActivatedRoute,
    protected toastrService: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.listServer = data.listServer
    this.id = data.id
  }

  serverForm: FormGroup = this.formBuilder.group({
    packageId: [0, [Validators.required]],
    name: ['', [Validators.required]],
    parentId: [0, [Validators.required]]
  });

  getServerGroup(listSer1: []) {
    this.serverGroup = listSer1.filter(item => item['parentId'] == 0)
    this.server = listSer1.filter(item => item['parentId'] != 0)
  }

  getServer(parId: number, listSer2: [], sgName: string) {
    this.server = listSer2.filter(item => item['parentId'] == parId)
    this.serverGroupName = sgName
  }

  checkAddStatus() {
    if (this.checkAdd == 0) {
      this.checkAdd = 1;
    } else {
      this.createServer()
      this.checkAdd = 0;
    }
  }

  createServer() {
      this.serverGroup.push(this.serverForm.value)
  }

  ngOnInit(): void {
    this.getServerGroup(this.listServer)
  }
 
}
