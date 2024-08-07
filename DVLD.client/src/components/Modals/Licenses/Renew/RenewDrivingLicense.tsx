import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import LocalLicenseInfo from "../LocalLicenseInfo";

import {
  useGetApplicationIdFromLicenseId,
  useRenewLicenseApplication,
} from "../License.hooks";
import CloseIcon from "@mui/icons-material/Close";
import RenewLicenseApplicationInfo from "./RenewLicenseApplicationInfo";
import TextError from "../../../formik/TextError";
import { useClickEnterToSearch } from "../../../../hooks/useClickEnterToSearch";

type Props = {
  handleClose: () => void;
};
const RenewDrivingLicense = ({ handleClose }: Props) => {
  // * this is just a placeholder the value will be passed to the LocalLicenseInfo only when the search is clicked therefor we needed 2 states
  const [searchValue, setSearchValue] = useState<number>(0);
  const [licenseId, setLicenseId] = useState<number>();
  const [notes, setNotes] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickEnterToSearch({ buttonRef, inputRef });
  const applicationId = useGetApplicationIdFromLicenseId(licenseId);
  const [renewLicense, { LicenseInfo, error, resetError }] =
    useRenewLicenseApplication();
  return (
    <main className="max-h-[550px] overflow-auto rounded-lg ModalBox">
      <div className="flex flex-row-reverse">
        <Button
          sx={{
            mr: "15px",
            width: "30px",
            height: "30px",
            padding: 0,
            minWidth: 0,
          }}
          variant="contained"
          color="error"
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-center capitalize">
        Renew License Application
      </h3>
      <section>
        <div className="flex justify-between px-40 mt-5 ">
          <label className="flex items-center font-semibold capitalize">
            <span className="inline-block mr-5">License ID:</span>
            <TextField
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => {
                if (!isNaN(+e.target.value)) {
                  setSearchValue(+e.target.value);
                  setLicenseId(0);
                }
              }}
              size="small"
              sx={{ width: "300px" }}
            />
          </label>
          <Button
            ref={buttonRef}
            variant="contained"
            onClick={() => {
              setLicenseId(searchValue);
              resetError();
            }}
          >
            Search
          </Button>
        </div>
      </section>
      <TextError className="my-1 font-bold text-center">{error}</TextError>
      <section>
        <LocalLicenseInfo applicationId={applicationId} noTitle />
      </section>
      <section>
        <RenewLicenseApplicationInfo
          notes={notes}
          setNotes={setNotes}
          oldLicenseId={licenseId}
          newLicense={LicenseInfo ?? {}}
          oldLicenseApplicationId={applicationId}
        />
      </section>
      <footer className="flex justify-end p-4">
        <Button
          color="error"
          variant="contained"
          size="large"
          onClick={handleClose}
        >
          close
        </Button>
        <div className="w-3 h-1"></div>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() =>
            renewLicense({ licenseId: licenseId as number, notes })
          }
          disabled={licenseId == null || licenseId <= 0}
        >
          Issue
        </Button>
      </footer>
    </main>
  );
};

export default RenewDrivingLicense;
