import { ErrorMessage, Field, FieldProps } from "formik";
import TextError from "../TextError";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
} from "@mui/material";

type TyOption = { value: string | number; text: string };
type TyProps = {
  label: string;
  name: string;
  options: TyOption[];
  sx?: SxProps;
};
function FirstWord(value: string): string {
  return value.split(" ")[0];
}
const MySelect = (props: TyProps) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <FormControl>
                <InputLabel id={`select-${FirstWord(label)}`}>
                  {label}
                </InputLabel>
                <Select
                  {...rest}
                  {...field}
                  size="small"
                  label={label}
                  labelId={`select-${FirstWord(label)}`}
                  error={!!(form.errors[name] && form.touched[name])}
                >
                  {options.map((option) => {
                    return (
                      <MenuItem key={option.text} value={option.value}>
                        {option.text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <ErrorMessage name={name} component={TextError} />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default MySelect;
