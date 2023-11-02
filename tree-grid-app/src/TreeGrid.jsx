import React from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

const TreeGrid = ({ data }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Set initial page and page size
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <div>
      <div className="filter">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <table {...getTableProps()} className="tree-grid">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        {/* Pagination buttons go here */}
      </div>
    </div>
  );
};

export default TreeGrid;
