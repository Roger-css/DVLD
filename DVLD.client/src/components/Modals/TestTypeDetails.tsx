import { useEffect, useState } from "react";
import * as yup from "yup";
import { Paper, Button, Typography } from "@mui/material";
import { Formik, Form, FormikValues } from "formik";
import isObjectEmpty from "../../Helpers/IsObjEmpty";
import FormikControl from "../formik/FormikControl";
import usePrivate from "../../hooks/usePrivate";
import { testType } from "../../Types/Test";

type TyProps = {
  initialValues: testType | null;
  handleClose: () => void;
};
const ValidationSchema = yup.object({
  testTypeTitle: yup.string().required("Title is required"),
  testTypeDescription: yup.string().required("Description is required"),
  testTypeFees: yup.number().required("Fees is required"),
});
const TestTypeDetails = ({ initialValues, handleClose }: TyProps) => {
  const axios = usePrivate();
  const [formikInitialValues, setInitialValues] = useState<testType>({
    id: 0,
    testTypeTitle: "",
    testTypeDescription: "",
    testTypeFees: 0,
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
      const sendingData = await axios.put("Tests/types", body);
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
                  Update Test Type
                </Typography>
                <div className="mb-5 ml-3 text-xl uppercase">
                  ID: {formik.values.id}
                </div>
                <FormikControl
                  className="w-80 LoginUserInfoControl"
                  control="input"
                  label="Title"
                  name="testTypeTitle"
                  size="large"
                />
                <FormikControl
                  className="w-80 LoginUserInfoControl"
                  control="textarea"
                  label="Description"
                  name="testTypeDescription"
                  size="large"
                />
                <FormikControl
                  className="w-80 LoginUserInfoControl"
                  control="input"
                  label="Fees"
                  name="testTypeFees"
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

export default TestTypeDetails;
