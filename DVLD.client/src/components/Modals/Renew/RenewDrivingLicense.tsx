import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import LocalLicenseInfo from "../Licenses/LocalLicenseInfo";

import { useGetApplicationIdFromLicenseId } from "../Licenses/License.hooks";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  handleClose: () => void;
};
const AddInternationalDrivingApplication = ({ handleClose }: Props) => {
  // * this is just a placeholder the value will be passed to the LocalLicenseInfo only when the search is clicked therefor we needed 2 states
  const [searchValue, setSearchValue] = useState<number>(0);
  const [licenseId, setLicenseId] = useState<number>();
  const idInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onEnterEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        buttonRef.current?.click();
      }
    };
    const ref = idInputRef.current;
    ref?.addEventListener("keypress", onEnterEvent);
    return () => {
      ref?.removeEventListener("keypress", onEnterEvent);
    };
  }, []);
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
        Renew License Application
      </h3>
      <section>
        <div className="flex justify-between px-40 mt-5 ">
          <label className="flex items-center font-semibold capitalize">
            <span className="inline-block mr-5">License ID:</span>
            <TextField
              ref={idInputRef}
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
            }}
          >
            Search
          </Button>
        </div>
      </section>
      {/* <TextError className="my-1 font-bold text-center">{error}</TextError> */}
      <section>
        <LocalLicenseInfo applicationId={applicationId} noTitle />
      </section>
      <section></section>
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
          // onClick={() => null}
          disabled={licenseId == null || licenseId <= 0}
        >
          Issue
        </Button>
      </footer>
    </main>
  );
};

export default AddInternationalDrivingApplication;
