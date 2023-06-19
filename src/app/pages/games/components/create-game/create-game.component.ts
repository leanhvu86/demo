import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GamesService} from '../../services';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {routes} from '../../../../consts';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

    public files: File;
    selectedValue: string;
    categories: any = [];
    options: string[] = ['Global', 'America', 'Europe'];
    optionsCompany: string[] = [];
    filteredOptions: Observable<string[]>;
    filteredOptionsCompany: Observable<string[]>;
    getImageId = '';
    selected = '';
    gameForm: FormGroup;
    url = '../../../../../assets/image/no-image.jpg';
    thumbnailUrl = '../../../../../assets/image/no-image.jpg';
    createGame: boolean = false;
    id: number = 0;
    public routes: typeof routes = routes;
    public status: string;

    constructor(private gameService: GamesService,
                private formbuilder: FormBuilder,
                protected toastrService: ToastrService,
                private _route: ActivatedRoute
    ) {
        this.gameForm = this.formbuilder.group({
            name: ['', [Validators.required]],
            categoryId: [0, [Validators.required]],
            imageId: ['', [Validators.required]],
            thumbnail: ['', [Validators.required]],
            type: ['', [Validators.required]],
            description: ['', [Validators.required]],
            descriptionEn: ['', [Validators.required]],
            youtubeLink: ['',],
            companyName: ['', [Validators.required]],
            marketType: ['', [Validators.required]],
            contentVi: ['', [Validators.required]],
            contentEn: ['', [Validators.required]],
            gamePriority: ['', ]
        });

    }

    ngOnInit(): void {
        this.id = this._route.snapshot.params["id"];
        this.findGame(this.id);
        this.getCategory();
        this.getCompanies();
        this.getMarketTypes();
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
            if (data['status']!==200){
                this.toastrService.error('File upload lỗi vui long liên hệ admin', 'Lỗi');
            }else{
                this.getImageId = data['data']['id']
            }
        })
    }

    getCategory() {
        this.gameService.getListCategory().pipe().subscribe(data => {
            this.categories = data['data'].filter(item => item['parentId'] == 0)
        })
    }

    getCompanies() {
        this.gameService.getCompanies().pipe().subscribe(data => {
            const companies = data['data'];
            companies.forEach(company => {
                this.optionsCompany.push(company.name);
            });
            this.filteredOptionsCompany = this.gameForm.get("companyName").valueChanges.pipe(
                startWith(''),
                map(value => this._filterCompany(value || '')),
            );
        })
    }
    getMarketTypes() {
        this.gameService.getMarketTypes().pipe().subscribe(data => {
            data.forEach(market => {
                this.options.push(market.name);
            });
            console.log(this.options)
            this.filteredOptions = this.gameForm.get("marketType").valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value || '')),
            );
        })
    }

    private _filterCompany(value): string[] {
        const filterValue = value.toLowerCase();
        return this.optionsCompany.filter(option1 => option1.toLowerCase().includes(filterValue));
    }

    private _filter(value): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    onKeydown(e) {
    }

    onDelete(id: number) {
        let message = this.status==='ACTIVE'?'Bạn muốn khoá game':'Bạn muốn mở game?';
        if (confirm(message)) {
            let object ={
                id,
                status:this.status==='ACTIVE'?'INACTIVE':'ACTIVE'
            }
            this.gameService.deleteGame(object).subscribe(data => {
                window.location.reload();
            });
        }
    }

    onCreateGame() {
        this.gameForm.value['imageId'] = this.getImageId;
        this.gameForm.value['thumbnail'] = this.getImageId;
        console.log(this.gameForm.value)
        if(this.gameForm.controls['name'].value===''){
            this.toastrService.error('Bạn phải điền đầy đủ tên của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['categoryId'].value==='0'){
            this.toastrService.error('Bạn phải chọn category của game!', 'Lỗi');
            return;
        }
        if( this.getImageId===''){
            this.toastrService.error('Bạn phải chọn ảnh của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['type'].value===''){
            this.toastrService.error('Bạn phải chọn loại của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['description'].value===''){
            this.toastrService.error('Bạn phải điền mô tả của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['descriptionEn'].value===''){
            this.toastrService.error('Bạn phải điền mô tả tiếng Anh của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['companyName'].value===''){
            this.toastrService.error('Bạn phải điền công ty của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['marketType'].value===''){
            this.toastrService.error('Bạn phải điền thị trường của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['contentVi'].value===''){
            this.toastrService.error('Bạn phải điền nội dung của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['contentEn'].value===''){
            this.toastrService.error('Bạn phải điền nội dung tiếng Anh của game!', 'Lỗi');
            return;
        }
        this.gameService.createGame(this.gameForm.value).subscribe(data => {
            this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');
            console.log(data)
            this.createGame = true;
        });
    }

    onUpdateGame() {
        this.gameForm.value['imageId'] = this.getImageId;
        this.gameForm.value['thumbnail'] = this.getImageId;
        if(this.gameForm.controls['name'].value===''){
            this.toastrService.error('Bạn phải điền đầy đủ tên của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['categoryId'].value==='0'){
            this.toastrService.error('Bạn phải chọn category của game!', 'Lỗi');
            return;
        }
        if( this.getImageId===''){
            this.toastrService.error('Bạn phải chọn ảnh của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['type'].value===''){
            this.toastrService.error('Bạn phải chọn loại của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['description'].value===''){
            this.toastrService.error('Bạn phải điền mô tả của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['descriptionEn'].value===''){
            this.toastrService.error('Bạn phải điền mô tả tiếng Anh của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['companyName'].value===''){
            this.toastrService.error('Bạn phải điền công ty của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['marketType'].value===''){
            this.toastrService.error('Bạn phải điền thị trường của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['contentVi'].value===''){
            this.toastrService.error('Bạn phải điền nội dung của game!', 'Lỗi');
            return;
        }
        if(this.gameForm.controls['contentEn'].value===''){
            this.toastrService.error('Bạn phải điền nội dung tiếng Anh của game!', 'Lỗi');
            return;
        }
        console.log(this.gameForm.value)
        this.gameService.updateGame(this.gameForm.value).subscribe(data => {
            this.toastrService.success('Chúc mừng bạn', 'Sửa thành công');
            console.log(data);
            this.createGame = true;
        })
    }

    findGame(idFind: number) {
        let res: any;
        let all: any;
        if (idFind == 0 || idFind == undefined) {
            return
        } else {
            this.gameService.getGame(idFind).subscribe(data => {
                res = data['data']
                console.log(res)
                this.gameForm = this.formbuilder.group({
                    id: [res.id, [Validators.required]],
                    name: [res.name, [Validators.required]],
                    categoryId: [res.categoryId, [Validators.required]],
                    imageId: [res.imageId, [Validators.required]],
                    thumbnail: [res.thumbnail, [Validators.required]],
                    type: [res.type, [Validators.required]],
                    description: [res.description, [Validators.required]],
                    descriptionEn: [res.descriptionEn, [Validators.required]],
                    youtubeLink: [res.youtubeLink],
                    companyName: [res.companyName, [Validators.required]],
                    marketType: [res.marketType, [Validators.required]],
                    contentVi: [res.contentVi, [Validators.required]],
                    contentEn: [res.contentEn, [Validators.required]],
                    gamePriority: [res.gamePriority,]
                })
                this.getImageId = res.imageId;
                this.status=res.status;
            })
            this.gameService.getListGame().subscribe(data => {
                all = data['data'].filter(item => item['id'] == idFind)
                this.url = all[0].imageUrl
            })
        }
    }
}

