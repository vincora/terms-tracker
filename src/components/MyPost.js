import { Typography } from '@mui/material'
import React from 'react'
import MyProgressBar from './MyProgressBar'

const MyPost = ({ name, start, firstDeadline}) => {
  return (
    <>
        <Typography>{name}</Typography>
        <Typography>{start}</Typography>
        <Typography>{firstDeadline}</Typography>
        <MyProgressBar></MyProgressBar>
    </>
  )
}

export default MyPost