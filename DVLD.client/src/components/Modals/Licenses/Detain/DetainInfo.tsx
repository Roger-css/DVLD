import ShortDateString from "../../../../Utils/ShortDateString";
import { useSelector } from "react-redux";
import { getCurrentUserInfo } from "../../../../redux/Slices/Auth";
import { Input } from "@mui/material";
import { SetStateAction } from "react";
import TextError from "../../../formik/TextError";

type Props = {
  licenseId?: number;
  detainId?: number;
  fees: number;
  setFees: React.Dispatch<SetStateAction<number>>;
  submitted: boolean;
};
const DetainInfo = ({
  licenseId,
  detainId,
  fees,
  setFees,
  submitted,
}: Props) => {
  const currentUser = useSelector(getCurrentUserInfo)?.userName;
  return (
    <main>
      <section className="p-2 mb-3">
        <h2 className="mb-2 ml-2 text-base">
          Replace License Application Info:
        </h2>
        <div className="flex justify-between p-4 overflow-auto border border-black rounded-xl max-h-80">
          <div className="flex-grow licenseInfoContainers">
            <div className="flex justify-between">
              <div>
                <div className="mr-2">
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Detain Id:
                  </span>
                  {detainId ?? "??"}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Detain Date
                  </span>
                  {ShortDateString()}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Fine Fees:
                  </span>
                  <strong>$</strong>
                  <Input
                    value={fees}
                    sx={{
                      fontWeight: "bold",
                      pl: "4px",
                    }}
                    error={fees <= 0 && submitted}
                    onChange={(e) => {
                      const num = +e.target.value;
                      if (!isNaN(num)) setFees(num);
                    }}
                  />
                  {fees <= 0 && submitted && (
                    <TextError>Fine can't be zero</TextError>
                  )}
                </div>
              </div>
              <div>
                <div className="mr-2">
                  <span className="inline-block mr-2 text-lg font-semibold">
                    License Id:
                  </span>
                  {licenseId ?? "??"}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Created By:
                  </span>
                  {currentUser}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default DetainInfo;
