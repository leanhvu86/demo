import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GamesService} from '../../services';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {NotificationService} from "../../../../shared/service/system.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

    public files: File;

    selectedValue: string;
    categories: any = [
        {ìd:1,name:'Platform games'},
        {ìd:2,name:'Shooter games'},
        {ìd:1,name:'Fighting games'}]
    options: string[] = ['Global', 'America', 'Europe'];
    optionsCompany: string[] = ['VinaGame', 'Unit', 'Soha'];
    filteredOptions: Observable<string[]>;
    filteredOptionsCompany: Observable<string[]>;
    selected = '';
    gameForm: FormGroup;
    url = '../../../../../assets/image/no-image.jpg';
    thumbnailUrl = '../../../../../assets/image/no-image.jpg';

    constructor(private gameService: GamesService,
                private formbuilder: FormBuilder,
                protected toastrService: ToastrService,
    ) {
        this.gameForm = this.formbuilder.group({
            name: ['', [Validators.required]],
            categoryId: ['', [Validators.required]],
            imageId: ['2e2c8cd9-04ca-4384-9dd4-2bfc5efcfbaa', [Validators.required]],
            thumbnail: ["2e2c8cd9-04ca-4384-9dd4-2bfc5efcfbaa", [Validators.required]],
            type: ['', [Validators.required]],
            description: ['', [Validators.required]],
            descriptionEn: ['', [Validators.required]],
            youtubeLink: ['',],
            companyName: ['', [Validators.required]],
            marketType: ['', [Validators.required]],
            contentVi: ['', [Validators.required]],
            contentEn: ['', [Validators.required]],
            gamePriority: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {
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

    onFileChanged(event: any,type) {
        if (event.target.files) {
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                if (type==1){
                    this.url = event.target.result

                }else{
                    this.thumbnailUrl = event.target.result

                }
            }
            this.files = event.target.files[0];
        }
    }

    onUpload(type) {
        const formData = new FormData();
        formData.append('file', this.files);
        formData.append('type', 'banner');
        this.gameService.uploadFile(formData).subscribe(data => {
            let imageId =data['data']['id']
            if(type===1){
                this.gameForm.get('imageId').patchValue(imageId);
            }else{
                this.gameForm.get('thumbnail').patchValue(imageId);

            }
        })
    }

    getCategory() {
        this.gameService.getListCategory().pipe().subscribe(data => {
            if (data['data'] !== undefined) {
                this.categories = data['data'];
            }
            console.log(this.categories)
        })
    }




    private _filterCompany(value): string[] {
        const filterValue = value.toLowerCase();
        console.log(value)
        console.log(this.optionsCompany)

        return this.optionsCompany.filter(option1 => option1.toLowerCase().includes(filterValue));
    }

    private _filter(value): string[] {
        const filterValue = value.toLowerCase();
        console.log(value)
        console.log(this.options)

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    onKeydown(e){
        e.preventDefault();
    }
    onCreateGame() {
        console.log(this.gameForm.value
        );
        this.toastrService.success('Chúc mừng bạn', 'Thêm mới thành công');

        if(this.gameForm.valid==false){
            return;
        }

        // this.gameForm.value['imageId'] = '2e2c8cd9-04ca-4384-9dd4-2bfc5efcfbaa';
        // this.gameForm.value['thumbnail'] = '1';
        // this.gameService.createGame(this.gameForm.value).subscribe(data => {
        //   console.log(this.gameForm.value['imageId'])
        //     this.notificationService.success("thêm mới thành công");
        // })
    }

}

