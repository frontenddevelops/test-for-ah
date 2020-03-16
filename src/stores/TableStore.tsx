import { action, observable } from 'mobx';

export class TableStore {
  @observable
  tableData?: any[];

  constructor() {
    this.reset();
  }

  endpoint = 'https://raw.githubusercontent.com/blmzv/ah-frontend-intern/master/profiles.json';

  fetchTableData = async () => {
    let url = this.endpoint;
    let response = await fetch(url);
    let data = await response.json();

    this.setTableData(data);
    return data;
  };

  @action
  reset() {
    this.tableData = undefined;
  }

  @action
  setTableData(tableData?: any) {
    this.tableData = tableData;
  }
}
