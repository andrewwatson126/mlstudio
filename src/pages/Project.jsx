/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import axios from "axios";

const Project = props => {
  const { match} = props
  const { params} = match
  const { projectId} = params


  return (
    <div>
      {'This is a project '} <br/>
      {' ${projectId} '}<br/>
      '${projectId}'
    </div>
  );
};

export default Project;
