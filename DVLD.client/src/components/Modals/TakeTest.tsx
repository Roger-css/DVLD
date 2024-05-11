import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { BasicApplicationInfo } from "../../Types/Applications";
import { useState } from "react";
import usePrivate from "../../hooks/usePrivate";
import { useSelector } from "react-redux";
import { test, testAppointment } from "../../Types/Test";
import { getCurrentUserInfo } from "../../redux/Slices/Auth";
import TextError from "../formik/TextError";
import Textarea from "@mui/joy/Textarea";
import { getTestTypes } from "../../redux/Slices/Tests";
type Props = {
  details: BasicApplicationInfo;
  appointment: testAppointment;
  onClose: () => void;
  trails: number;
  testTypeId: number;
  setHasPassed: () => void;
};
const TakeTest = ({
  details,
  onClose,
  trails,
  appointment,
  testTypeId,
  setHasPassed,
}: Props) => {
  const { id, licenseClass, name, date } = details;
  const [testResult, setTestResult] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [testId, setTestId] = useState("Not taken yet");
  const axios = usePrivate();
  const currentUser = useSelector(getCurrentUserInfo);
  const testTypes = useSelector(getTestTypes);
  const testFees = testTypes?.find((e) => e.id == testTypeId)?.testTypeFees;
  const handleSubmit = async () => {
    if (appointment.isLocked) {
      onClose();
      return;
    }
    try {
      const body: test = {
        testAppointmentId: appointment.id,
        createdByUserId: currentUser?.id as number,
        testResult,
        notes: notes.trim(),
      };
      const data = await axios.post("Tests", body);
      setTestId(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      if (testResult == 1) {
        setHasPassed();
      }
      onClose();
    }
  };
  return (
    <main className="ModalBox-small">
      <h3 className="text-2xl text-center">Scheduled Test</h3>
      {appointment.isLocked ? (
        <TextError className="text-lg text-center">Test is Locked</TextError>
      ) : null}

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
          <span className="inline-block mr-2 text-lg">Date: </span>
          {date.substring(0, 10)}
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">Fees: </span>
          {testFees as number}
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">Test ID </span>
          {testId}
        </div>
      </section>
      <hr />
      <section className="m-3">
        <FormControl>
          <FormLabel>Test Result</FormLabel>
          <RadioGroup
            row
            onChange={(e) => setTestResult(+e.target.value)}
            value={testResult}
          >
            <FormControlLabel value="0" control={<Radio />} label="Fail" />
            <FormControlLabel value="1" control={<Radio />} label="Pass" />
          </RadioGroup>
        </FormControl>
        <Textarea
          color="neutral"
          // disabled={readonly}
          minRows={2}
          placeholder="Notes"
          size="md"
          variant="outlined"
          maxRows={7}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </section>
      <div className="flex justify-end pr-10 mb-3">
        <Button size="medium" variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </main>
  );
};

export default TakeTest;
