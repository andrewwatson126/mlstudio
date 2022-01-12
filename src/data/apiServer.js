import axios from "axios";
import CreateProject from "../components/CreateProject";
import mockProjectListData from "../data/mockProjectListData";
import { useHistory, useLocation } from 'react-router-dom'
import { MediaBluetoothOnSharp } from "@mui/icons-material";
import ProjectHeader from "../components/ProjectHeader";
import blankProjectData from "../data/blankProjectData";
import Avatar from '@mui/material/Avatar';
import sherlock from "../images/sherlock.png";
import CloseIcon from '@material-ui/icons/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


export const apiServerUrl =  'http://apiserver:8000'
 