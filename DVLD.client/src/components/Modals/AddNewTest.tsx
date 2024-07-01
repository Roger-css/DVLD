import { Button, TextField } from "@mui/material";
import { BasicApplicationInfo } from "../../Types/Applications";
import { useState } from "react";
import usePrivate from "../../hooks/usePrivate";
import { useSelector } from "react-redux";
import { appointmentClass } from "../../Types/Test";
import { getCurrentUserInfo } from "../../redux/Slices/Auth";
import { getApplicationTypes } from "../../redux/Slices/Applications";
import { getTestTypes } from "../../redux/Slices/Tests";
import TextError from "../formik/TextError";
type Props = {
  details: BasicApplicationInfo;
  onClose: () => void;
  trails: number;
  testTypeId: number;
  testDetails?: TestDetails;
};
type TestDetails = { id: number; date: Date; isLocked: boolean };
function getTodaysDate(date?: Date) {
  const today = date ? date : new Date();
  return `${today.getFullYear()}-${
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
  }-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;
}
const AddNewTest = ({
  details,
  onClose,
  trails,
  testTypeId,
  testDetails,
}: Props) => {
  const { id, licenseClass, name } = details;
  const [date, setDate] = useState<string>(getTodaysDate(testDetails?.date));
  const axios = usePrivate();
  const currentUser = useSelector(getCurrentUserInfo);
  const applicationTypes = useSelector(getApplicationTypes);
  const testTypes = useSelector(getTestTypes);
  const retakeTestFees =
    trails > 0
      ? applicationTypes?.find((e) => e.applicationTypeId == 7)
          ?.applicationTypeFees
      : 0;
  const testFees = testTypes?.find((e) => e.id == testTypeId)?.testTypeFees;
  const handleSubmit = async () => {
    if (testDetails?.isLocked) {
      onClose();
      return;
    }
    try {
      if (testDetails) {
        const body = {
          id: testDetails.id,
          appointmentDate: date,
        };
        await axios.put("Tests/Appointments", body);
      } else {
        const body: appointmentClass = {
          AppointmentDate: date,
          CreatedByUserId: currentUser?.id as number,
          IsLocked: false,
          LocalDrivingLicenseApplicationId: id,
          PaidFees: (testFees as number) + (retakeTestFees as number),
          TestTypeId: testTypeId,
        };
        await axios.post("Tests/Appointments", body);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };
  return (
    <main className="ModalBox-small">
      <h3 className="text-2xl text-center">Schedule Test</h3>
      {testDetails?.isLocked && (
        <TextError className="text-lg text-center">
          You Can't Edit This Test
        </TextError>
      )}
      <section className="px-5 py-3">
        <div>
          <span className="inline-block mr-2 text-lg">L.D.L ID: </span> {id}
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">D. Class: </span>
          {licenseClass.split(" - ")[1]}
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">Name: </span>
          {name}
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">Trials: </span>
          {trails}
        </div>
        <div>
          <TextField
            type="date"
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">Fees: </span>
          {testFees}
        </div>
      </section>
      <section>
        <fieldset
          className={
            "p-4 pr-24 mb-3 testFieldset" + (trails > 0 ? "" : " disabled")
          }
        >
          <legend className="text-lg">Retake Test Info</legend>
          <div className="flex justify-between">
            <div>
              <span className="inline-block mr-2 text-lg">R.App Fees: </span>
              {trails > 0 ? retakeTestFees : "0"}
            </div>
            <div>
              <span className="inline-block mr-2 text-lg">Total Fees</span>
              {(testFees as number) + (retakeTestFees as number)}
            </div>
          </div>
          <div>
            <span className="inline-block mr-2 text-lg">R.Test.App ID: </span>
            N/A
          </div>
        </fieldset>
      </section>
      <div className="flex justify-end pr-10">
        <Button size="medium" variant="contained" onClick={handleSubmit}>
          {testDetails?.isLocked ? "Close" : "Save"}
        </Button>
      </div>
    </main>
  );
};

export default AddNewTest;
