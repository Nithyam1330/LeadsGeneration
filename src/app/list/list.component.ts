import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';
import {URLS} from '../URLS.enum';

import {CustomsortServiceService} from '../customsort-service.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: any[] = [];
  displayedColumns: string[] = ['number','employeeName',  'customerName', 'customerContact',
  'customerEmail', 'product', 'source', 'destination',  'bookingDate',  'travelDate', 'Passengers', 'remark' ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSize: number;
  @ViewChild('example') example;
  constructor(private db: AngularFireDatabase,
    private customsortService:  CustomsortServiceService) { }

  ngOnInit() {
    this.db.list(URLS.LEADS_CREATOR).snapshotChanges().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        const data = res[i].payload.val();
        data['key'] = res[i].key;
        this.list.push(data);
      }
      this.dataSource = new MatTableDataSource(this.list);
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
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
    } else {
      const listData = this.customsortService.getSortedData(this.dataSource, this.list, this.displayedColumns, eve.active, eve.direction);
      this.dataSource = new MatTableDataSource(listData);
      this.dataSource.paginator = this.paginator;
      this.dataSource._renderChangesSubscription;
    }
  }

}
