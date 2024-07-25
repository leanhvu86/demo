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
    res: any;
    listServer: any = [];
    server: any = [];
    serverGroup: any = [];
    removeServer: any = [];
    serverGroupName = ''
    id: number = 0;
    endProcess = false;
    changeStatus = false;
    checkAdd: number = 0;
    identity: any = 999999999;
    url: '../../../../../assets/image/no-image.jpg';
    packageForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        price: [0, [Validators.required]],
        unit: [0, [Validators.required]],
        rating: [0, [Validators.required]],
        attribute: ['', [Validators.required]],
        warehouseQuantity: [1000, [Validators.required]],
        tradeCount: [0, [Validators.required]],
        descriptionVi: ['', [Validators.required]],
        descriptionEn: ['', [Validators.required]],
        // deliveryTime: ['', [Validators.required]],
        imageId: ['', [Validators.required]],
        gameId: [0, [Validators.required]],
        topSale: ['', [Validators.required]],
    });
    public files: File;
    getImageId = '';
    canDeleteFile: boolean = true;
    rating: number = 3;
    starCount: number = 5;
    starColor: StarRatingColor = StarRatingColor.accent;
    starColorP: StarRatingColor = StarRatingColor.primary;
    starColorW: StarRatingColor = StarRatingColor.warn;
    serverForm: FormGroup = this.formBuilder.group({
        id: [0, [Validators.required]],
        packageId: [0],
        name: ['', [Validators.required]],
        gameId: [0]
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
            this.getImageId = data['data']['id'];
            this.canDeleteFile = false;
            this.onUpdatePackage();
        });
    }

    onUpdatePackage() {
        if (this.getImageId === '') {
            this.toastrService.error('Bạn phải thêm ảnh cho gói', 'Lỗi');
            return;
        }
        if (this.packageForm.controls['name'].value === '') {
            this.toastrService.error('Bạn phải nhập đầy đủ tên gói SP', 'Lỗi');
            return;
        }
        if (this.packageForm.controls['price'].value === '0') {
            this.toastrService.error('Bạn phải nhập đầy đủ giá gói SP', 'Lỗi');
            return;
        }
        if (this.packageForm.controls['unit'].value === '') {
            this.toastrService.error('Bạn phải nhập đầy đủ đơn vị gói SP', 'Lỗi');
            return;
        }
        if (this.packageForm.controls['attribute'].value === '') {
            this.toastrService.error('Bạn phải nhập đầy đủ category gói SP', 'Lỗi');
            return;
        }
        if (this.packageForm.controls['descriptionVi'].value === '') {
            this.toastrService.error('Bạn phải nhập đầy đủ mô tả gói SP', 'Lỗi');
            return;
        }
        if (this.packageForm.controls['descriptionEn'].value === '') {
            this.toastrService.error('Bạn phải nhập đầy đủ mô tả gói SP', 'Lỗi');
            return;
        }
        if (this.packageForm.controls['gameId'].value === '0') {
            this.toastrService.error('Bạn phải nhập đầy đủ loại game của gói SP', 'Lỗi');
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
                this.endProcess = true;
            })
        } else {
            this.packageForm.value['imageId'] = this.getImageId;
            this.packageForm.value['thumbnail'] = this.getImageId;
            this.packageForm.value['rating'] = this.rating;
            let gamePackage = this.packageForm.value;
            gamePackage.server = this.serverGroup;
            this.packageService.createPackage(gamePackage).subscribe(data => {
                this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');
                this.endProcess = true;
            })
        }
    }

    onChangeStatus() {
        if (confirm("Xac nhan thay đổi status ?")) {
            this.packageService.deletePackage(this.id).subscribe(data => {
                this.toastrService.success('Chúc mừng bạn', 'Update status thành công');
                this.changeStatus = true;
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
            this.packageService.getPackage(this.id).subscribe(data => {
                res = data['data'];
                this.packageForm = new FormGroup({
                    id: new FormControl(res.id),
                    name: new FormControl(res.name, [Validators.required]),
                    price: new FormControl(res.price, [Validators.required]),
                    unit: new FormControl(res.unit, [Validators.required]),
                    rating: new FormControl(res.rating, [Validators.required]),
                    attribute: new FormControl(res.attribute, [Validators.required]),
                    warehouseQuantity: new FormControl(res.warehouseQuantity, [Validators.required]),
                    tradeCount: new FormControl(res.tradeCount, [Validators.required]),
                    descriptionVi: new FormControl(res.descriptionVi, [Validators.required]),
                    descriptionEn: new FormControl(res.descriptionEn, [Validators.required]),
                    // deliveryTime: new FormControl(res.deliveryTime, [Validators.required]),
                    imageId: new FormControl(res.imageId, [Validators.required]),
                    gameId: new FormControl(res.gameId, [Validators.required]),
                    topSale: new FormControl(res.topSale, [Validators.required])
                });
                this.getImageId = res.imageId;
                this.serverGroup = res.server;
                this.rating = res.rating;
                this.url = res.previewUrl;
                console.log(res.imageId);
                if (res.imageId !== '') {
                    this.canDeleteFile = false;
                }
            })
        } else {
            this.id = 0;
        }
    }


    checkAddStatus(id) {
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

    onDeleteFile() {
        if (confirm("Bạn muốn xoá ảnh? Nếu đã xoá ảnh thì bắt buộc phải thêm ảnh mới và lưu lại!")) {

            this.gameService.deleteFile(this.getImageId).subscribe(data => {
                console.log(data)
                this.getImageId = '';
                this.url = '../../../../../assets/image/no-image.jpg';
                this.canDeleteFile = true;
                this.toastrService.success('Xoá file thành công', 'Xoá');
                this.toastrService.warning('Bạn phải upload file mới và lưu thông tin nếu không sẽ lỗi!', 'Chú ý');
            })
        }
    }
}
