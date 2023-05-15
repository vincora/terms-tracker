import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useForm } from "react-hook-form";
import MyDatePicker from "./components/MyDatePicker";
import MyPost from "./components/MyPost";


function App() {
  const { handleSubmit, control, register, reset, formState: {isSubmitSuccessful} } = useForm({
    defaultValues: {
      start: null,
      firstDeadline: null,
      lastDeadline: null,
      name: "",
    },
  });

  const [posts, setPosts] = useState([]);

  const onSubmit = ({ start, firstDeadline, lastDeadline, name}) => {
    console.log(start);
    setPosts([
      ...posts,
      {
        name: name,
        start: start.toLocaleString(),
        firstDeadline: firstDeadline.toLocaleString(),
        lastDeadline: lastDeadline?.toLocaleString(),
      },
    ])
  };

  useEffect(() => {
    reset()
  }, [isSubmitSuccessful, reset])

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Container maxWidth="md">
          <Box mt={3}>
            <Typography variant="h4" align="center" mb={3}>
              Term tracker
            </Typography>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="standard"
                label="Tracking name"
                sx={{ marginBottom: 3 }}
                {...register("name")}
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
                Submit
              </Button>
            </form>
          </Box>
          <Box mt={3}>
            {posts.map(({name, start, firstDeadline, lastDeadline}) => {
              return (
                <MyPost
                  name={name}
                  start={start}
                  firstDeadline={firstDeadline}
                  lastDeadline={lastDeadline}
                  key={name + start + firstDeadline}
                ></MyPost>
              );
            })}
          </Box>
        </Container>
      </LocalizationProvider>
    </div>
  );
}

export default App;
