import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GamesService } from '../../services';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  public files: File;
  constructor(private gameService: GamesService) { }
  categories: any = []

  gameForm: FormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    imageId: new FormControl("2e2c8cd9-04ca-4384-9dd4-2bfc5efcfbaa"),
    thumbnail: new FormControl(),
    type: new FormControl(),
    description: new FormControl(),
  })

  url = '../../../../../assets/image/no-image.jpg'
  onFileChanged(event: any) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url = event.target.result
      }
      this.files = event.target.files[0];
      console.log(this.files)
    }
  }
  onUpload() {
    const formData = new FormData();
    formData.append('file', this.files);
    formData.append('type', 'banner');
    this.gameService.uploadFile(formData).subscribe(data => {
      console.log(data['data']['id'])
    })
  }  

  getCategory() {
    this.gameService.getListCategory().pipe().subscribe( data => {
      this.categories = data['data']
      console.log(this.categories)
    })
  }

  ngOnInit(): void {
    this.getCategory()
  }

  onCreateGame(){
    this.gameForm.value['imageId'] = '2e2c8cd9-04ca-4384-9dd4-2bfc5efcfbaa';
    this.gameForm.value['thumbnail'] = '1';
    this.gameService.createGame(this.gameForm.value).subscribe(data => {
      console.log(this.gameForm.value['imageId'])
      alert('Thêm mới thành công')
    })
  }
}
