import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useForm } from "react-hook-form";
import MyDatePicker from "./components/MyDatePicker";

function App() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      start: null,
      firstDeadline: null,
      lastDeadline: null,
    },
  });
  const onSubmit = (data) => console.log(data);

  const [name, setName] = useState("");

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 3 }}
              ></TextField>
              <Typography>{name}</Typography>

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
                {" "}
                Submit{" "}
              </Button>
            </form>
          </Box>
        </Container>
      </LocalizationProvider>
    </div>
  );
}

export default App;
