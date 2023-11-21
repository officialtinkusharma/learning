import { Injectable } from '@angular/core';
import { TableValueParserPipe } from 'src/app/shared/pipe/table-value-parser.pipe';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private tableValueParserPipe: TableValueParserPipe) {}
  commonFilter = [
    { id: '=', name: 'Equals' },
    { id: '!=', name: 'Not Equals' },
    { id: 'blank', name: 'Blank' },
    { id: 'not_blank', name: 'Not Blank' },
  ];
  numbersFilter = [
    { id: '<', name: 'Less Than' },
    { id: '<=', name: 'Less Than or Equals' },
    { id: '>', name: 'Greater Than' },
    { id: '>=', name: 'Greater Than or equals' },
  ];
  stringFilter = [
    { id: 'contains', name: 'Contains' },
    { id: 'not_contains', name: 'Not Contains' },
    { id: 'start_with', name: 'Start With' },
    { id: 'end_with', name: 'End With' },
  ];

  getStringFilter() {
    let filter = this.stringFilter.concat(this.commonFilter);
    return filter.sort((a: any, b: any) => {
      return a.name - b.name;
    });
  }
  getNumberFilter() {
    let filter = this.numbersFilter.concat(this.commonFilter);
    return filter.sort((a: any, b: any) => {
      return a.name - b.name;
    });
  }

  applyFilter(
    headerName: string,
    firstRule: any,
    firstValue: any,
    condition: any,
    secondRule: any,
    secondValue: any,
    dataList: any
  ) {
    let newArray = JSON.parse(JSON.stringify(dataList));
    let filterDataUsingSecondValue = [];
    if (!firstValue && firstRule != 'blank' && firstRule != 'not_blank') {
      return dataList;
    } else {
      switch (firstRule) {
        case 'contains':
          newArray = this.containsRule(headerName, firstValue, dataList);
          break;
        case 'not_contains':
          newArray = this.notContainsRule(headerName, firstValue, dataList);
          break;
        case '=':
          newArray = this.equalsRule(headerName, firstValue, dataList);
          break;
        case '!=':
          newArray = this.notEqualsRule(headerName, firstValue, dataList);
          break;
        case 'blank':
          newArray = this.blankRule(headerName, firstValue, dataList);
          break;
        case 'not_blank':
          newArray = this.notBlankRule(headerName, firstValue, dataList);
          break;
        case 'start_with':
          newArray = this.startWithRule(headerName, firstValue, dataList);
          break;
        case 'end_with':
          newArray = this.endWithRule(headerName, firstValue, dataList);
          break;
        case '<':
          newArray = this.lessThanRule(headerName, firstValue, dataList);
          break;
        case '<=':
          newArray = this.lessThanOrEqualsRule(
            headerName,
            firstValue,
            dataList
          );
          break;
        case '>':
          newArray = this.greaterThanRule(headerName, firstValue, dataList);
          break;
        case '>=':
          newArray = this.greaterThanOrEqualsRule(
            headerName,
            firstValue,
            dataList
          );
          break;
      }
    }
    if (!secondValue && secondRule != 'blank' && secondRule != 'not_blank') {
      return newArray;
    } else {
      let newDataList = condition == 'or' ? dataList : newArray;
      switch (secondRule) {
        case 'contains':
          filterDataUsingSecondValue = this.containsRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case 'not_contains':
          filterDataUsingSecondValue = this.notContainsRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case '=':
          filterDataUsingSecondValue = this.equalsRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case '!=':
          filterDataUsingSecondValue = this.notEqualsRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case 'blank':
          filterDataUsingSecondValue = this.blankRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case 'not_blank':
          filterDataUsingSecondValue = this.notBlankRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case 'start_with':
          filterDataUsingSecondValue = this.startWithRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case 'end_with':
          filterDataUsingSecondValue = this.endWithRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case '<':
          filterDataUsingSecondValue = this.lessThanRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case '<=':
          filterDataUsingSecondValue = this.lessThanOrEqualsRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case '>':
          filterDataUsingSecondValue = this.greaterThanRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
        case '>=':
          filterDataUsingSecondValue = this.greaterThanOrEqualsRule(
            headerName,
            secondValue,
            newDataList
          );
          break;
      }
      if (condition == 'or') {
        let newarr = JSON.parse(JSON.stringify(filterDataUsingSecondValue));
        newArray.forEach((element: any) => {
          let index = newarr.findIndex(
            (item: any) => item.rowId == element.rowId
          );
          if (index == -1) {
            newarr.push(element);
          }
        });
        return newarr;
      } else {
        return filterDataUsingSecondValue;
      }
    }
  }
  containsRule(headerName: any, value: any, dataList: any) {
    let newList;
    newList = dataList.filter((item: any) =>
      this.tableValueParserPipe
        .transform(item, headerName)
        ?.toLowerCase()
        .includes(value.trim().toLowerCase())
    );

    return newList;
  }
  notContainsRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) =>
        !this.tableValueParserPipe
          .transform(item, headerName)
          ?.toLowerCase()
          .includes(value.trim().toLowerCase())
    );
    return newList;
  }
  equalsRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) =>
        this.tableValueParserPipe.transform(item, headerName) == value
    );
    return newList;
  }
  notEqualsRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) =>
        this.tableValueParserPipe.transform(item, headerName) != value
    );
    return newList;
  }
  blankRule(headerName: string, _value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) => !this.tableValueParserPipe.transform(item, headerName)
    );
    return newList;
  }
  notBlankRule(headerName: string, _value: any, dataList: any) {
    let newList;
    newList = dataList.filter((item: any) =>
      this.tableValueParserPipe.transform(item, headerName)
    );
    return newList;
  }
  startWithRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter((item: any) =>
      this.tableValueParserPipe
        .transform(item, headerName)
        ?.toLowerCase()
        .startsWith(value.toLowerCase())
    );
    return newList;
  }
  endWithRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter((item: any) =>
      this.tableValueParserPipe
        .transform(item, headerName)
        ?.toLowerCase()
        .endsWith(value.toLowerCase())
    );
    return newList;
  }
  lessThanRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) =>
        this.tableValueParserPipe.transform(item, headerName) < value
    );
    return newList;
  }
  greaterThanRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) =>
        this.tableValueParserPipe.transform(item, headerName) > value
    );

    return newList;
  }
  lessThanOrEqualsRule(headerName: string, value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) =>
        this.tableValueParserPipe.transform(item, headerName) <= value
    );
    return newList;
  }
  greaterThanOrEqualsRule(headerName: any, value: any, dataList: any) {
    let newList;
    newList = dataList.filter(
      (item: any) =>
        this.tableValueParserPipe.transform(item, headerName) >= value
    );
    return newList;
  }
}
