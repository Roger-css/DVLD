import { useEffect, useState } from "react";
import * as yup from "yup";
import { applicationTypes } from "../../Types/Applications";
import { Paper, Button, Typography } from "@mui/material";
import { Formik, Form, FormikValues } from "formik";
import isObjectEmpty from "../../Utils/IsObjEmpty";
import FormikControl from "../formik/FormikControl";
import usePrivate from "../../hooks/usePrivate";

type TyProps = {
  initialValues: applicationTypes | null;
  handleClose: () => void;
};
const ValidationSchema = yup.object({
  applicationTypeTitle: yup.string().required("Title is required"),
  applicationTypeFees: yup.number().required("Fees is required"),
});
const ApplicationTypeDetails = ({ initialValues, handleClose }: TyProps) => {
  const axios = usePrivate();
  const [formikInitialValues, setInitialValues] = useState<applicationTypes>({
    applicationTypeId: 0,
    applicationTypeTitle: "",
    applicationTypeFees: 0,
  });
  useEffect(() => {
    if (initialValues) setInitialValues(initialValues);
  }, [initialValues]);
  const handleSubmit = async (e: FormikValues) => {
    try {
      const body = {
        ...e,
        applicationTypeFees: +e.applicationTypeFees,
      };
      const sendingData = await axios.put("Applications/types/Update", body);
      console.log(sendingData);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <div className="ModalBox-small">
      <Formik
        initialValues={formikInitialValues}
        validationSchema={ValidationSchema}
        onSubmit={(e) => handleSubmit(e)}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Paper variant="elevation" elevation={3} className="p-5 m-2 ">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  py="20px"
                >
                  Update Application Type
                </Typography>
                <div className="mb-5 ml-3 text-xl uppercase">
                  ID: {formik.values.applicationTypeId}
                </div>
                <FormikControl
                  className="w-80 LoginUserInfoControl"
                  control="input"
                  label="Title"
                  name="applicationTypeTitle"
                  size="large"
                />
                <FormikControl
                  className="w-80 LoginUserInfoControl"
                  control="input"
                  label="Fees"
                  name="applicationTypeFees"
                  size="large"
                />
                <div className="flex justify-end">
                  <Button
                    color={isObjectEmpty(formik.errors) ? "success" : "error"}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Paper>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ApplicationTypeDetails;
