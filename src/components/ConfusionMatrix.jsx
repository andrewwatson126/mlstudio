import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from "axios";
import Notification from "./Notification";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Snackbar, makeStyles } from '@material-ui/core';
import blankConfigurationMatrix from "../data/blankConfigurationMatrix";

const useStyles = makeStyles(theme => ({
  root: {
      top: theme.spacing(9)
  }
}))




const ConfusionMatrix = props => {
  const { cmList, row } = props;
  const [cm, setCm] = useState(blankConfigurationMatrix);

  useEffect(() => {
    console.log("**************************** row=" + row + " cmList=" + cmList)
    console.log("**************************** row=" + typeof(row) + " cmList=" + typeof(cmList))
      if (cmList == null ) {
    } else {
      if (cmList.length > 0) {
        console.log("!!!!**************************** row=" + row + " cmList.length=" + cmList.length)
        setCm(cmList[row])
        console.log("CM SET !!!!!!!!!!!!!!!")
      }
    }
  }, [row]);
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Typography variant="body1" gutterBottom> 
        <div>sensitivity= {cm["sensitivity"]} </div>
        <div>specificity={cm["specificity"]} </div>
        <div>threshold={cm["thresholds"]}</div>
        </Typography>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Actual Positive (1) </TableCell>
            <TableCell align="right">Actual Negative (0)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Predicted Positive (1)</TableCell>
            <TableCell align="right">TP= {cm["tp"]} </TableCell>
            <TableCell align="right">FP= {cm["fp"]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Predicted Negative (0)</TableCell>
            <TableCell align="right">FN= {cm["fn"]} </TableCell>
            <TableCell align="right">TN= {cm["tn"]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ConfusionMatrix.propTypes = {
  cmList: PropTypes.array.isRequired,
  row: PropTypes.number.isRequired,
};

export default ConfusionMatrix;
