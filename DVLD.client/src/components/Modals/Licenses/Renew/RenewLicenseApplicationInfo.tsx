import Textarea from "@mui/joy/Textarea";
import ShortDateString from "../../../../Utils/ShortDateString";
import { useSelector } from "react-redux";
import { getApplicationTypes } from "../../../../redux/Slices/Applications";
import { getCurrentUserInfo } from "../../../../redux/Slices/Auth";
import { useGetLocalDrivingLicenseInfo } from "../License.hooks";
import { getLicenseClasses } from "../../../../redux/Slices/License";

type Props = {
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  oldLicenseId?: number;
  oldLicenseApplicationId: number;
  newLicense: NewDrivingLicenseInfo;
};
type NewDrivingLicenseInfo = {
  applicationId?: number;
  licenseId?: number;
};
const RenewLicenseApplicationInfo = ({
  notes,
  setNotes,
  oldLicenseId,
  oldLicenseApplicationId,
  newLicense: { applicationId, licenseId },
}: Props) => {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 10);
  const fees = useSelector(getApplicationTypes)?.find(
    (e) => e.applicationTypeId == 2
  )?.applicationTypeFees;
  const currentUser = useSelector(getCurrentUserInfo)?.userName;
  const licenseClass = useGetLocalDrivingLicenseInfo(
    oldLicenseApplicationId
  ).licenseClass;
  const licenseFees = useSelector(getLicenseClasses)?.find(
    (e) => e.className == licenseClass
  )?.classFees;

  return (
    <main>
      <section className="p-2 mb-3">
        <div className="flex justify-between p-4 overflow-auto border border-black rounded-xl max-h-80">
          <div className="flex-grow licenseInfoContainers">
            <div className="flex justify-between">
              <div>
                <div className="mr-2">
                  <span className="inline-block mr-2 text-lg font-semibold">
                    R.L Application Id:
                  </span>
                  {applicationId ?? "??"}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Application Date
                  </span>
                  {ShortDateString()}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Issue Date:
                  </span>
                  {ShortDateString()}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Application Fees:
                  </span>
                  {fees}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    License Fees:
                  </span>
                  {licenseFees ?? 0}
                </div>
              </div>
              <div>
                <div className="mr-2">
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Renewed License Id:
                  </span>
                  {licenseId ?? "??"}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Old License ID:
                  </span>
                  {oldLicenseId ?? "??"}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Expiration Date:
                  </span>
                  {ShortDateString(expirationDate)}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Created By:
                  </span>
                  {currentUser}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Total Fees:
                  </span>
                  {(fees as number) + (licenseFees ?? (0 as number))}
                </div>
              </div>
            </div>
            <div className="mt-4 mr-2">
              <Textarea
                color="neutral"
                minRows={2}
                placeholder="Notes"
                size="md"
                variant="outlined"
                maxRows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default RenewLicenseApplicationInfo;
