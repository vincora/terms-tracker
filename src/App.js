import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
  Divider,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useForm } from "react-hook-form";
import MyDatePicker from "./components/MyDatePicker";
import MyProgressBar from "./components/MyProgressBar";
import { DateTime } from "luxon";

function App() {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      start: null,
      firstDeadline: null,
      lastDeadline: null,
      name: "",
    },
  });

  const [posts, setPosts] = useState(() => {
    const arr = JSON.parse(localStorage.getItem("posts"));
    return arr.map((i) => ({
      name: i.name,
      start: DateTime.fromISO(i.start),
      firstDeadline: DateTime.fromISO(i.firstDeadline),
      lastDeadline: i.lastDeadline ? DateTime.fromISO(i.lastDeadline) : null,
    }));
  });

  const onSubmit = ({ start, firstDeadline, lastDeadline, name }) => {
    setPosts(
      [
        ...posts,
        {
          name,
          start,
          firstDeadline,
          lastDeadline,
        },
      ]
    );
  };

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const removePost = (name) => {
    setPosts(posts.filter((p) => p.name !== name));
  };

  const [selectedSort, setSelectedSort] = useState("start");

  const handleChangeSort = (e) => {
    setSelectedSort(e.target.value);
  };

  useEffect(() => {
    if (posts.length > 1) {
      setPosts(
        [...posts].sort(
          (a, b) => a[selectedSort].toMillis() - b[selectedSort].toMillis()
        )
      );
    }
  }, [selectedSort, posts]);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Container maxWidth="md">
          <Box mt={3}>
            <Typography variant="h4" align="center" mb={3}>
              Deadline tracker
            </Typography>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="standard"
                label="Tracking name"
                sx={{ marginBottom: 3 }}
                {...register("name", {
                  required: "This field is required",
                })}
              ></TextField>

              <Stack direction="row" justifyContent="space-between" spacing={3}>
                <MyDatePicker
                  name="start"
                  rules={{ required: "This field is required" }}
                  label="start"
                  control={control}
                />
                <MyDatePicker
                  name="firstDeadline"
                  label="first deadline"
                  control={control}
                  rules={{
                    required: "This field is required",
                    validate: {
                      afterStart: (_, formValues) =>
                        formValues.firstDeadline > formValues.start ||
                        "Deadline should be after start",
                    },
                  }}
                />
                <MyDatePicker
                  name="lastDeadline"
                  label="last deadline"
                  control={control}
                  rules={{
                    validate: {
                      afterFirstDeadline: (
                        _,
                        { lastDeadline, firstDeadline }
                      ) => {
                        if (!(lastDeadline && firstDeadline)) return;

                        if (firstDeadline < lastDeadline) return;

                        return "Last deadline should be after first deadline";
                      },
                    },
                  }}
                />
              </Stack>
              <Button variant="contained" type="submit" sx={{ marginBlock: 3 }}>
                Add new deadline
              </Button>
            </form>
          </Box>
          <Divider />
          <FormControl variant="standard" sx={{ mt: 2, minWidth: 120 }}>
            <TextField
              id="select"
              label="sort by"
              select
              size="small"
              value={selectedSort}
              onChange={handleChangeSort}
            >
              <MenuItem value="start">start date</MenuItem>
              <MenuItem value="firstDeadline">first deadline</MenuItem>
              <MenuItem value="lastDeadline">last deadline</MenuItem>
            </TextField>
          </FormControl>
          <Box mt={3}>
            {posts.map(({ name, start, firstDeadline, lastDeadline }) => {
              return (
                <MyProgressBar
                  name={name}
                  start={start}
                  firstDeadline={firstDeadline}
                  lastDeadline={lastDeadline}
                  key={name + start + firstDeadline}
                  remove={removePost}
                ></MyProgressBar>
              );
            })}
          </Box>
        </Container>
      </LocalizationProvider>
    </div>
  );
}

export default App;
