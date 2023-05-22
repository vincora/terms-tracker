import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { dateFormat } from '../format';


const MyDatePicker = ({name, rules, label, control}) => {
  return (   
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: {error, invalid} }) => (
        <DatePicker 
          {...field} 
          format={dateFormat}
          label={label}
          slotProps={{
            textField: {
              helperText: error?.message,
              error: invalid,
              fullWidth: true
            }
          }}
        />)}
    />
  )
}

export default MyDatePicker