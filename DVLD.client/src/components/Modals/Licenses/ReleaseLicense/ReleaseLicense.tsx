import { TextField, Button } from "@mui/material";
import {
  useGetApplicationIdFromLicenseId,
  useGetDetainInfo,
  useReleaseLicense,
} from "../License.hooks";
import { useState, useRef, useEffect } from "react";
import { useClickEnterToSearch } from "../../../../hooks/useClickEnterToSearch";
import LocalLicenseInfo from "../LocalLicenseInfo";
import TextError from "../../../formik/TextError";
import ReleaseApplicationInfo from "./ReleaseDetainLicenseApplicationInfo";
type Props = {
  handleClose: () => void;
  license?: number;
};
const ReleaseLicense = ({ handleClose, license }: Props) => {
  // * this is just a placeholder the value will be passed to the LocalLicenseInfo only when the search is clicked therefor we needed 2 states
  const [searchValue, setSearchValue] = useState<number | undefined>(
    license || undefined
  );
  const [licenseId, setLicenseId] = useState<number | undefined>(license);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  console.log(isSubmitted);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickEnterToSearch({ buttonRef, inputRef });
  const [getDetainInfo, { detainInfo, error: detainInfoError, resetError }] =
    useGetDetainInfo();
  const [
    release,
    { error: releaseError, releaseId, resetError: resetReleaseError },
  ] = useReleaseLicense();
  const applicationId = useGetApplicationIdFromLicenseId(licenseId);
  useEffect(() => {
    license ? getDetainInfo(license) : null;
  }, [getDetainInfo, license]);
  return (
    <div className="ModalBox max-h-[500px]">
      <div>
        <section>
          <div className="flex justify-between px-40 mt-5 ">
            <label className="flex items-center font-semibold capitalize">
              <span className="inline-block mr-5">License ID:</span>
              <TextField
                disabled={license != undefined}
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
              disabled={license != undefined}
              ref={buttonRef}
              variant="contained"
              onClick={() => {
                resetError();
                resetReleaseError();
                setLicenseId(searchValue);
                getDetainInfo(searchValue as number);
              }}
            >
              Search
            </Button>
          </div>
        </section>
        {!isSubmitted ? (
          <div>
            <TextError className="my-1 font-bold text-center">
              {detainInfoError}
            </TextError>
            <TextError className="my-1 font-bold text-center">
              {releaseError}
            </TextError>
          </div>
        ) : null}
        <section>
          <LocalLicenseInfo applicationId={applicationId} noTitle />
        </section>
        <section>
          <ReleaseApplicationInfo info={detainInfo} releaseId={releaseId} />
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
              setIsSubmitted(true);
              release(licenseId as number);
            }}
            disabled={licenseId == null || licenseId <= 0 || isSubmitted}
          >
            Release
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default ReleaseLicense;
