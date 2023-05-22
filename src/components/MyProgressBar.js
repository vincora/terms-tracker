import { Stack, Typography, IconButton, } from "@mui/material";
import { DeleteOutlined } from '@mui/icons-material';
import React, { useEffect, useRef } from "react";
import { DateTime } from "luxon";
import styles from "./MyProgressBar.module.scss";
import cn from "classnames";

const MyPost = ({ name, start, firstDeadline, lastDeadline, remove }) => {
  const ref = useRef();

  const allTerm = lastDeadline
    ? lastDeadline.diff(start).as("days")
    : firstDeadline.diff(start).as("days");
  const today =
    Math.max(Math.floor(DateTime.now().diff(start).as("days")) / allTerm, 0) *
    100;
  const deadlines = (firstDeadline.diff(start).as("days") / allTerm) * 100;

  useEffect(() => {
    setTimeout(() => (ref.current.style.width = `${today}%`), 0);
  }, [today]);

  return (
    <div className={styles.progress__wrapper}>
      <Stack flexDirection="row" justifyContent='space-between' alignItems='center'>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          {name}
        </Typography>
        <IconButton aria-label="delete" onClick={() => remove(name)}>
          <DeleteOutlined />
        </IconButton>
      </Stack>
      <div className={cn(styles.progress , {[styles.progress_exp] : lastDeadline})}>
        <div ref={ref} className={styles.progress__now}></div>
        {lastDeadline ? (
          <div
            className={styles.progress__firstDeadline}
            style={{ width: `${deadlines}%` }}
          >
            <Typography
              variant="body2"
              className={styles.progress__firstDeadlineLabel}
            >
              {firstDeadline.toLocaleString()}
            </Typography>
          </div>
        ) : (
          undefined
        )}
      </div>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="body2">{start.toLocaleString()}</Typography>
        {lastDeadline ? (
          <Typography variant="body2">
            {lastDeadline.toLocaleString()}
          </Typography>
        ) : (
          <Typography variant="body2">
            {firstDeadline.toLocaleString()}
          </Typography>
        )}
      </Stack>
    </div>
  );
};

export default MyPost;
