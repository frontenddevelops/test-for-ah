import React, { useContext, useEffect, useState } from 'react';
import { Table } from './Table';
import { StoresContext } from './stores';

export const App = () => {
  const {tableStore} = useContext(StoresContext);
  const {fetchTableData} = tableStore;

  const [table, setTable] = useState();

  const getTableData = async () => {
    const tableFromUrl = await fetchTableData();
    setTable(tableFromUrl);
  };

  useEffect(() => {
    getTableData()
  }, []);


  return (
    <div className="App">
      {table &&
      <Table data={table}/>
      }
    </div>
  );
};

