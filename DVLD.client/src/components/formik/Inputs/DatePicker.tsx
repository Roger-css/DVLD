import { Field, FieldProps, ErrorMessage } from "formik";
import TextError from "../TextError";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { SxProps } from "@mui/material";

type TyProps = {
  name: string;
  sx?: SxProps;
  label: string;
};

const DateInput = (props: TyProps) => {
  const { name, label, ...rest } = props;
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 18);
  return (
    <div className="form-control">
      <Field id={name} name={name} {...rest}>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...rest}
                  maxDate={dayjs(minDate)}
                  name={field.name}
                  onChange={(value: Dayjs | null) => {
                    form.setFieldValue(name, value?.toDate());
                    form.setFieldTouched(name, true);
                  }}
                  label={label}
                  value={field.value}
                  onError={(e) => {
                    console.log(e);
                    form.setFieldError(name, e?.toString());
                  }}
                />
              </LocalizationProvider>
              <ErrorMessage component={TextError} name={name} />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default DateInput;
