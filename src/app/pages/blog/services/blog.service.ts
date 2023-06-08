import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Blog} from '../models/blog';

import {AppSetting} from "../../../appsetting";


// in bytes, compress images larger than 1MB
const fileSizeMax = 1 * 1024 * 1024
// in pixels, compress images have the width or height larger than 1024px
const widthHeightMax = 1024
const defaultWidthHeightRatio = 1
const defaultQualityRatio = 0.7

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private http: HttpClient) {
    };

    BASE_SERVER_URL = AppSetting.BASE_SERVER_URL;

    // api_key = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImlhdCI6MTY4MDM1NzQyMiwiZXhwIjoxNjgwNDQzODIyfQ.eeRrMbearD3XA3OM63aI1ZcC0jCZAUEPGnofdrwLkJAFGvUSRgV1EjkI9cCfrLvo3wn9YrM0iG2088eQh0AJaw";
    // headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': "*",
    //           'Content-Type': 'application/json; charset=utf-8',
    //           "X-Requested-With": "XMLHttpRequest"
    // });
    // requestOptions = { headers: this.headers };

    getListBlog(): Observable<Blog[]> {
        return this.http.get<Blog[]>(this.BASE_SERVER_URL + '/api/posts');
    }

    getBlog(id: number): Observable<any> {
        return this.http.get<Blog[]>(this.BASE_SERVER_URL + '/api/posts/' + id);
    }

    uploadFile(data: any): Observable<any> {
        return this.http.post<any>(this.BASE_SERVER_URL + '/api/file/upload', data);
    }

    updateBlog(id: number, data: any): Observable<Blog[]> {
        return this.http.put<Blog[]>(this.BASE_SERVER_URL + '/api/posts/' + id, data);
    }

    createBlog(data: any): Observable<Blog[]> {
        return this.http.post<Blog[]>(this.BASE_SERVER_URL + '/api/posts/', data);
    }

    changeStatus(id: number): Observable<Blog[]> {
        return this.http.post<Blog[]>(this.BASE_SERVER_URL + '/api/posts/change-status/' + id,null);
    }

    getListBanner(): Observable<any> {
        return this.http.get<any>(this.BASE_SERVER_URL + '/api/file/banner');
    }

    compress(file: File): Observable<File> {
        const imageType = file.type || 'image/jpeg'
        const reader = new FileReader()
        reader.readAsDataURL(file)

        return Observable.create(observer => {
            // This event is triggered each time the reading operation is successfully completed.
            reader.onload = ev => {
                // Create an html image element
                const img = this.createImage(ev)
                // Choose the side (width or height) that longer than the other
                const imgWH = img.width > img.height ? img.width : img.height

                // Determines the ratios to compress the image
                let withHeightRatio = (imgWH > widthHeightMax) ? widthHeightMax / imgWH : defaultWidthHeightRatio
                let qualityRatio = (file.size > fileSizeMax) ? fileSizeMax / file.size : defaultQualityRatio

                // Fires immediately after the browser loads the object
                img.onload = () => {
                    const elem = document.createElement('canvas')
                    // resize width, height
                    elem.width = img.width * withHeightRatio
                    elem.height = img.height * withHeightRatio

                    const ctx = <CanvasRenderingContext2D>elem.getContext('2d')
                    ctx.drawImage(img, 0, 0, elem.width, elem.height)
                    ctx.canvas.toBlob(
                        // callback, called when blob created
                        blob => {
                            observer.next(new File(
                                [blob],
                                file.name,
                                {
                                    type: imageType,
                                    lastModified: Date.now(),
                                }
                            ))
                        },
                        imageType,
                        qualityRatio, // reduce image quantity
                    )
                }
            }

            // Catch errors when reading file
            reader.onerror = error => observer.error(error)
        })
    }

    private createImage(ev) {
        let imageContent = ev.target.result
        const img = new Image()
        img.src = imageContent
        return img
    }
}
