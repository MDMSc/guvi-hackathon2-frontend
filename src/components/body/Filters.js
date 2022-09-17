import React, { useContext } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "./filters.css";
import Context from "../../reducer/Context";
import {
  CLEAR_FILTERS,
  FILTER_BY_MUSICAL,
  FILTER_BY_PHOTOGRAPHY,
  FILTER_BY_SEARCH,
  FILTER_BY_TW,
} from "../../reducer/Action.type";

export default function Filters() {
  const context = useContext(Context);
  
  return (
    <div className="filters">
      <div className="title">Filter Products</div>
      <div>
        <TextField
          id="search"
          label="Search by Name"
          variant="outlined"
          color="secondary"
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
          onChange={(e) => {
            context.filterDispatch({
              type: FILTER_BY_SEARCH,
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div>
        
        <h5>By Category</h5>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={context.filterState.byCatP} />}
            label="Photography"
            onChange={() => {
              context.filterDispatch({
                type: FILTER_BY_PHOTOGRAPHY,
              });
            }}
          />
          <FormControlLabel
            control={<Checkbox checked={context.filterState.byCatM} />}
            label="Musical"
            onChange={() => {
              context.filterDispatch({
                type: FILTER_BY_MUSICAL,
              });
            }}
          />
          <FormControlLabel
            control={<Checkbox checked={context.filterState.byCatTW} />}
            label="Two-Wheelers"
            onChange={() => {
              context.filterDispatch({
                type: FILTER_BY_TW,
              });
            }}
          />
        </FormGroup>
      </div>
      <Button
        variant="contained"
        aria-label="clear filters"
        color="secondary"
        onClick={() => {
          context.filterDispatch({
            type: CLEAR_FILTERS,
          });
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}
