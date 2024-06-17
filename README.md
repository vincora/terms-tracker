# Deadline tracker app

This is a web application designed to track and visualize deadlines. It allows users to set a start date, a first estimated deadline, and an optional second final deadline. The app visualizes progress between these dates, showing how much time has passed since the start date to the end. You can set up multiple deadlines and see how close today's date is to the endpoint for each.

For example, you have several work projects at once that need to be completed by different deadlines and you want to see, how much time you have left for each of them. Or you only know the approximate delivery time of your parcel (between two dates) and want to understand, if delivery is still on time or you should contact support service.

---

## Features

- **Deadline Creation:** Users can add one or multiple deadlines with a title.
- **Progress Visualization:** Visualizes progress with a visual line (progress bar) showing elapsed time from start to end.
- **Sorting Deadlines:** Users can sort deadlines by selecting a sorting method from a dropdown list: by start date, by first deadline, or by last deadline.

---

## Usage

1. **Adding Deadline**:

   - Click on the "Tracking name" input to create a new deadline tracker.
   - Click "start" date-picker to type or choose starting point.
   - Click "first deadline" date-picker to set the first deadline. If you only need one endpoint, skip the nest step.
   - Click "last deadline" date-picker to set the last deadline.
   - Click "add new deadline" button to finish creating deadline tracker.
   - You can add many deadline trackers to compare them.

2. **Sorting**:
   - Select the sorting method from a drop-down list.
   - All trackers will be automatically sorted by selected method.
3. **Deleting Categories and Items**:
   - Click on the trash icon next to a tracker to delete it.

---

## Technologies Used

- [React](https://reactjs.org/)
- [MUI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
