import { Paper, Button } from "@mui/material";
import { Formik, Form, FormikValues, FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import isObjectEmpty from "../../../Utils/IsObjEmpty";
import FormikControl from "../../formik/FormikControl";
import { localDrivingLA } from "../../../Types/Applications";
import usePrivate from "../../../hooks/usePrivate";
import { useSelector } from "react-redux";
import { getLicenseClasses } from "../../../redux/Slices/License";
import { getCurrentUserInfo } from "../../../redux/Slices/Auth";
import dayjs from "dayjs";
import { AxiosError } from "axios";

type Props = {
  handleClose: () => void;
  readonly?: boolean;
  personId?: number;
  dataSet?: localDrivingLA;
};
const ValidationSchema = yup.object({
  id: yup.number(),
  classId: yup.number().required("class is required"),
  date: yup.date().required("date is required"),
  fees: yup.string().required("confirmPassword is required"),
  creatorId: yup.number(),
});
const Ldla = ({ readonly, personId, handleClose, dataSet }: Props) => {
  const currentUser = useSelector(getCurrentUserInfo);
  const [initialValues, setInitialValues] = useState<localDrivingLA>({
    id: 0,
    classId: 1,
    date: dayjs(new Date()),
    fees: 0,
    creatorId: currentUser?.id as number,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const classes = useSelector(getLicenseClasses);
  const axios = usePrivate();
  const handleChange = async (
    e: FormikValues,
    formik: FormikProps<localDrivingLA>
  ) => {
    try {
      if (submitted || readonly) {
        handleClose();
        return;
      }
      const body = {
        ...e,
        PersonId: personId,
        date: e.date.toDate().toLocaleDateString(),
        fees: 15,
      };
      if (initialValues.id == 0) {
        const data = await axios.post(`Applications/LDLA`, body);
        setInitialValues({ ...(e as localDrivingLA), id: data?.data });
      } else {
        const body = {
          id: initialValues.id,
          classId: e.classId,
        };
        const data = await axios.put(`Applications/LDLA`, body);
        setInitialValues({ ...(e as localDrivingLA), id: data?.data });
      }
      setSubmitted(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status == 404) {
        formik.setFieldError(
          "classId",
          "This person already has application with this class type"
        );
      }
    }
  };
  useEffect(() => {
    if (dataSet) {
      const newData: localDrivingLA = {
        ...dataSet,
        date: dayjs(dataSet?.date),
      };
      dataSet ? setInitialValues(newData) : false;
    }
  }, [dataSet]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={() => {}}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <Paper variant="elevation" elevation={3} className="p-5 m-2 ">
              <div className="mb-5 ml-2 text-base">
                <span className="inline-block mr-3">ID:</span>
                {formik.values.id ?? "??"}
              </div>
              <div className="mb-5 ml-2 text-base">
                <span className="inline-block mr-3">Application Date:</span>
                {formik.values.date?.toDate().toLocaleDateString()}
              </div>
              <FormikControl
                className="mt-2 w-80 LoginUserInfoControl"
                control="select"
                label="Class"
                name="classId"
                readonly={readonly}
                options={classes?.map((e) => ({
                  text: e.className,
                  value: e.id,
                }))}
              />
              <div className="mb-5 ml-2 text-base">
                <span className="inline-block mr-3">Fees:</span> 15
              </div>
              <div className="mb-5 ml-2 text-base">
                <span className="inline-block mr-3"> Created by UserId:</span>{" "}
                {formik.values.creatorId}
              </div>
              <div className="flex justify-end">
                <Button
                  color={
                    formik.values.id > 0
                      ? "success"
                      : isObjectEmpty(formik.errors)
                      ? "success"
                      : "error"
                  }
                  size="large"
                  variant="contained"
                  type="button"
                  onClick={() => handleChange(formik.values, formik)}
                >
                  {(formik.values.id > 0 && readonly) || submitted
                    ? "Close"
                    : "Submit"}
                </Button>
              </div>
            </Paper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Ldla;
