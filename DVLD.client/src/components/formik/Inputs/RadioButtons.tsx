import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ErrorMessage, Field, FieldProps } from "formik";
import TextError from "../TextError";

type TyOption = { value: string | number; text: string };
type TyProps = {
  label: string;
  name: string;
  options: TyOption[];
  flex?: boolean;
};
function FirstWord(value: string): string {
  return value.split(" ")[0];
}

const RadioButtons = (props: TyProps) => {
  const { label, name, options, flex = true, ...rest } = props;
  return (
    <div className="form-control">
      <Field name={name}>
        {({ field }: FieldProps) => {
          return (
            <>
              <FormControl>
                <FormLabel id={`select-${FirstWord(label)}`}>gender</FormLabel>
                <RadioGroup
                  row={flex}
                  aria-labelledby={`select-${FirstWord(label)}`}
                  defaultValue={options[0].value}
                  {...rest}
                  {...field}
                >
                  {options.map((option) => {
                    return (
                      <FormControlLabel
                        label={option.text}
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <ErrorMessage name={name} component={TextError} />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default RadioButtons;
