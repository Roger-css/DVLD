import ShortDateString from "../../../../Utils/ShortDateString";
import { useSelector } from "react-redux";
import { getCurrentUserInfo } from "../../../../redux/Slices/Auth";
import { getApplicationTypes } from "../../../../redux/Slices/Applications";
import { ReplaceType } from "../../../../Types/License";

type Props = {
  oldLicenseId?: number;
  newLicense: NewDrivingLicenseInfo;
  replaceFor: ReplaceType;
};
type NewDrivingLicenseInfo = {
  applicationId?: number;
  licenseId?: number;
};
const ReplacedLicenseApplicationInfo = ({
  oldLicenseId,
  newLicense: { applicationId, licenseId },
  replaceFor,
}: Props) => {
  const currentUser = useSelector(getCurrentUserInfo)?.userName;
  const fees = useSelector(getApplicationTypes)?.find(
    (e) => e.applicationTypeId == replaceFor
  )?.applicationTypeFees;
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
                    L.R Application Id:
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
                    Application Fees:
                  </span>
                  {fees}
                </div>
              </div>
              <div>
                <div className="mr-2">
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Replaced License Id:
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
export default ReplacedLicenseApplicationInfo;
