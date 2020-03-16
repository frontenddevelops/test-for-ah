import { createContext } from 'react';
import { TableStore } from './TableStore';

const tableStore = new TableStore();

const StoresContext = createContext({
  tableStore
});

export {
  StoresContext,
  TableStore
};
