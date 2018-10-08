import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';
import {URLS} from '../URLS.enum';
import {CustomsortServiceService} from '../services/customsort-service.service';
import { LocalStorageService } from '../services/local-storage.service';
@Component({
  selector: 'app-listcompany',
  templateUrl: './listcompany.component.html',
  styleUrls: ['./listcompany.component.css']
})
export class ListcompanyComponent implements OnInit {
  listcompany: any[]= [];
  displayedColumns: string[] = ['number','date', 'employeeName', 'companyName',  'concernPerson', 'contact', 'email', 'conversationDone', 'followup', 'remarks'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSize: number;
  @ViewChild('example') example;
  constructor(private db: AngularFireDatabase,
    private customsortService:  CustomsortServiceService,
  private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.db.list(URLS.CORPORATE).snapshotChanges().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        const data = res[i].payload.val();
        data['key'] = res[i].key;
        this.listcompany.push(data);
      }
      this.dataSource = new MatTableDataSource(this.listcompany);
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
      this.dataSource = new MatTableDataSource(this.listcompany);
      this.dataSource.paginator = this.paginator;
    } else {
      const listData = this.customsortService.getSortedData(this.dataSource, this.listcompany, this.displayedColumns, eve.active, eve.direction);
      this.dataSource = new MatTableDataSource(listData);
      this.dataSource.paginator = this.paginator;
      this.dataSource._renderChangesSubscription;
    }
  }

}
