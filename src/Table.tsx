import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

interface Table {
  data?: any;
}

export const Table = observer(({data}: Table) => {

    const [sortDir, setSortDir] = useState(localStorage.currentSort);
    const [tableData, setTableData] = useState(data);
    const [keySort, setKeySort] = useState();

    useEffect(() => {
      if (localStorage.sortKey !== 'undefined') {
        sortBy(localStorage.sortKey);
      }
    }, []);


    const onSortChange = () => {
      const currentSort = sortDir;
      localStorage.currentSort = currentSort;

      let nextSort;

      switch (currentSort) {
        case 'down':
          nextSort = 'up';
          break;
        case 'up':
          nextSort = 'down';
          break;
        default:
          nextSort = 'down';
          break;
      }
      setSortDir(nextSort);
    };

    const compareBy = (key: any) => {
      switch (sortDir) {
        case 'down':
          return function (a: any, b: any) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
          };
        case 'up':
          return function (a: any, b: any) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
          };
        default:
          return function (a: any, b: any) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
          };
      }
    };
    const sortBy = (key: string) => {
      localStorage.sortKey = key;
      let arrayCopy = [...tableData];
      arrayCopy.sort(compareBy(key));
      setTableData(arrayCopy);
      onSortChange();
      setKeySort(key);
    };


    const getClassName = (className: string) => {
      return ({
          up: 'sort-up',
          down: 'sort-down'
        }[className]
      );
    };

    const getKeys = () => {
      return Object.keys(data[0]);
    };

    const getHeader = () => {
      let keys = getKeys();
      return keys.map((key, index) => {
        return <th key={key} onClick={() => sortBy(key)}>
          {key.toUpperCase()}
          {
            key === keySort && (<i className={`fa fa-${getClassName(sortDir)}`}/>)
          }
        </th>;
      });
    };

    const getRowsData = () => {
      let items = tableData;
      let keys = getKeys();
      return items.map((row: any, index: any) => {
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>;
      });
    };

    return (
      <div>
        <table>
          <thead>
          <tr>{getHeader()}</tr>
          </thead>
          <tbody>
          {getRowsData()}
          </tbody>
        </table>
      </div>
    );
  })
;

const RenderRow = (props: any) => {
  return props.keys.map((key: number) => {
    return <td key={props.data[key]}>{props.data[key]}</td>;
  });
};
