import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../services';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { routes } from '../../../../consts';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

    public files: File;
    selectedValue: string;
    categories: any = []
    options: string[] = ['Global', 'America', 'Europe'];
    optionsCompany: string[] = ['VinaGame', 'Unit', 'Soha'];
    filteredOptions: Observable<string[]>;
    filteredOptionsCompany: Observable<string[]>;
    getImageId = '';
    selected = '';
    gameForm: FormGroup;
    url = '../../../../../assets/image/no-image.jpg';
    thumbnailUrl = '../../../../../assets/image/no-image.jpg';

    id: number = 0;
    public routes: typeof routes = routes;

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
            gamePriority: ['', [Validators.required]],
            price: [0],
            promotionPercent: [0],
            promotionPrice: [0],
            quantity: [0],
        })
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.params["id"];
        this.findGame(this.id);
        this.getCategory();
        this.filteredOptions = this.gameForm.get("marketType").valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
        this.filteredOptionsCompany = this.gameForm.get("companyName").valueChanges.pipe(
            startWith(''),
            map(value => this._filterCompany(value || '')),
        );
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

    getCategory() {
        this.gameService.getListCategory().pipe().subscribe(data => {
            this.categories = data['data'].filter(item => item['parentId'] == 0)
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
        e.preventDefault();
    }
    onCreateGame() {
        this.gameForm.value['imageId'] = this.getImageId;
        this.gameForm.value['thumbnail'] = this.getImageId;
        this.gameService.createGame(this.gameForm.value).subscribe(data => {
            this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');
            console.log(data)
        })
    }

    onUpdateGame() {
        this.gameForm.value['imageId'] = this.getImageId;
        this.gameForm.value['thumbnail'] = this.getImageId;
        console.log(this.gameForm.value)
        this.gameService.updateGame(this.gameForm.value).subscribe(data => {
            this.toastrService.success('Chúc mừng bạn', 'Sửa thành công');
            console.log(data)
        })
    }

    findGame(idFind:number) {
        let res: any;
        let all: any;
        if (idFind == 0  || idFind == undefined) {
            return
        }
        else {
            this.gameService.getGame(idFind).subscribe(data => {
                res = data['data']
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
                    gamePriority: ['', [Validators.required]],
                    price: [0],
                    promotionPercent: [0],
                    promotionPrice: [0],
                    quantity: [0]
                })
                this.getImageId = res.imageId;
            })
            this.gameService.getListGame().subscribe(data => {
                all = data['data'].filter(item => item['id'] == idFind)
                this.url = all[0].imageUrl
            })
        }
    }
}

