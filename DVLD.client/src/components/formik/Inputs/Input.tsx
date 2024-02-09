import { ErrorMessage, Field, FieldProps } from "formik";
import { SxProps, TextField } from "@mui/material";
import TextError from "../TextError";

type TyProps = {
  label: string;
  name: string;
  sx?: SxProps;
  handleChange?: (event: string) => void;
};

const Input = (props: TyProps) => {
  const { label, name, handleChange, ...rest } = props;
  return (
    <div className="form-control">
      <Field id={name} name={name} validate={handleChange}>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <TextField
                {...rest}
                {...field}
                size="small"
                label={label}
                variant="outlined"
                error={Boolean(form.errors[name] && form.touched[name])}
              />
              <ErrorMessage component={TextError} name={name} />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
