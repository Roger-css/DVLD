import { ErrorMessage, Field, FieldProps } from "formik";
import { SxProps, TextField } from "@mui/material";
import TextError from "../TextError";

type TyProps = {
  label: string;
  name: string;
  sx?: SxProps;
  handleChange?: (event: string) => void;
  className?: string;
  type?: "text" | "password" | "number" | "email";
  readonly?: boolean;
  autoComplete?: string;
};

const Input = (props: TyProps) => {
  const {
    label,
    name,
    handleChange,
    readonly,
    autoComplete,
    className,
    ...rest
  } = props;
  const autoCompleteType =
    rest.type === "password" ? "new-password" : autoComplete;
  return (
    <div className={"form-control " + className}>
      <Field id={name} name={name} validate={handleChange}>
        {({ field, form }: FieldProps) => {
          const { value: fieldValue, ...restOfField } = field;
          return (
            <>
              {autoCompleteType === "new-password" ? (
                <TextField
                  {...restOfField}
                  defaultValue={fieldValue}
                  size="small"
                  label={label}
                  variant="outlined"
                  error={Boolean(form.errors[name] && form.touched[name])}
                  autoComplete={autoCompleteType}
                  {...rest}
                  disabled={readonly}
                />
              ) : (
                <TextField
                  {...field}
                  size="small"
                  label={label}
                  variant="outlined"
                  error={Boolean(form.errors[name] && form.touched[name])}
                  autoComplete={autoCompleteType}
                  {...rest}
                  disabled={readonly}
                />
              )}
              <ErrorMessage component={TextError} name={name} />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
