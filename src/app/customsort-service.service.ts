import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomsortServiceService {

  constructor() { }

  getSortedData(dataSource, list, displayedColumns, active, direction) {
    // 1. datasource origin mat table data
    // 2. type of array or data
    // 3. listOf columns array  (column data array)
    // 4. sorted coloumn value (sorted column name)
    // 5. sorted direction (sorted column direction)
    let self = this;
    let actvieKeys = [];
    if (active.indexOf('.')) {
      actvieKeys = active.split('.');
    }
    if (displayedColumns.indexOf(actvieKeys[0]) > -1) {
      list = dataSource.filteredData;
      if (direction !== '') {
        const keys = Object.keys(list[0]);
        if (keys.indexOf(actvieKeys[0]) > -1) {
          const typeOfData = typeof (self.getValue(list[0], actvieKeys));
          const dir = (direction === 'asc') ? 1 : -1;
          if (typeOfData === 'string') {
            list.sort(function (a, b) {
              return (self.getValue(a, actvieKeys).toLowerCase().localeCompare(self.getValue(b, actvieKeys).toLowerCase())) * dir;
            });
          } else {
            list.sort(function (a, b) {
              return (a[keys[keys.indexOf(active)]] - b[keys[keys.indexOf(active)]]) * dir;
            });
          }
        }
      }
    }
    return list;
  }

  getValue(data, actvieKeys) {
    let value = data;
    actvieKeys.forEach(function (x) {
              value = value ? value[x] : null;
              if (Array.isArray(value)) {
                value = value[0];
              }
          });
    return value;
  }
}
