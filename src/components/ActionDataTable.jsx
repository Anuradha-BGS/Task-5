import {
  DataTable,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import React, { useEffect, useState } from "react";
import { getData } from '../services/dataService';
import { columns, TableHeaderComponent } from "./Header";

const ActionDataTable = () => {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const reset = () => {
    setRows(data);
  };

  useEffect(() => {
    getData().then((response) => {
      
      const dataList = response.data.map((r) => ({
        ...r,
        id: r.id.toString(),
      }));
      setRows(dataList);
      debugger;
      setData(dataList);
    });
  }, []);

  const onDelete = (selectedRows) => {
    const ids = selectedRows.map((s) => s.id);
    setRows(rows.filter((r) => !ids.includes(r.id)));
  };

  const onClickDelete = (row) => {
    setRows(rows.filter((r) => row.id !== r.id));
  };

  return (
    <DataTable rows={rows} headers={columns} isSortable>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getToolbarProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
        getTableProps,
        getTableContainerProps,
      }) => {
        const batchActionProps = getBatchActionProps();
        return (
          <TableContainer title="DataTable" description="With batch actions." {...getTableContainerProps()}>
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...batchActionProps}>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  onClick={() => onDelete(selectedRows)}
                >
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  onClick={() => alert(`${selectedRows.length} rows selected and pressed save`)}
                >
                  Save
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  onClick={() => alert(`${selectedRows.length} rows selected and pressed download`)}
                >
                  Download
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent aria-hidden={batchActionProps.shouldShowBatchActions}>
                <TableToolbarSearch
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  onChange={onInputChange}
                />
                <Button tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0} kind="primary" onClick={reset}>
                  Reset
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHeaderComponent
                headers={headers}
                 getHeaderProps={getHeaderProps}
                getSelectionProps={getSelectionProps}
              />
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i} {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => {
                      if (cell.info.header === "image") {
                        return (
                          <TableCell className="cds--table-column-menu" key={cell.id}>
                            <img src={cell.value} alt={cell.value} width="50px" height="auto" />
                          </TableCell>
                        );
                      }
                      if (cell.info.header === "actions") {
                        return (
                          <TableCell className="cds--table-column-menu" key={cell.id}>
                            <OverflowMenu size="sm" ariaLabel="menu" flipped>
                              <OverflowMenuItem itemText="Delete" onClick={() => onClickDelete(row)}>
                                Delete
                              </OverflowMenuItem>
                            </OverflowMenu>
                          </TableCell>
                        );
                      }
                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }}
    </DataTable>
  );
};

export default ActionDataTable;
