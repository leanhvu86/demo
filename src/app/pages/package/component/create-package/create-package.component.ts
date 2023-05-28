import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PackageService} from '../../services';
import {routes} from '../../../../consts';
import {ToastrService} from "ngx-toastr";
import {MatDialog} from '@angular/material/dialog';
import {ServerComponent} from '../server/server.component';
import {GamesService} from "../../../games/services";
import {StarRatingColor} from "../../../ui-elements/components";

@Component({
    selector: 'app-create-package',
    templateUrl: './create-package.component.html',
    styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {

    public routes: typeof routes = routes;
    games: any = [];
    res: any
    listServer: any = []
    server: any = []
    serverGroup: any = []
    serverGroupName = ''
    id: number = 0;
    checkAdd: number = 0;
    identity: any = 999999999;
    url: '../../../../../assets/image/no-image.jpg';
    packageForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        price: [0, [Validators.required]],
        unit: [0, [Validators.required]],
        rating: [0, [Validators.required]],
        attribute: ['', [Validators.required]],
        warehouseQuantity: [0, [Validators.required]],
        // tradeCount: [0, [Validators.required]],
        descriptionVi: ['', [Validators.required]],
        descriptionEn: ['', [Validators.required]],
        // deliveryTime: ['', [Validators.required]],
        imageId: ['', [Validators.required]],
        gameId: ['', [Validators.required]],
    });
    public files: File;
    getImageId = '';
    rating: number = 3;
    starCount: number = 5;
    starColor: StarRatingColor = StarRatingColor.accent;
    starColorP: StarRatingColor = StarRatingColor.primary;
    starColorW: StarRatingColor = StarRatingColor.warn;
    serverForm: FormGroup = this.formBuilder.group({
        id: [0, [Validators.required]],
        packageId: [0, [Validators.required]],
        name: ['', [Validators.required]]
        // ,parentId: [0, [Validators.required]]
    });
    inputValue: any;

    constructor(
        private packageService: PackageService,
        private _route: ActivatedRoute,
        protected toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private matDialog: MatDialog,
        private gameService: GamesService
    ) {

    }

    ngOnInit(): void {
        if (this._route.snapshot.params["id"] === undefined) {
            this.id = 0;
        } else {
            this.id = this._route.snapshot.params["id"];
        }
        this.findPackage();
        this.getGames();
    }

    onRatingChanged(rating) {
        console.log(rating);
        this.rating = rating;
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
        this.onUpload()
    }

    onUpload() {
        const formData = new FormData();
        formData.append('file', this.files);
        formData.append('type', 'banner');
        this.gameService.uploadFile(formData).subscribe(data => {
            this.getImageId = data['data']['id']
        })
    }

    onUpdatePackage() {
        console.log(this.packageForm.value)
        if (this.getImageId === '') {
            this.toastrService.error('Bạn phải thêm ảnh cho gói', 'Lỗi');
            return;
        }
        if (!this.packageForm.valid && this.getImageId === '') {
            this.toastrService.error('Bạn phải nhập đầy đủ thông tin', 'Lỗi');
            return;
        }
        if (this.id != 0) {
            this.packageForm.value['imageId'] = this.getImageId;
            this.packageForm.value['rating'] = this.rating;
            this.packageForm.value['thumbnail'] = this.getImageId;
            let gamePackage = this.packageForm.value;
            gamePackage.server = this.serverGroup;
            this.packageService.updatePackage(this.id, gamePackage).subscribe(data => {
                this.toastrService.success('Chúc mừng bạn', 'Sửa thành công');
                console.log(this.packageForm.value)
                console.log(data)
            })
        } else {
            this.packageForm.value['imageId'] = this.getImageId;
            this.packageForm.value['thumbnail'] = this.getImageId;
            this.packageForm.value['rating'] = this.rating;
            let gamePackage = this.packageForm.value;
            gamePackage.server = this.serverGroup;
            this.packageService.createPackage(gamePackage).subscribe(data => {
                this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');
                console.log(this.packageForm.value)
                console.log(data)
            })
        }
    }

    getGames() {
        this.gameService.getListGame().pipe().subscribe(data => {
            this.games = data['data'];
        });
    }

    openServerDialog() {
        this.matDialog.open(ServerComponent, {
            width: '700px',
            height: '500px',
            data: {
                'listServer': this.listServer
            }
        })
            .afterClosed()
            .subscribe(returnData => {
                console.log(returnData)
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
                    // deliveryTime: new FormControl(res[0].deliveryTime, [Validators.required]),
                    imageId: new FormControl(res[0].imageId, [Validators.required]),
                    gamedId: new FormControl(res[0].gameId, [Validators.required])
                })
                this.getImageId = res[0].imageId;
                this.listServer = res[0].server;
                this.rating = res[0].rating;
            })
        } else {
            this.id = 0;
        }
    }


    checkAddStatus(id) {
        console.log(id)
        if (id !== undefined && id !== 0) {
            this.serverGroup = this.serverGroup.filter(server => server.id !== id);

        } else {
            this.createServer();
        }
    }

    addServer() {
        this.checkAdd === 1 ? this.checkAdd = 0 : this.checkAdd = 1;
    }

    createServer() {
        if (this.serverGroup.find(server => server.name.toLowerCase() === this.serverForm.controls['name'].value.toLowerCase())) {
            alert('Bạn không được thêm server trùng tên! ');
            return;
        }
        if (this.serverForm.controls['id'].value === 0) {
            this.serverForm.value['id'] = this.identity;
            this.identity++;
        }
        this.serverGroup.push(this.serverForm.value);
        this.inputValue = '';
        this.checkAdd = 0;
    }

    getServer(parId: number, listSer2: [], sgName: string) {
        this.serverGroupName = sgName
    }
}
