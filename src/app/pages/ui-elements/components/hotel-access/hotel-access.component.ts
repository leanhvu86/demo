// import {Component, OnInit} from '@angular/core';
// import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StarRatingColor} from '../shared/animation/star-rating/star-rating.component';
// import {ActivatedRoute, Router} from '@angular/router';
// import {HotelService} from '../shared/service/hotel.service.';
// import {CookieService} from 'ngx-cookie-service';
// import {RoomTypeEnum} from '../shared/enums/RoomTypeEnum';
// import {ChatService} from '../shared/service/chat.service';
//
// @Component({
//     selector: 'app-hotel-access',
//     templateUrl: './hotel-access.component.html',
//     styleUrls: ['./hotel-access.component.scss']
// })
// export class HotelAccessComponent implements OnInit {
//     checkSubmit = false;
//     registerHotelForm: FormGroup;
//     totaltypeRoomNumber = 0;
//     countMaxDayNumber = 0;
//     countAccommodates = 0;
//     countBedrooms = 0;
//     countBathrooms = 0;
//     private address: any;
//     name;
//     isEdited = false
//     lat = 19.973349;
//     lng = 105.468750;
//     successMessage = '';
//     listImgCurrent = [];
//     listRoomImgCurrent = [];
//     a = [];
//     // rating
//     rating = 3;
//     starCount = 5;
//     imageProp = 'hotelAccess';
//     imageRoomProp = 'roomDetail';
//     starColor: StarRatingColor = StarRatingColor.accent;
//     starColorP: StarRatingColor = StarRatingColor.primary;
//     starColorW: StarRatingColor = StarRatingColor.warn;
//     arrayImage = '';
//     isNext = false;
//     isNext1 = false;
//     isSubmitted = false;
//     errorMessage: String;
//     tab2 = true;
//     tab3 = true;
//     tab4 = true;
//     tab5 = true;
//     roomTypeErr = '';
//
//     listRadioCancel = [
//         {name: 'room.flexiblev1', value: 1, checked: true},
//         {name: 'room.Strictv1', value: 2, checked: false},
//         {name: 'room.Strictv2', value: 3, checked: false}
//     ];
//     listMatButton = [
//         {
//             name: 'room.Anytime', value: 1
//         },
//         {
//             name: 'room.Ayear', value: 2
//         },
//         {
//             name: 'room.SixMonth', value: 3
//         },
//         {
//             name: 'room.ThreeMonth', value: 4
//         }
//     ]
//
//     // type bed rooms
//     lstTypeBedRoom = [
//         {
//             value: 1,
//             name: 'hotelRegister.bedDoi'
//         },
//         {
//             value: 2,
//             name: 'hotelRegister.bedDon'
//         },
//         {
//             value: 3,
//             name: 'hotelRegister.bedKing'
//         },
//         {
//             value: 4,
//             name: 'hotelRegister.bedQueen'
//         }
//
//     ]
//     lstTypeRoom = [
//         {
//             value: 1,
//             name: RoomTypeEnum.standard
//         },
//         {
//             value: 2,
//             name: RoomTypeEnum.superior
//         },
//         {
//             value: 3,
//             name: RoomTypeEnum.deluxe
//         },
//         {
//             value: 4,
//             name: RoomTypeEnum.suite
//         },
//         {
//             value: 5,
//             name: RoomTypeEnum.family
//         },
//         {
//             value: 6,
//             name: RoomTypeEnum.president
//         },
//         {
//             value: 7,
//             name: RoomTypeEnum.royal
//         }
//     ]
//     // selected tab
//     public TabIndex = 0;
//
//     // đồng ý điều khoản
//     checked = false;
//
//
//     constructor(private formbuilder: FormBuilder,
//                 private _hotelService: HotelService,
//                 private _router: Router,
//                 private cookies: CookieService,
//                 private route: ActivatedRoute,
//                 private chatService: ChatService
//     ) {
//         this.registerHotelForm = this.formbuilder.group({
//             name: ['', [Validators.required]],
//             sqm: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
//             desHotel: ['', [Validators.required]],
//             suggestPlayground: ['', [Validators.required]],
//             rulerHotel: ['', [Validators.required]],
//             guideToHotel: ['', [Validators.required]],
//             starHotel: [''],
//             image: [''],
//             totalRoomNumber: '1',
//             status: 0, // 0 inActive 1: Active
//
//             // tab 2
//             address: ['', [Validators.required]],
//             country: ['', [Validators.required]],
//             province: ['', [Validators.required]],
//             longitude: [''],
//             latitude: [''],
//             nameSpace: [''],
//             zip: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
//
//             // tab 3
//             // Facilities
//             facilities: this.addControlFacilities(),
//
//             // tab 4 Thông tin phòng Room detail array và priceExtra + extra-person
//             formArrayRoomNumber: this.formbuilder.array([
//                 // this.addControlRoom()
//             ]),
//             reservationTime: [''],
//             cancellationPolicy: ['']
//         })
//         this.plusTotalRoomNumber();
//
//         if (this.route.snapshot.paramMap.get('id')) {
//             this.isEdit(this.route.snapshot.paramMap.get('id'))
//             this.isEdited = true
//         }
//     }
//
//     public changeTabValid(event: any) {
//         this.isNext = true
//         if (event.index === 1) { // validate form 1
//             this.tab2 = true;
//             if (this.registerHotelForm.controls['name'].invalid || this.registerHotelForm.controls['desHotel'].invalid
//                 || this.registerHotelForm.controls['guideToHotel'].invalid || this.registerHotelForm.controls['rulerHotel'].invalid
//                 || this.registerHotelForm.controls['suggestPlayground'].invalid || this.registerHotelForm.controls['sqm'].invalid) {
//                 this.TabIndex = 0;
//                 this.tab3 = true
//                 this.tab4 = true
//                 this.tab5 = true
//                 return;
//             }
//             this.tab2 = false
//         }
//         if (event.index === 2) {
//             this.tab3 = true;
//             if (this.registerHotelForm.controls['address'].invalid || this.registerHotelForm.controls['province'].invalid
//                 || this.registerHotelForm.controls['country'].invalid || this.registerHotelForm.controls['zip'].invalid) {
//                 this.TabIndex = 1;
//                 this.tab4 = true
//                 this.tab5 = true
//                 return;
//             }
//             this.tab3 = false
//         }
//         if (event.index === 3) {
//             this.tab4 = false
//         }
//         if (event.index === 4) {
//             const a = this.registerHotelForm.get('formArrayRoomNumber').value;
//             let check = true
//             a.forEach((item, i) => {
//                 if (!item.roomType) {
//                     this.roomTypeErr = 'Bạn chưa chọn loại phòng cho loại số ' + (i + 1) + ' !!';
//                     check = false;
//                 }
//                 if (!item.price) {
//                     this.roomTypeErr = 'Bạn chưa nhập giá cho loại phòng số ' + (i + 1) + ' !!';
//                     check = false;
//                 }
//             })
//             this.isNext1 = true
//             this.tab5 = true;
//             if (!check) {
//                 this.TabIndex = 3;
//                 this.tab4 = true
//                 this.tab5 = true
//                 return;
//             }
//             this.roomTypeErr = '';
//             this.tab5 = false
//         }
//     }
//
//     public tabNext() {
//         const tabCount = 5;
//         this.TabIndex = (this.TabIndex + 1) % tabCount;
//     }
//
//     public tabPrevios() {
//         const tabCount = 5;
//         this.TabIndex = (this.TabIndex - 1) % tabCount;
//     }
//
//     ngOnInit(): void {
//     }
//
//     onRatingChanged(rating) {
//         this.rating = rating;
//     }
//
//     get f() {
//         return this.registerHotelForm.controls;
//     }
//
//     get nameHotel() {
//         return this.registerHotelForm.get('name');
//     }
//
//     get sqm() {
//         return this.registerHotelForm.get('sqm');
//     }
//
//     get zip() {
//         return this.registerHotelForm.get('zip');
//     }
//
//     get formArrayRoomNumber() {
//         return this.registerHotelForm.get('formArrayRoomNumber') as FormArray
//     }
//
//     isEdit(idObject) {
//         this.registerHotelForm.reset();
//         this._hotelService.getHotelById(idObject).subscribe(data => {
//             const result = data['result'];
//             console.log(result);
//             this.listImgCurrent = result[0][0].hotelObj.image.split(',');
//             result[1][0].forEach((room, i) => {
//                 if (room.lstImg !== '' && room.lstImg !== null) {
//                     const item = room.lstImg.split(',');
//                     this.listRoomImgCurrent.push(item);
//                 } else if (room.lstImg === '') {
//                     const item = [];
//                     this.listRoomImgCurrent.push(item);
//                 }
//             });
//             this.tab2 = false;
//             this.tab3 = false;
//             this.tab4 = false;
//             this.tab5 = false;
//             $('#totalRoomNumber').removeClass('disabledbutton');
//             this.rating = result[0][0].hotelObj.starHotel;
//             if (result[0][0].hotelObj.cancellationPolicy === 1) {
//                 this.listRadioCancel = [{name: 'room.flexiblev1', value: 1, checked: true},
//                     {name: 'room.Strictv1', value: 2, checked: false},
//                     {name: 'room.Strictv2', value: 3, checked: false}
//                 ]
//             } else if (result[0][0].hotelObj.cancellationPolicy === 2) {
//                 this.listRadioCancel = [{name: 'room.flexiblev1', value: 1, checked: false},
//                     {name: 'room.Strictv1', value: 2, checked: true},
//                     {name: 'room.Strictv2', value: 3, checked: false}
//                 ]
//             } else {
//                 this.listRadioCancel = [{name: 'room.flexiblev2', value: 1, checked: false},
//                     {name: 'room.Strictv1', value: 2, checked: false},
//                     {name: 'room.Strictv2', value: 3, checked: true}]
//             }
//             this.lat = result[0][0].hotelObj.latitude;
//             this.lng = result[0][0].hotelObj.longitude;
//             this.registerHotelForm = this.formbuilder.group({
//                 id: result[0][0].hotelObj._id,
//                 name: result[0][0].hotelObj.name,
//                 sqm: result[0][0].hotelObj.sqm,
//                 address: result[0][0].hotelObj.address,
//                 country: result[0][0].hotelObj.country,
//                 nameSpace: result[0][0].hotelObj.nameSpace,
//                 latitude: result[0][0].hotelObj.latitude,
//                 longitude: result[0][0].hotelObj.longitude,
//                 province: result[0][0].hotelObj.province,
//                 zip: result[0][0].hotelObj.zip,
//                 image: result[0][0].hotelObj.image,
//                 starHotel: result[0][0].hotelObj.starHotel,
//                 desHotel: result[0][0].hotelObj.desHotel,
//                 suggestPlayground: result[0][0].hotelObj.suggestPlayground,
//                 guideToHotel: result[0][0].hotelObj.guideToHotel,
//                 reservationTime: result[0][0].hotelObj.reservationTime,
//                 rulerHotel: result[0][0].hotelObj.rulerHotel,
//                 cancellationPolicy: result[0][0].hotelObj.cancellationPolicy,
//                 totalRoomNumber: result[1][0].length,
//                 formArrayRoomNumber: this.formbuilder.array([]),
//                 facilities: this.formbuilder.group({
//                     airConditional: this.formbuilder.control(result[0][0].airConditional),
//                     Hairdryer: this.formbuilder.control(result[0][0].Hairdryer),
//                     ironingMachine: this.formbuilder.control(result[0][0].ironingMachine),
//                     television: this.formbuilder.control(result[0][0].television),
//                     cableTelevision: this.formbuilder.control(result[0][0].cableTelevision),
//                     freeWifi: this.formbuilder.control(result[0][0].freeWifi),
//                     freeInternet: this.formbuilder.control(result[0][0].freeInternet),
//                     washingMachine: this.formbuilder.control(result[0][0].washingMachine),
//                     Shampoo: this.formbuilder.control(result[0][0].Shampoo),
//                     beddingSet: this.formbuilder.control(result[0][0].beddingSet),
//                     TowelsOfAllKinds: this.formbuilder.control(result[0][0].TowelsOfAllKinds),
//                     smartKey: this.formbuilder.control(result[0][0].smartKey),
//
//                     wifiCharge: this.formbuilder.control(result[0][0].wifiCharge),
//                     internetCharge: this.formbuilder.control(result[0][0].internetCharge),
//
//                     wheelchairAccessible: this.formbuilder.control(result[0][0].wheelchairAccessible),
//                     elevatorInHotel: this.formbuilder.control(result[0][0].elevatorInHotel),
//                     wirelessBell: this.formbuilder.control(result[0][0].wirelessBell),
//                     doorStaff: this.formbuilder.control(result[0][0].doorStaff),
//
//                     teaMaker: this.formbuilder.control(result[0][0].teaMaker),
//                     coffee: this.formbuilder.control(result[0][0].coffee),
//                     tea: this.formbuilder.control(result[0][0].tea),
//                     Kitchen: this.formbuilder.control(result[0][0].Kitchen),
//                     freeBreakfast: this.formbuilder.control(result[0][0].freeBreakfast),
//                     workspace: this.formbuilder.control(result[0][0].workspace),
//                     privatePool: this.formbuilder.control(result[0][0].privatePool),
//                     heaters: this.formbuilder.control(result[0][0].heaters),
//                     Dryer: this.formbuilder.control(result[0][0].Dryer),
//                     Fireplace: this.formbuilder.control(result[0][0].Fireplace),
//                     Wardrobe: this.formbuilder.control(result[0][0].Wardrobe),
//                     indooPool: this.formbuilder.control(result[0][0].indooPool),
//                     hotTub: this.formbuilder.control(result[0][0].hotTub),
//                     gymRoom: this.formbuilder.control(result[0][0].gymRoom),
//                     outdoorSwimmingPool: this.formbuilder.control(result[0][0].outdoorSwimmingPool),
//                     freeParking: this.formbuilder.control(result[0][0].freeParking),
//
//                     SmokeDetector: this.formbuilder.control(result[0][0].SmokeDetector),
//                     COAlarmSensor: this.formbuilder.control(result[0][0].COAlarmSensor),
//                     FirstAidKit: this.formbuilder.control(result[0][0].FirstAidKit),
//                     fireExtinguisher: this.formbuilder.control(result[0][0].fireExtinguisher),
//
//                     Smoking: this.formbuilder.control(result[0][0].Smoking),
//                     petsAllowed: this.formbuilder.control(result[0][0].petsAllowed)
//
//                 }),
//
//             })
//             this.totaltypeRoomNumber = result[1][0].length;
//             let z = 0;
//             for (const i of result[1][0]) {
//                 this.formArrayRoomNumber.push(this.formbuilder.group({
//                     accommodates: this.formbuilder.control(i.accommodates),
//                     bathRooms: this.formbuilder.control(i.bathRooms),
//                     bedRooms: this.formbuilder.control(i.bedRooms),
//                     bedRoomsDetails: this.formbuilder.array([]),
//                     maxDay: this.formbuilder.control(i.maxDay),
//                     price: [i.price, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
//                     roomAirConditional: this.formbuilder.control(i.roomAirConditional),
//                     roomHairdryer: this.formbuilder.control(i.roomHairdryer),
//                     roomIroningMachine: this.formbuilder.control(i.roomIroningMachine),
//                     roomTelevison: this.formbuilder.control(i.roomTelevison),
//                     roomCableTV: this.formbuilder.control(i.roomCableTV),
//                     roomFreeWifi: this.formbuilder.control(i.roomFreeWifi),
//                     roomTea: this.formbuilder.control(i.roomTea),
//                     roomCoffee: this.formbuilder.control(i.roomCoffee),
//                     roomShampoo: this.formbuilder.control(i.roomShampoo),
//                     roomBeddingSet: this.formbuilder.control(i.roomBeddingSet),
//                     roomTowelsOfAllKinds: this.formbuilder.control(i.roomTowelsOfAllKinds),
//                     roomWardrobe: this.formbuilder.control(i.roomWardrobe),
//                     roomPrivatePool: this.formbuilder.control(i.roomPrivatePool),
//                     roomHeaters: this.formbuilder.control(i.roomHeaters),
//                     roomDryer: this.formbuilder.control(i.roomDryer),
//                     roomTeaMaker: this.formbuilder.control(i.roomTeaMaker),
//                     roomSmartKey: this.formbuilder.control(i.roomSmartKey),
//                     roomFreeBreakfast: this.formbuilder.control(i.roomFreeBreakfast),
//                     roomWorkspace: this.formbuilder.control(i.roomWorkspace),
//                     roomFireplace: this.formbuilder.control(i.roomFireplace),
//                     roomHotTub: this.formbuilder.control(i.roomHotTub),
//                     roomType: [i.roomType],
//                     lstImg: [i.lstImg]
//                 }));
//
//                 // xử lý push control array
//                 const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber'])
//                     .at(z).get('bedRoomsDetails') as FormArray;
//                 let h = 0;
//                 for (const y of i.bedroomDetail) {
//                     control.push(this.addControlArrayTypeBedroom(z));
//                     const addTypebedRoom = ((<FormArray>this.registerHotelForm.controls['formArrayRoomNumber'])
//                         .at(z).get('bedRoomsDetails') as FormArray)
//                         .at(h).get('arrayTypeBedRooms') as FormArray;
//                     for (const j of y.arrayTypeBedRooms) {
//                         addTypebedRoom.push(this.formbuilder.group({
//                             bedType: this.formbuilder.control(j.bedType),
//                             bedQuantity: this.formbuilder.control(j.bedQuantity)
//                         }))
//                     }
//                     h++
//                 }
//
//                 z++; // index
//
//             }
//
//         })
//
//     }
//
//     onSubmit() {
//         if (this.checked === false) {
//             this.isSubmitted = true
//             return
//         }
//         if (this.listImgCurrent.length > 0) {
//             let imgCurrent = Array.from(this.listImgCurrent).join();
//             if (this.arrayImage.length > 0) {
//                 imgCurrent = imgCurrent + ',';
//                 this.arrayImage = imgCurrent.concat(this.arrayImage);
//             } else {
//                 this.arrayImage = imgCurrent
//             }
//         }
//         this.registerHotelForm.get('image').setValue(this.arrayImage)
//         this.registerHotelForm.get('totalRoomNumber').setValue(this.totaltypeRoomNumber)
//         this.registerHotelForm.get('starHotel').setValue(this.rating)
//
//         let nameSpace = this.registerHotelForm.get('name').value + ' ' + this.registerHotelForm.get('province').value;
//         nameSpace = nameSpace.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
//         nameSpace = nameSpace.toLowerCase();
//         const name = nameSpace.split(' ');
//         nameSpace = name.join('-');
//         this.registerHotelForm.get('nameSpace').patchValue(nameSpace);
//         const hoTelsObject = this.registerHotelForm.value;
//         hoTelsObject.email = this.cookies.get('email');
//         if (this.isEdited) {
//             this.checkSubmit = true;
//             this._hotelService.editHotel(this.registerHotelForm.value).subscribe((data) => {
//                 const result = data.body
//                 if (result['status'] === 200) {
//                     // this.successMessage = result['message'];
//                     this.successMessage = result['message'];
//                     this.chatService.showNotification('success', this.successMessage);
//                     setTimeout(() => {
//                         // window.location.reload()
//                         if (this.cookies.get('role') === '2') {
//                             this._router.navigate(['/hotels'])
//                         } else {
//                             this._router.navigate(['/user-hotels'])
//                         }
//                     }, 3000);
//                 } else {
//                     this.errorMessage = result['message'];
//                     this.chatService.showNotification('success', this.errorMessage);
//                 }
//             })
//
//         } else {
//             this.checkSubmit = true;
//             this._hotelService.createHotel(this.registerHotelForm.value).subscribe(async (data) => {
//                 const result = await data.body
//                 if (result['status'] === 200) {
//                     // this.successMessage = result['message'];
//                     this.successMessage = result['message'];
//                     this.chatService.showNotification('success', this.successMessage);
//                     setTimeout(() => {
//                         // window.location.reload()
//                         if (this.cookies.get('role') === '2') {
//                             this._router.navigate(['/hotels'])
//                         } else {
//                             this._router.navigate(['/user-hotels'])
//                         }
//                     }, 3000);
//                 } else if (result['status'] !== 200) {
//                     this.errorMessage = result['message'];
//                     this.chatService.showNotification('error', this.errorMessage);
//                 }
//             })
//         }
//     }
//
//     doSomething(event, index) {
//         const value = event.value;
//         this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomType').patchValue(value)
//         if (!this.isEdited) {
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTea').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomCoffee').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomBeddingSet').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTowelsOfAllKinds').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHairdryer').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomAirConditional').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomIroningMachine').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTelevison').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomCableTV').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFreeWifi').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomShampoo').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomWardrobe').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomPrivatePool').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHeaters').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomDryer').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTeaMaker').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomSmartKey').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFreeBreakfast').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomWorkspace').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFireplace').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHotTub').patchValue(true)
//
//         }
//         if (value !== 7 || value !== 6 || value !== 4) {
//             // console.log('cao cấp')
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomPrivatePool').patchValue(false)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFireplace').patchValue(false)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHotTub').patchValue(false)
//         }
//         if (parseInt(value) < 3) {
//             // console.log('view đep')
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomCableTV').patchValue(false)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomWorkspace').patchValue(false)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomDryer').patchValue(false)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHeaters').patchValue(false)
//         }
//         if (parseInt(value) < 2) {
//             // console.log('cùi')
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFreeBreakfast').patchValue(false)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTeaMaker').patchValue(false)
//         }
//         if (value === 7 || value === 6 || value === 4) {
//             // console.log('sieu sang')
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTea').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomCoffee').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomBeddingSet').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTowelsOfAllKinds').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHairdryer').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomAirConditional').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomIroningMachine').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTelevison').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomCableTV').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFreeWifi').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomShampoo').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomWardrobe').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHeaters').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomDryer').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomTeaMaker').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomSmartKey').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFreeBreakfast').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomWorkspace').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomFireplace').patchValue(true)
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomHotTub').patchValue(true)
//         }
//         if (parseInt(value) > 6) {
//             // console.log('cùi')
//             this.registerHotelForm.get('formArrayRoomNumber').get([index]).get('roomPrivatePool').patchValue(true)
//         }
//     }
//
//     addControlRoom() {
//         return this.formbuilder.group({
//             accommodates: this.formbuilder.control(1),
//             bathRooms: this.formbuilder.control(1),
//             bedRooms: this.formbuilder.control(0),
//             order: this.formbuilder.control(this.totaltypeRoomNumber),
//             bedRoomsDetails: this.formbuilder.array([]),
//             maxDay: this.formbuilder.control(1),
//             price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
//             roomAirConditional: this.formbuilder.control(true),
//             roomHairdryer: this.formbuilder.control(true),
//             roomIroningMachine: this.formbuilder.control(true),
//             roomTelevison: this.formbuilder.control(true),
//             roomCableTV: this.formbuilder.control(true),
//             roomFreeWifi: this.formbuilder.control(true),
//             roomTea: this.formbuilder.control(true),
//             roomCoffee: this.formbuilder.control(true),
//             roomShampoo: this.formbuilder.control(true),
//             roomBeddingSet: this.formbuilder.control(true),
//             roomTowelsOfAllKinds: this.formbuilder.control(true),
//             roomWardrobe: this.formbuilder.control(true),
//             roomPrivatePool: this.formbuilder.control(true),
//             roomHeaters: this.formbuilder.control(true),
//             roomDryer: this.formbuilder.control(true),
//             roomTeaMaker: this.formbuilder.control(true),
//             roomSmartKey: this.formbuilder.control(true),
//             roomFreeBreakfast: this.formbuilder.control(true),
//             roomWorkspace: this.formbuilder.control(true),
//             roomFireplace: this.formbuilder.control(true),
//             roomHotTub: this.formbuilder.control(true),
//             roomType: ['', [Validators.required]],
//             lstImg: ['']
//         });
//     }
//
//     deleteControlRoom() {
//         // console.log(this.formArrayRoomNumber.length);
//         this.formArrayRoomNumber.removeAt(this.formArrayRoomNumber.length - 1);
//     }
//
//     deleteControlBedRoomType(i, iz, ia) {
//         const control = ((<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray)
//             .at(iz).get('arrayTypeBedRooms') as FormArray;
//         control.removeAt(ia);
//     }
//
//     addControlArrayTypeBedroom(i) {
//         // console.log('thêm loại giường ngủ')
//         return this.formbuilder.group({
//             order: i,
//             arrayTypeBedRooms: this.formbuilder.array([
//                 // this.addControlTypeBedroom() //k cho tự động add giường
//             ])
//         })
//     }
//
//     plusAddTypeBedRoom(i, iz) {
//         const control = ((<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray)
//             .at(iz).get('arrayTypeBedRooms') as FormArray;
//         control.push(this.addControlTypeBedroom());
//     }
//
//     addControlTypeBedroom() {
//         return this.formbuilder.group({
//             bedType: this.formbuilder.control(''),
//             bedQuantity: this.formbuilder.control('')
//         })
//     }
//
//     addControlFacilities() {
//         // console.log('facilities nè')
//         return this.formbuilder.group({
//             airConditional: this.formbuilder.control(false),
//             Hairdryer: this.formbuilder.control(false),
//             ironingMachine: this.formbuilder.control(false),
//             television: this.formbuilder.control(false),
//             cableTelevision: this.formbuilder.control(false),
//             freeWifi: this.formbuilder.control(false),
//             freeInternet: this.formbuilder.control(false),
//             washingMachine: this.formbuilder.control(false),
//             Shampoo: this.formbuilder.control(false),
//             beddingSet: this.formbuilder.control(false),
//             TowelsOfAllKinds: this.formbuilder.control(false),
//             smartKey: this.formbuilder.control(false),
//
//             wifiCharge: this.formbuilder.control(false),
//             internetCharge: this.formbuilder.control(false),
//
//
//             wheelchairAccessible: this.formbuilder.control(false),
//             elevatorInHotel: this.formbuilder.control(false),
//             wirelessBell: this.formbuilder.control(false),
//             doorStaff: this.formbuilder.control(false),
//
//             teaMaker: this.formbuilder.control(false),
//             coffee: this.formbuilder.control(false),
//             tea: this.formbuilder.control(false),
//             Kitchen: this.formbuilder.control(false),
//             freeBreakfast: this.formbuilder.control(false),
//             workspace: this.formbuilder.control(false),
//             privatePool: this.formbuilder.control(false),
//             heaters: this.formbuilder.control(false),
//             Dryer: this.formbuilder.control(false),
//             Fireplace: this.formbuilder.control(false),
//             Wardrobe: this.formbuilder.control(false),
//             indooPool: this.formbuilder.control(false),
//             hotTub: this.formbuilder.control(false),
//             gymRoom: this.formbuilder.control(false),
//             outdoorSwimmingPool: this.formbuilder.control(false),
//             freeParking: this.formbuilder.control(false),
//
//             SmokeDetector: this.formbuilder.control(false),
//             COAlarmSensor: this.formbuilder.control(false),
//             FirstAidKit: this.formbuilder.control(false),
//             fireExtinguisher: this.formbuilder.control(false),
//
//             Smoking: this.formbuilder.control(false),
//             petsAllowed: this.formbuilder.control(false)
//
//         })
//     }
//
//     minusMaxDay(i) {
//         if (this.countMaxDayNumber === 1) {
//             $('#maxDay' + i).addClass('disabledbutton');
//         }
//         this.countMaxDayNumber = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').value
//         this.countMaxDayNumber--;
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').setValue(this.countMaxDayNumber)
//     }
//
//     plusMaxDay(i) {
//         $('#maxDay' + i).removeClass('disabledbutton');
//         this.countMaxDayNumber = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').value
//         this.countMaxDayNumber++;
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').setValue(this.countMaxDayNumber)
//
//     }
//
//     minusTotalRoomNumber() {
//         // console.log(this.totaltypeRoomNumber)
//         if (this.totaltypeRoomNumber === 2) {
//             $('#totalRoomNumber').addClass('disabledbutton');
//         }
//         this.totaltypeRoomNumber--;
//         this.deleteControlRoom();
//     }
//
//     plusTotalRoomNumber() {
//         $('#totalRoomNumber').removeClass('disabledbutton');
//         this.totaltypeRoomNumber++;
//         this.formArrayRoomNumber.push(this.addControlRoom());
//     }
//
//
//     plusNumberOfBedrooms(i) {
//         // console.log(i)
//         $('#bedRooms' + i).removeClass('disabledbutton');
//         this.countBedrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').value
//         this.countBedrooms++
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').setValue(this.countBedrooms)
//
//         // form multiple
//         const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray;
//         control.push(this.addControlArrayTypeBedroom(i));
//     }
//
//     minusNumberOfBedrooms(i) {
//         if (this.countBedrooms === 1) {
//             $('#bedRooms' + i).addClass('disabledbutton');
//         }
//         this.countBedrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').value
//         this.countBedrooms--
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').setValue(this.countBedrooms)
//
//         const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray;
//         control.removeAt(i);
//
//     }
//
//     plusNumberOfBathrooms(i) {
//         $('#bathRooms' + i).removeClass('disabledbutton');
//         this.countBathrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').value
//         this.countBathrooms++
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').setValue(this.countBathrooms)
//     }
//
//     minusNumberOfBathrooms(i) {
//         if (this.countBathrooms === 1) {
//             $('#bathRooms' + i).addClass('disabledbutton');
//         }
//         this.countBathrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').value
//         this.countBathrooms--
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').setValue(this.countBathrooms)
//
//     }
//
//     plusAccommodates(i) {
//         $('#accommondates' + i).removeClass('disabledbutton');
//         this.countAccommodates = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').value
//         this.countAccommodates++
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').setValue(this.countAccommodates)
//     }
//
//     minusAccommodates(i) {
//         if (this.countAccommodates === 1) {
//             $('#accommondates' + i).addClass('disabledbutton');
//         }
//
//         this.countAccommodates = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').value
//         this.countAccommodates--;
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').setValue(this.countAccommodates)
//     }
//
//     // get address
//     getEstablishmentAddress(place: object) {
//         this.address = place['formatted_address'];
//         // this.lat = place.geometry.location.lat();
//         // this.lng = place.geometry.location.lng()
//         this.lat = place['geometry'].location.lat();
//         this.lng = place['geometry'].location.lng();
//         this.name = place['name'];
//         // console.log(this.lat)
//         // console.log(this.lng)
//         // console.log(place);
//         // console.log(this.name);
//         // console.log(place['formatted_address']);
//         // console.log(place['formatted_address'].split(',').pop());
//         // console.log(place['formatted_address'].split(',').slice(0, -2)[2])
//         this.registerHotelForm.get('province').patchValue(place['address_components'][3].long_name)
//         this.registerHotelForm.get('address').patchValue(this.address);
//         this.registerHotelForm.get('latitude').patchValue(this.lat);
//         this.registerHotelForm.get('longitude').patchValue(this.lng);
//         this.registerHotelForm.get('country').patchValue(place['formatted_address'].split(',').pop())
//         document.getElementById('check-input').focus();
//     }
//
//     getImageSrc(event: any) {
//         const pshArrayImage = new Set()
//         const str = '[' + event.toString().replace(/}\n?{/g, '},{') + ']';
//         JSON.parse(str).forEach((obj) => {
//             pshArrayImage.add(obj.filePath)
//             // console.log(obj.filePath)
//         });
//         // this.arrayImage = [...pshArrayImage].join(',')
//         this.arrayImage = Array.from(pshArrayImage).join(',')
//         // let evt = JSON.parse(event.toString());
//         // this.arrayImage += evt.filePath + ','
//         // event.path
//     }
//
//     getImageSrcTypeRoom(event: any, i) {
//         // console.log(i)
//         const pshArrayImage = new Set()
//         const str = '[' + event.toString().replace(/}\n?{/g, '},{') + ']';
//         JSON.parse(str).forEach((obj) => {
//             pshArrayImage.add(obj.filePath)
//         });
//         let newImage = Array.from(pshArrayImage).join(',')
//         if (this.isEdited) {
//             if (this.listRoomImgCurrent[i].length > 0) {
//                 let imgCurrent = Array.from(this.listRoomImgCurrent[i]).join();
//                 if (pshArrayImage.size > 0) {
//                     imgCurrent = imgCurrent + ',';
//                     newImage = imgCurrent.concat(newImage);
//                 }
//             }
//         }
//         // console.log('đây là mảng ảnh mới:' + newImage);
//         this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('lstImg').setValue(newImage);
//     }
//
//     getIndexDelete(event: any) {
//         const arraySlice = this.arrayImage.split(',')
//         arraySlice.splice(event, 1)
//         this.arrayImage = arraySlice.toString();
//     }
//
//     // getIndexRoomDelete(event: any, index: any) {
//     //     const arraySlice = this.arrayImage.split(',')
//     //     arraySlice.splice(event, 1)
//     //     this.arrayImage = arraySlice.toString();
//     // }
//
//     changeValueAccept(value) {
//         this.checked = !value;
//         this.isSubmitted = false
//     }
//
// }
