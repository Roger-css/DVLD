import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import LocalLicenseInfo from "../LocalLicenseInfo";

import {
  useGetApplicationIdFromLicenseId,
  useReplaceLicenseApplication,
} from "../License.hooks";
import CloseIcon from "@mui/icons-material/Close";
import TextError from "../../../formik/TextError";
import ReplacedLicenseApplicationInfo from "./ReplacementApplicationInfo";
import { ReplaceType } from "../../../../Types/License";
import { useClickEnterToSearch } from "../../../../hooks/useClickEnterToSearch";

type Props = {
  handleClose: () => void;
};
const ReplaceLicenseModal = ({ handleClose }: Props) => {
  // * this is just a placeholder the value will be passed to the LocalLicenseInfo only when the search is clicked therefor we needed 2 states
  const [searchValue, setSearchValue] = useState<number>(0);
  const [licenseId, setLicenseId] = useState<number>();
  const [replaceType, setReplaceType] = useState<ReplaceType>(ReplaceType.lost);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  useClickEnterToSearch({ buttonRef, inputRef });

  const applicationId = useGetApplicationIdFromLicenseId(licenseId);
  const [replaceLicense, { LicenseInfo, error, resetError }] =
    useReplaceLicenseApplication();
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
        Replace License Application
      </h3>
      <section>
        <div className="flex justify-center">
          <div className="flex items-center justify-between mt-5 mr-5">
            <label className="flex items-center mr-10 font-semibold capitalize">
              <span className="inline-block mr-5">License ID:</span>
              <TextField
                disabled={submitted}
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
              disabled={submitted}
              ref={buttonRef}
              variant="contained"
              onClick={() => {
                setLicenseId(searchValue);
                resetError();
              }}
              sx={{
                height: "40px",
              }}
            >
              Search
            </Button>
          </div>
          <FormControl disabled={submitted}>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Replacement For
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={replaceType}
              onChange={(e) => setReplaceType(+e.target.value)}
            >
              <FormControlLabel
                value={ReplaceType.lost}
                control={<Radio />}
                label="Lost License"
              />
              <FormControlLabel
                value={ReplaceType.damaged}
                control={<Radio />}
                label="Damaged License"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </section>
      <TextError className="my-1 font-bold text-center">{error}</TextError>
      <section>
        <LocalLicenseInfo applicationId={applicationId} noTitle />
      </section>
      <section>
        <ReplacedLicenseApplicationInfo
          oldLicenseId={licenseId}
          newLicense={LicenseInfo ?? {}}
          replaceFor={replaceType}
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
            replaceLicense({
              licenseId: licenseId as number,
              type: replaceType,
            });
            setSubmitted(false);
          }}
          disabled={licenseId == null || licenseId <= 0 || submitted}
        >
          Replace
        </Button>
      </footer>
    </main>
  );
};

export default ReplaceLicenseModal;
