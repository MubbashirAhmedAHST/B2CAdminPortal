// "use client"
import { useState, useMemo } from 'react';
import { filterData } from '../helpers/utilities';

export function useColumn(columnsData) {
  const [checkedColumns, setCheckedColumns] = useState(
    columnsData.map((column) => column.dataIndex)
  );

  const visibleColumns = useMemo(
    () => filterData(columnsData, checkedColumns),
    [columnsData, checkedColumns]
  );

  return { visibleColumns, checkedColumns, setCheckedColumns };
}
