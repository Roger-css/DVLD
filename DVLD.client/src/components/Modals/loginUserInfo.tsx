import { Button, Paper, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import FormikControl from "../formik/FormikControl";
import { LoginInfo } from "../../Types/User";
import isObjectEmpty from "../../Helpers/IsObjEmpty";
import useDebounce from "../../hooks/useDebounce";
import usePrivate from "../../hooks/usePrivate";
import TextError from "../formik/TextError";
type TyDetails = LoginInfo & { isActive: string };
type TyProps = {
  details: TyDetails | null;
  handleChange: (p: TyDetails) => void;
  update?: boolean;
  readOnly?: boolean;
};
type TyInitialValues = LoginInfo & {
  confirmPassword: string;
  isActive: string;
};
const ValidationSchema = yup.object({
  userName: yup.string().required("userName is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password should at least be at least be 6 characters"),
  confirmPassword: yup
    .string()
    .required("confirmPassword is required")
    .oneOf([yup.ref("password"), ""], "passwords must match"),
});
const LoginUserInfo = ({
  details,
  handleChange,
  update,
  readOnly,
}: TyProps) => {
  const [initialValues, setInitialValues] = useState<TyInitialValues>({
    id: null,
    userName: "",
    password: "",
    confirmPassword: "",
    isActive: "0",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [exist, setExist] = useState(false);
  const [touched, setTouched] = useState(false);
  const debounced = useDebounce(currentPassword);
  const axios = usePrivate();
  const checkCurrentPassword = () => {
    if (update) {
      return !exist && currentPassword !== "" ? true : false;
    }
    return true;
  };
  useEffect(() => {
    if (details) {
      if (readOnly)
        setInitialValues({
          ...details,
          confirmPassword: details.password,
          isActive: details.isActive,
        });
      else
        setInitialValues({
          ...details,
          password: "",
          confirmPassword: "",
          isActive: details.isActive,
        });
    } else {
      setInitialValues({
        id: null,
        userName: "",
        password: "",
        confirmPassword: "",
        isActive: "0",
      });
    }
  }, [details, readOnly, update]);
  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const data = await axios.get(
          `User/Password?password=${debounced}&id=${initialValues.id}`
        );
        if (data) {
          setExist(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        setExist(true);
      }
    };
    debounced !== "" && fetchPassword();
  }, [axios, debounced, initialValues.id]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(e) => handleChange(e)}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <Paper variant="elevation" elevation={3} className="p-5 m-2 ">
              <div className="mb-5 ml-5 text-xl uppercase">
                User Id: {formik.values.id ?? "??"}
              </div>
              <FormikControl
                className="w-80 LoginUserInfoControl"
                control="input"
                label="User Name"
                name="userName"
                autoComplete="off"
                readonly={readOnly}
              />
              {update && (
                <>
                  <TextField
                    className="w-80"
                    label="Current Password"
                    size="small"
                    value={currentPassword}
                    type="password"
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setTouched(true);
                    }}
                    error={exist}
                  />
                  {exist && touched && <TextError>Wrong password</TextError>}
                </>
              )}
              <FormikControl
                className="w-80 LoginUserInfoControl"
                control="input"
                label="Password"
                name="password"
                type="password"
                autoComplete="off"
                readonly={readOnly}
              />
              <FormikControl
                className="w-80 LoginUserInfoControl"
                control="input"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                readonly={readOnly}
              />
              <FormikControl
                className="w-80 LoginUserInfoControl"
                label="Is Active"
                name="isActive"
                autoComplete="off"
                control="radio"
                options={[
                  { text: "Active", value: 1 },
                  { text: "Not Active", value: 0 },
                ]}
                readonly={readOnly}
              />
              <div className="flex justify-end">
                {!readOnly && (
                  <Button
                    color={
                      isObjectEmpty(formik.errors) && checkCurrentPassword()
                        ? "success"
                        : "error"
                    }
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Paper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginUserInfo;
