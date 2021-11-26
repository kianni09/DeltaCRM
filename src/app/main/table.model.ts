import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

export interface SortArrowStyle {
  normal: string;
  up: string;
  down: string;
}

export class Table {
  private _dataTable: any[];
  private _dataShow: any[];
  private _sortStatus: any;
  private _preSortData: any[];
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public searchValue: string;
  public OnSearchInit = new Subject<string>();
  private sortArrowStyles: SortArrowStyle = {
    normal: "unfold_more",
    up: "expand_less",
    down: "expand_more",
  };

  constructor(incomeData: any[]) {
    this._dataTable = incomeData;
    this._dataShow = incomeData;
    this._sortStatus = this._setSortStatus(this._dataShow[0]);
    this.OnSearchInit.pipe(debounceTime(500), distinctUntilChanged()).subscribe(
      (value) => {
        this._search(value.toLowerCase());
      }
    );
  }

  public getSortArrowStyle(column: string): string {
    if (this._sortStatus[column] == 0) {
      return this.sortArrowStyles.normal;
    } else if (this._sortStatus[column] == 1) {
      return this.sortArrowStyles.up;
    } else {
      return this.sortArrowStyles.down;
    }
  }

  get totalPages() {
    if (this._dataShow.length % this.pageSize != 0) {
      return Math.floor(this._dataShow.length / this.pageSize) + 1;
    } else {
      return Math.floor(this._dataShow.length / this.pageSize);
    }
  }

  private _setSortStatus(sortHeaders: any): any {
    let sort = {};
    for (let element in sortHeaders) {
      sort[element] = 0;
    }
    return sort;
  }

  get data() {
    return this._dataShow.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }

  get count() {
    return this._dataShow.length;
  }

  public rowSelect(rowOnSelect: any) {
    for (let row of this._dataShow) {
      if (rowOnSelect == row) {
        row.Select = !row.Select;
      }
    }
  }

  public rowsSelectAction(condition: boolean) {
    for (let row of this._dataShow) {
      row.Select = condition;
    }
  }

  public sort(sortColumn: string) {
    this.pageIndex = 0;
    if (this._sortStatus[sortColumn] == 0) {
      this._preSortData = [...this._dataShow];
    }
    let data = [...this._dataShow];
    for (let element in this._sortStatus) {
      element != sortColumn ? (this._sortStatus[element] = 0) : undefined;
    }
    if (this._sortStatus[sortColumn] == 0) {
      this._sortStatus[sortColumn] = 1;
    } else if (this._sortStatus[sortColumn] == 1) {
      this._sortStatus[sortColumn] = -1;
    } else {
      this._sortStatus[sortColumn] = 0;
    }
    if (this._sortStatus[sortColumn] != 0) {
      this._dataShow = data.sort((t1, t2) => {
        const e1 = t1[sortColumn];
        const e2 = t2[sortColumn];
        if (e1 > e2) {
          return 1 * this._sortStatus[sortColumn];
        }
        if (e1 < e2) {
          return -1 * this._sortStatus[sortColumn];
        }
        return 0;
      });
    } else {
      this._dataShow = this._preSortData;
    }
  }

  private _search(value: string) {
    this.pageIndex = 0;
    for (let element in this._sortStatus) {
      this._sortStatus[element] = 0;
    }
    if (value.length > 0) {
      let data = [...this._dataTable];
      let result = data.filter((element) => {
        if (
          Object["values"](element)
            .map((value) => {
              return (value + "").toLowerCase();
            })
            .join(" ")
            .includes(value)
        ) {
          return true;
        } else {
          return false;
        }
      });
      this._dataShow = result;
    } else {
      this._dataShow = this._dataTable;
    }
  }

  public prevPage() {
    this.pageIndex > 0 ? this.pageIndex-- : undefined;
  }

  public nextPage() {
    this.pageIndex < this.totalPages - 1 ? this.pageIndex++ : undefined;
  }

  public updatePageManual(index: number) {
    this.pageIndex = index;
  }

  get centreButtons() {
    let centreButtons = [];
    if (this.totalPages > 4) {
      if (this.pageIndex > 2 && this.pageIndex < this.totalPages - 2) {
        centreButtons = [
          this.pageIndex,
          this.pageIndex + 1,
          this.pageIndex + 2,
        ];
      }
      if (this.pageIndex <= 2) {
        centreButtons = [2, 3, 4];
      }
      if (this.pageIndex >= this.totalPages - 2) {
        centreButtons = [
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
        ];
      }
    } else {
      if (this.totalPages > 2) {
        centreButtons.push(2);
      }
      if (this.totalPages > 3) {
        centreButtons.push(3);
      }
      if (this.totalPages > 4) {
        centreButtons.push(4);
      }
    }
    return centreButtons;
  }
}
