import {
  Stack,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import styles from "./MyProgressBar.module.scss";
import cn from "classnames";
import { dateFormat } from "../format";

const dayDiff = (finish, start) => finish.diff(start).as("days");

const MyPost = ({ name, start, firstDeadline, lastDeadline, remove }) => {
  const ref = useRef();

  const allTerm = dayDiff(lastDeadline ? lastDeadline : firstDeadline, start);
  const today =
    Math.min(
      Math.max(Math.floor(dayDiff(DateTime.now(), start)) / allTerm, 0),
      1
    ) * 100;
  const deadlines = (dayDiff(firstDeadline, start) / allTerm) * 100;

  useEffect(() => {
    setTimeout(() => (ref.current.style.width = `${today}%`), 0);
  }, [today]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.progress__wrapper}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          {name}
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => {
            setOpen(true);
          }}
        >
          <DeleteOutlined />
        </IconButton>
        <Dialog open={open} aria-labelledby="alert-dialog-title">
          <DialogTitle id="alert-dialog-title">
            {"Do you want to delete this item?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => {
                remove(name);
                handleClose();
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
      <div
        className={cn(styles.progress, { [styles.progress_exp]: lastDeadline })}
      >
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
              {firstDeadline.toFormat(dateFormat)}
            </Typography>
          </div>
        ) : undefined}
      </div>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="body2" mt={1}>{start.toFormat(dateFormat)}</Typography>
        <Typography variant="body2" mt={1}>
          {(lastDeadline ? lastDeadline : firstDeadline).toFormat(dateFormat)}
        </Typography>
      </Stack>
    </div>
  );
};

export default MyPost;
