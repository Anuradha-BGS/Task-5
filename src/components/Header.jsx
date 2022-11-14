import React from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  
} from "carbon-components-react";

export const columns = [
  {
    key: "image",
    header: "Image",
  },
  {
    key: "id",
    header: "ID",
  },
  {
    key: "title",
    header: "Title",
  },
  {
    key: "price",
    header: "Price",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "actions",
    header: "Actions",
  },
];

export const TableHeaderComponent = ({ getSelectionProps, getHeaderProps, headers }) => {
  return (
    <TableHead>
      <TableRow>
        {getSelectionProps && <TableSelectAll {...getSelectionProps()} />}
       
        {headers.map((header, i) => {
          const headerProps = getHeaderProps({ header });
  

          return (
            <TableHeader key={i} {...headerProps}>
              {header.header}
            </TableHeader>
          );
        })}
      </TableRow>
    </TableHead>
  );
};