import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandRow,
  TableExpandedRow,
} from "carbon-components-react";
import React, { useState, useEffect } from "react";
import { columns, TableHeaderComponent } from "./Header";
import { getData } from "../services/dataService";

const ExpansionDataTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData().then(response => {
      setRows(
        response.map((r) => ({
          ...r,
          id: r.id.toString(),
        }))
      );
    })
  }, []);

  return (
    <DataTable rows={rows} headers={columns}>
      {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getTableContainerProps }) => (
        <TableContainer title="DataTable" description="With expansion" {...getTableContainerProps()}>
          <Table {...getTableProps()}>
            <TableHeaderComponent headers={headers} isExpanded={true} getHeaderProps={getHeaderProps} />
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => {
                      if (cell.info.header === "image") {
                        return (
                          <TableCell className="cds--table-column-menu" key={cell.id}>
                            <img src={cell.value} alt={cell.value} width="50px" height="auto" />
                          </TableCell>
                        );
                      }
                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableExpandRow>
                  <TableExpandedRow colSpan={headers.length + 1} className="demo-expanded-td">
                    <h6>Expandable row content</h6>
                    <div>Description here</div>
                    <pre>{JSON.stringify(row, undefined, 2)}</pre>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default ExpansionDataTable;
