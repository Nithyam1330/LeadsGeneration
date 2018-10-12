import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';
import {URLS} from '../URLS.enum';
import {CustomsortServiceService} from '../services/customsort-service.service';
import { LocalStorageService } from '../services/local-storage.service';
@Component({
  selector: 'app-inout',
  templateUrl: './inout.component.html',
  styleUrls: ['./inout.component.css']
})
export class InoutComponent implements OnInit {
  inout: any[]= [];
  displayedColumns: string[] = ['number', 'checkin', 'checkout'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSize: number;
  @ViewChild('example') example;
  constructor(private db: AngularFireDatabase,
    private customsortService:  CustomsortServiceService,
  private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.db.list(URLS.LOGINTIME).snapshotChanges().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        const data = res[i].payload.val();
        data['key'] = res[i].key;
        this.inout.push(data);
      }
      this.dataSource = new MatTableDataSource(this.inout);
      this.paginator.pageSize = this.pageSize;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortChange(eve) {
    if (eve.direction === '') {
      this.dataSource = new MatTableDataSource(this.inout);
      this.dataSource.paginator = this.paginator;
    } else {
      const listData = this.customsortService.getSortedData(this.dataSource, this.inout, this.displayedColumns, eve.active, eve.direction);
      this.dataSource = new MatTableDataSource(listData);
      this.dataSource.paginator = this.paginator;
      this.dataSource._renderChangesSubscription;
    }
  }

}
