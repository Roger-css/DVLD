import { useEffect, useState } from "react";
import { BasicApplicationInfo } from "../../../Types/Applications";
import usePrivate from "../../../hooks/usePrivate";
import { Button, IconButton, Snackbar, Typography } from "@mui/material";
import ApplicationInfo from "../Application/ApplicationInfo";
import Textarea from "@mui/joy/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { getCurrentUserInfo } from "../../../redux/Slices/Auth";

type Props = {
  id: number;
  onClose: () => void;
};
type IssueDrivingLicense = {
  applicationId: number;
  createdByUserId: number;
  notes: string;
};
const IssueDrivingLicense = ({ id, onClose }: Props) => {
  const [applicationDetails, setApplicationDetails] =
    useState<BasicApplicationInfo>({
      applicationId: 0,
      applicationType: "",
      createdBy: "",
      date: "",
      paidFees: 0,
      id: 0,
      licenseClass: "",
      name: "",
      passedTests: 3,
      status: "",
      statusDate: "",
    });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [licenseId, setLicenseId] = useState("0");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const currentUserId = useSelector(getCurrentUserInfo)?.id;
  const axios = usePrivate();
  const handleSubmit = async () => {
    try {
      const body: IssueDrivingLicense = {
        applicationId: applicationDetails.applicationId,
        createdByUserId: currentUserId as number,
        notes: notes.trim(),
      };
      const data = await axios.post("License/IssueLicense", body);
      setLicenseId(data.data);
      setOpenSnackBar(true);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenSnackBar(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`Tests/Appointments/${4}/${id}`);
        setApplicationDetails({
          ...data.data,
          passedTests: 3,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axios, id]);
  return (
    <main className="ModalBox">
      <Typography sx={{ my: "10px", textAlign: "center" }} variant="h5">
        Issue Driving License (first time)
      </Typography>
      <ApplicationInfo Details={applicationDetails} />
      <div className="px-4 my-2">
        <Textarea
          color="neutral"
          // disabled={readonly}
          minRows={2}
          placeholder="Notes"
          size="md"
          variant="outlined"
          maxRows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="flex justify-end p-4">
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
        {!submitted && (
          <Button
            sx={{ ml: "24px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        )}
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
        message={`License Issued Successfully License ID = ${licenseId}`}
        action={action}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      />
    </main>
  );
};

export default IssueDrivingLicense;
