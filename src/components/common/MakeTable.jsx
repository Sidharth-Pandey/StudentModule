import {
  makeStyles,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});
const MakeTable = (props) => {
  const classes = useStyles();
  const {
    data,
    style,
    columns,
    clickRow,
    activeRadio,
    selectedId,
    tableCellHeight,
  } = props;
  return (
    <TableContainer style={style}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {!!columns &&
              !!columns.length &&
              columns.map((item, keys) =>
                keys === 0 ? (
                  activeRadio ? (
                    <>
                      <TableCell
                        key={item.id}
                        align="center"
                        style={{ fontWeight: "bold" }}
                      ></TableCell>
                      <TableCell
                        key={item.id}
                        align="center"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.title}
                      </TableCell>
                    </>
                  ) : (
                    <TableCell
                      key={item.id}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.title}
                    </TableCell>
                  )
                ) : (
                  <TableCell
                    key={item.id}
                    align="center"
                    style={{ fontWeight: "bold" }}
                  >
                    {item.title}
                  </TableCell>
                )
              )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data &&
            !!data.length &&
            data.map((item) => (
              <TableRow
                key={item.id}
                hover={true}
                onClick={() => clickRow && clickRow(item)}
                style={{ cursor: "pointer" }}
              >
                {activeRadio ? (
                  <TableCell align="center">
                    <Radio checked={selectedId === item.id} />
                  </TableCell>
                ) : (
                  <></>
                )}
                {columns.map((vals) => (
                  <TableCell
                    style={{ padding: tableCellHeight }}
                    align="center"
                  >
                    {item[vals.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MakeTable;
