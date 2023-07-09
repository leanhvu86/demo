import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {routes} from '../../../../consts';
import {BannerService} from '../../services';
import {MatDialog} from '@angular/material/dialog';
import {CreateBannerComponent} from '../create-banner/create-banner.component';

@Component({
    selector: 'app-list-banner',
    templateUrl: './list-banner.component.html',
    styleUrls: ['./list-banner.component.scss']
})
export class ListBannerComponent implements OnInit {

    public routes: typeof routes = routes;
    parentCate: any = []
    @Input() bannerData: [];
    public displayedColumns: string[] = ['id', 'url', 'action'];
    public dataSource = new MatTableDataSource<any>();
    public selection = new SelectionModel<any>(true, []);

    public isShowFilterInput = false;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private bannerService: BannerService, private matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAllBanner();
        this.dataSource.paginator = this.paginator;
    }

    getAllBanner() {
        this.bannerService.getListBanner().subscribe(data => {
            this.dataSource.data = data['data'];
        })
    }

    openCreateDialog() {
        this.matDialog.open(CreateBannerComponent, {
            width: '1550px',
            height: '500px'
        })
            .afterClosed()
            .subscribe(shouldReload => {
                window.location.reload()
            });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    public checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    public applyFilter(event: Event): void {
        this.getAllBanner()
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public showFilterInput(): void {
        this.getAllBanner()
        this.isShowFilterInput = !this.isShowFilterInput;
        this.dataSource = new MatTableDataSource<any>(this.bannerData);
    }

    onChangeStatus(type, banner) {
        this.bannerService.updateBanner(type, banner).subscribe(data => {
            this.getAllBanner();
        })
    }

    onDelete(type, banner) {
        this.bannerService.deleteBanner(type, banner).subscribe(data => {
            this.getAllBanner();
        })
    }

    onChangeLevel(id) {
        this.bannerService.changeLevel(id).subscribe(data => {
            this.getAllBanner();
        })
    }
}
