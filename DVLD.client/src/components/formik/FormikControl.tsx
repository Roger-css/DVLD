import { SxProps } from "@mui/material";
import DatePicker from "./Inputs/DatePicker";
import Input from "./Inputs/Input";
import RadioButtons from "./Inputs/RadioButtons";
import Select from "./Inputs/Select";
import Textarea from "./Inputs/TextArea";
type TyOption = { value: string | number; text: string };

type TyProps = {
  control: "input" | "radio" | "textarea" | "select" | "date" | "checkbox";
  label: string;
  name: string;
  options?: TyOption[];
  flex?: boolean;
  sx?: SxProps;
  size?: "medium" | "large";
  className?: string;
  handleChange?: (event: string) => void;
  type?: "text" | "password" | "number" | "email";
  readonly?: boolean;
  autoComplete?: string;
};

const FormikControl = (props: TyProps) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select options={rest.options || []} {...rest} />;
    case "radio":
      return <RadioButtons options={rest.options || []} {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
