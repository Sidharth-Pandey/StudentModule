import React, { useEffect, useState } from "react";
import {
  FormControl,
  makeStyles,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DropDown = (props) => {
  const [data, setData] = useState(false);
  const [selected, setSelected] = useState(
    props.defaultVal && props?.data[0]?.value
  );
  const classes = useStyles();
  useEffect(() => {
    setData(props.data);
    console.log(props.data, "956565656565");
    props.selected(selected);
  });

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <FormControl
      style={{ minWidth: props.width, paddingRight: props.paddingRight }}
      variant="outlined"
    >
      {props.data.length > 0 ? (
        <>
          <InputLabel
            style={{
              marginLeft: "5px",
              fontSize: props.placeholderFontSize,
              // fontSize: "0.8rem",
              // marginTop: "-0.5rem",
              marginTop: props.placeholderMarginTop,
            }}
            id="demo-simple-select-label"
          >
            {props.placeholder}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            // defaultValue={1}
            style={{ height: props.selectHeight }}
            onChange={handleChange}
            variant="outlined"
          >
            {Object.keys(data).map((item, index) => (
              <MenuItem value={data[item].value} selected>
                {" "}
                {data[item].title}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <TextField
          disabled
          id="filled-disabled"
          defaultValue="NO DATA TO SELECT"
          variant="filled"
        ></TextField>
      )}
    </FormControl>
  );
};

export default DropDown;
