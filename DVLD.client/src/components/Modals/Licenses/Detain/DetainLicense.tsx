type Props = {
  handleClose: () => void;
};

import { TextField, Button } from "@mui/material";
import {
  useAddDetainLicense,
  useGetApplicationIdFromLicenseId,
} from "../License.hooks";
import { useState, useRef } from "react";
import { useClickEnterToSearch } from "../../../../hooks/useClickEnterToSearch";
import LocalLicenseInfo from "../LocalLicenseInfo";
import DetainInfo from "./DetainInfo";
import TextError from "../../../formik/TextError";

const DetainLicense = ({ handleClose }: Props) => {
  // * this is just a placeholder the value will be passed to the LocalLicenseInfo only when the search is clicked therefor we needed 2 states
  const [searchValue, setSearchValue] = useState<number>(0);
  const [licenseId, setLicenseId] = useState<number>();
  const [fees, setFees] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickEnterToSearch({ buttonRef, inputRef });
  const [detain, { detainId, error }] = useAddDetainLicense();
  const applicationId = useGetApplicationIdFromLicenseId(licenseId);
  return (
    <div className="ModalBox max-h-[500px]">
      <div>
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
                // resetError();
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
          <DetainInfo
            fees={fees}
            setFees={setFees}
            detainId={detainId}
            submitted={submitted}
            licenseId={licenseId}
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
            onClick={() => {
              if (fees <= 0) {
                setSubmitted(true);
                return;
              }
              detain({ fees: fees as number, licenseId: licenseId as number });
            }}
            disabled={licenseId == null || licenseId <= 0}
          >
            Detain
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default DetainLicense;
