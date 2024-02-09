import { SxProps } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { ErrorMessage, FastField, FieldProps } from "formik";
import TextError from "../TextError";
type TyProps = {
  label: string;
  name: string;
  className?: string;
  sx?: SxProps;
};

const MyTextarea = (props: TyProps) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control max-h-44">
      <FastField id={name} name={name}>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <Textarea
                {...field}
                {...rest}
                color="neutral"
                disabled={false}
                minRows={2}
                placeholder={label}
                error={Boolean(form.errors[name] && form.touched[name])}
                size="md"
                variant="outlined"
                maxRows={7}
              />
              <ErrorMessage component={TextError} name={name} />
            </>
          );
        }}
      </FastField>
    </div>
  );
};

export default MyTextarea;
