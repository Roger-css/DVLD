import { Avatar, Button, Paper, SxProps, TextField } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FormikControl from "../../formik/FormikControl";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import usePrivate from "../../../hooks/usePrivate";
import { getAllCountries } from "../../../redux/Slices/Countries";
import useDebounce from "../../../hooks/useDebounce";
import TextError from "../../formik/TextError";
import isObjectEmpty from "../../../Utils/IsObjEmpty";
import ConvertBinaryToImage from "../../../Utils/ConvertBinaryToImage";
import { personInfo } from "../../../Types/Person";

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
  personId?: number | null;
  readOnly?: boolean;
  handleClose?: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
  title: string;
  details?: personInfo | null;
  sx?: SxProps;
  children?: ReactNode;
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

const PersonDetails = ({
  personId,
  readOnly,
  handleClose,
  modal = true,
  title,
  details,
  sx,
  children,
}: TyProps) => {
  const Countries = useSelector(getAllCountries);
  const [personalImage, setPersonalImage] = useState<File | null>(null);
  const [imageReview, setImageReview] = useState("");
  const [nationalNo, setNationalNo] = useState("");
  const [updateNo, setUpdateNo] = useState("");
  const [exists, setExists] = useState(false);
  const [touched, setTouched] = useState(false);
  const debounced = useDebounce(nationalNo, 100);
  const axios = usePrivate();
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
  const refactor = () => {
    setInitialValues({
      id: null,
      firstName: "",
      lastName: "",
      address: "",
      country: 83,
      dateOfBirth: null,
      gender: 1,
      phone: "",
      secondName: "",
      thirdName: "",
      email: "",
    });
    setNationalNo("");
    setUpdateNo("");
    setImageReview("");
    setTouched(false);
    setExists(false);
  };
  const setFormikInitialValues = (data: personInfo, withImage = false) => {
    setInitialValues({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      country: data.nationalityCountryId,
      dateOfBirth: dayjs(data.birthDate),
      gender: data.gender,
      phone: data.phone,
      secondName: data.secondName,
      thirdName: data.thirdName,
      email: data.email ?? "",
    });
    setNationalNo(data.nationalNo);
    setUpdateNo(data.nationalNo);
    if (withImage && data.image) {
      const url = ConvertBinaryToImage(data.image);
      setImageReview(url);
      return url;
    }
    setImageReview("");
    return "";
  };
  const onSubmitting = async (values: FormikValues) => {
    const Data: { [key: string]: unknown } = {
      ...values,
      image: personalImage,
      dateOfBirth: values.dateOfBirth.toLocaleString(),
    };
    console.log(values.dateOfBirth);

    const formData = new FormData();
    for (const key in Data) {
      formData.append(key, Data[key] as string);
    }
    formData.append("nationalNo", nationalNo);
    try {
      if (personId !== null) {
        await axios.put("Person/Update", formData);
      } else {
        formData.delete("id");
        await axios.post("Person/Add", formData);
      }
    } catch (error) {
      console.log(error);
    }
    if (handleClose != undefined) handleClose(false);
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
    return () => {
      URL.revokeObjectURL(Urls);
    };
  }, [personalImage]);

  useEffect(() => {
    const validateNationalNo = async () => {
      if (debounced === "") return;
      try {
        const response = await axios.get(`/Person/nationalNo/${debounced}`);
        if (response.status == 200) setExists(true);
      } catch {
        setExists(false);
      }
    };
    updateNo !== debounced ? validateNationalNo() : setExists(false);
  }, [debounced, updateNo, axios]);

  useEffect(() => {
    let url = "";
    const FetchData = async () => {
      try {
        const body = {
          SearchTermKey: "Id",
          SearchTermValue: personId?.toString(),
        };
        const { data } = await axios.post(`/Person/Get`, body);
        setFormikInitialValues(data);
        if (data.image) url = ConvertBinaryToImage(data.image);
        setImageReview(url);
      } catch (error) {
        console.log(error);
      }
    };
    personId ? FetchData() : false;
    if (details) {
      url = setFormikInitialValues(details, true);
    }
    if (!details && !personId) {
      refactor();
    }
    return () => {
      if (url !== "") return URL.revokeObjectURL(url);
    };
  }, [details, personId, axios]);

  return (
    <main className={modal ? "ModalBox" : ""}>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmitting}
        validateOnChange={personId ? false : true}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Paper
                sx={sx}
                variant="outlined"
                elevation={0}
                className="px-5 pb-5"
              >
                <h1 className="text-2xl text-center">{title}</h1>
                <div className="text-xl uppercase pl-14">
                  id: {formik.values.id || "??"}
                </div>
                <div className="flex justify-between gap-2 mt-5">
                  <FormikControl
                    control="input"
                    name="firstName"
                    label="firstName"
                    readonly={readOnly}
                  />
                  <FormikControl
                    control="input"
                    name="secondName"
                    label="secondName"
                    readonly={readOnly}
                  />
                  <FormikControl
                    control="input"
                    name="thirdName"
                    label="thirdName"
                    readonly={readOnly}
                  />
                  <FormikControl
                    control="input"
                    name="lastName"
                    label="lastName"
                    readonly={readOnly}
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
                          error={touched && (exists || nationalNo === "")}
                          onBlur={() => setTouched(true)}
                          onChange={(e) => {
                            setExists(false);
                            setTouched(true);
                            setNationalNo(e.currentTarget.value);
                          }}
                          disabled={readOnly}
                        />
                        {touched && exists && (
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
                        readonly={readOnly}
                      />
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <FormikControl
                        control="radio"
                        label="gender"
                        name="gender"
                        options={gender}
                        readonly={readOnly}
                      />
                      <FormikControl
                        control="input"
                        label="phone"
                        name="phone"
                        readonly={readOnly}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <FormikControl
                        control="input"
                        label="Email"
                        name="email"
                        sx={{ width: "250px" }}
                        readonly={readOnly}
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
                        readonly={readOnly}
                      />
                    </div>
                    <FormikControl
                      control="textarea"
                      className="mt-4"
                      label="Address"
                      name="address"
                      readonly={readOnly}
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
                      disabled={readOnly}
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
                    {!readOnly && (
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
                    )}
                    {children}
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
