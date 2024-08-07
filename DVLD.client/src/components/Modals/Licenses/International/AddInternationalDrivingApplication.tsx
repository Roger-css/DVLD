import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import LocalLicenseInfo from "../LocalLicenseInfo";
import InternationalLicenseInfo from "./InternationalLicenseInfo";
import {
  useAddInternationalLicenseApplication,
  useGetApplicationIdFromLicenseId,
} from "../License.hooks";
import TextError from "../../../formik/TextError";
import CloseIcon from "@mui/icons-material/Close";
import { useClickEnterToSearch } from "../../../../hooks/useClickEnterToSearch";

type Props = {
  handleClose: () => void;
};
const AddInternationalDrivingApplication = ({ handleClose }: Props) => {
  // * this is just a placeholder the value will be passed to the LocalLicenseInfo only when the search is clicked therefor we needed 2 states
  const [searchValue, setSearchValue] = useState<number>(0);
  const [licenseId, setLicenseId] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickEnterToSearch({ buttonRef, inputRef });
  const [addInternationalLicense, { LicenseInfo, error, resetError }] =
    useAddInternationalLicenseApplication();

  const applicationId = useGetApplicationIdFromLicenseId(licenseId);

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
        International License Application
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
        <InternationalLicenseInfo
          internationalLicenseInfo={LicenseInfo}
          localLicenseId={licenseId}
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
          onClick={() => addInternationalLicense(licenseId as number)}
          disabled={licenseId == null || licenseId <= 0}
        >
          Issue
        </Button>
      </footer>
    </main>
  );
};

export default AddInternationalDrivingApplication;
