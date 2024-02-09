import { Avatar, Button, Paper, TextField } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FormikControl from "./formik/FormikControl";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import axios from "../Api/Axios";
import { getAllCountries } from "../redux/Slices/Countries";
import { AxiosError } from "axios";
import useDebounce from "../hooks/useDebounce";
import TextError from "./formik/TextError";
import isObjectEmpty from "../Helpers/IsObjEmpty";

type TyInitialValues = {
  id: number | null;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  gender: number;
  dateOfBirth: Dayjs | null;
  phone: string;
  email?: string;
  country: number | undefined;
  address: string;
};
type TyProps = {
  userId: number | null;
};
type TyOption = { value: string | number; text: string };

const ValidationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  secondName: yup.string().required("Second Name is required"),
  thirdName: yup.string().required("Third Name is required"),
  lastName: yup.string().required("Last Name is required"),
  gender: yup.string(),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Wrong email format"),
  country: yup.string().required("Country is required"),
  address: yup.string().required("Address is required"),
});

const gender: TyOption[] = [
  { text: "Male", value: 1 },
  { text: "Female", value: 2 },
  { text: "Other", value: 3 },
];
const PersonDetails = ({ userId }: TyProps) => {
  const Countries = useSelector(getAllCountries);
  const [personalImage, setPersonalImage] = useState<File | null>();
  const [imageReview, setImageReview] = useState("");
  const [nationalNo, setNationalNo] = useState("");
  const [exists, setExists] = useState(false);
  const [touched, setTouched] = useState(false);
  const debounced = useDebounce(nationalNo);
  const [initialValues, setInitialValues] = useState<TyInitialValues>({
    id: 0,
    firstName: "",
    secondName: "",
    thirdName: "",
    lastName: "",
    dateOfBirth: null,
    gender: 1,
    address: "",
    phone: "",
    email: "",
    country: 83,
  });
  const isNationalNoValid = () => {
    return !(nationalNo === "") && !exists;
  };
  const onSubmitting = async (values: FormikValues) => {
    const Data: { [key: string]: unknown } = {
      ...values,
      image: personalImage,
      dateOfBirth: values.dateOfBirth.toLocaleString(),
    };
    const formData = new FormData();
    for (const key in Data) {
      formData.append(key, Data[key] as string);
    }
    formData.append("nationalNo", nationalNo);
    try {
      const data = await axios.post("Person", formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.currentTarget.files;
    if (file == null) return;
    setPersonalImage(file[0]);
  };

  useEffect(() => {
    if (personalImage == null) return;
    const Urls = URL.createObjectURL(personalImage);
    setImageReview(Urls);
    console.log(Urls);

    return () => {
      URL.revokeObjectURL(Urls);
    };
  }, [personalImage]);

  useEffect(() => {
    const validateNationalNo = async () => {
      if (debounced === "") return;
      try {
        await axios.get(`/Person/${debounced}`);
      } catch (error) {
        const myError = error as AxiosError;
        if (myError.response?.status === 404) {
          setExists(true);
        }
      }
    };
    validateNationalNo();
  }, [debounced]);

  return (
    <main className="ModalBox">
      <h1 className="text-2xl text-center">Add new person</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmitting}
      >
        {(formik) => {
          return (
            <Form>
              <div className="text-xl uppercase pl-14">
                id: {formik.values.id || "??"}
              </div>
              <Paper className="px-5 pb-5">
                <div className="flex justify-between mt-5">
                  <FormikControl
                    control="input"
                    name="firstName"
                    label="firstName"
                  />
                  <FormikControl
                    control="input"
                    name="secondName"
                    label="secondName"
                  />
                  <FormikControl
                    control="input"
                    name="thirdName"
                    label="thirdName"
                  />
                  <FormikControl
                    control="input"
                    name="lastName"
                    label="lastName"
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="form-control">
                        <TextField
                          size="small"
                          label={"National Number"}
                          variant="outlined"
                          sx={{ width: "320px" }}
                          value={nationalNo}
                          error={exists || (touched && nationalNo === "")}
                          onBlur={() => setTouched(true)}
                          onChange={(e) => {
                            setExists(false);
                            if (e.target.value !== "") {
                              setTouched(false);
                            }
                            setNationalNo(e.currentTarget.value);
                          }}
                        />
                        {exists && (
                          <TextError>National Number Already in use</TextError>
                        )}
                        {touched && nationalNo === "" && (
                          <TextError>National Number is required</TextError>
                        )}
                      </div>
                      <FormikControl
                        control="date"
                        name="dateOfBirth"
                        label="Date of Birth"
                      />
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <FormikControl
                        control="radio"
                        label="gender"
                        name="gender"
                        options={gender}
                      />
                      <FormikControl
                        control="input"
                        label="phone"
                        name="phone"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <FormikControl
                        control="input"
                        label="Email"
                        name="email"
                        sx={{ width: "250px" }}
                      />
                      <FormikControl
                        control="select"
                        label="Country"
                        name="country"
                        options={Countries?.map((country) => ({
                          value: country.id.toString(),
                          text: country.countryName,
                        }))}
                        sx={{ width: "320px" }}
                      />
                    </div>
                    <FormikControl
                      control="textarea"
                      label="Address"
                      name="address"
                      className="mt-4"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start px-10 form-Component picture-container">
                    <Avatar
                      src={imageReview}
                      sx={{
                        width: 125,
                        height: 125,
                        ml: "20px",
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{ ml: "20px", mt: "10px", width: "80px" }}
                    >
                      <div className="flex w-full h-full cursor-pointer">
                        <input
                          id="personalImage"
                          type="file"
                          className="w-0 opacity-0"
                          onChange={(event) => uploadImage(event)}
                        />
                        <label
                          htmlFor="personalImage"
                          className="grid w-full h-full place-items-center"
                        >
                          <AddAPhotoIcon
                            sx={{
                              width: 30,
                              height: 30,
                              transform: "translateX(-10%)",
                            }}
                            className="w-full h-full"
                          />
                        </label>
                      </div>
                    </Button>
                    <Button
                      color={
                        isObjectEmpty(formik.errors) && isNationalNoValid()
                          ? "success"
                          : "error"
                      }
                      size="large"
                      sx={{ ml: "20px", mt: "90px" }}
                      variant="contained"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Paper>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
};

export default PersonDetails;
