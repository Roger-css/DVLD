import { useSelector } from "react-redux";
import ShortDateString from "../../../../Utils/ShortDateString";
import { getApplicationTypes } from "../../../../redux/Slices/Applications";
import { getCurrentUserInfo } from "../../../../redux/Slices/Auth";

type InternationalDrivingLicenseInfo = {
  applicationId: number;
  licenseId: number;
};
type Props = {
  internationalLicenseInfo: InternationalDrivingLicenseInfo;
  localLicenseId?: number;
};

const InternationalLicenseInfo = ({
  internationalLicenseInfo,
  localLicenseId,
}: Props) => {
  const { applicationId, licenseId } = internationalLicenseInfo;
  const fees = useSelector(getApplicationTypes)?.find(
    (e) => e.applicationTypeId == 6
  )?.applicationTypeFees;
  const currentUser = useSelector(getCurrentUserInfo);
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  return (
    <div>
      <fieldset className="p-4 m-3 border border-black border-solid rounded-2xl">
        <legend className="ml-5">Application Info</legend>
        <form aria-readonly>
          <div className="flex">
            <div className="flex-grow">
              <div>
                <span className="inline-block mr-2 text-lg font-semibold">
                  I.Application ID:
                </span>
                {applicationId}
              </div>
              <div>
                <span className="inline-block mr-2 text-lg font-semibold">
                  Application Date:
                </span>
                {ShortDateString(new Date())}
              </div>
              <div>
                <span className="inline-block mr-2 text-lg font-semibold">
                  IssueDate:
                </span>
                {ShortDateString(new Date())}
              </div>
              <div>
                <span className="inline-block mr-2 text-lg font-semibold">
                  Fees:
                </span>
                {fees}
              </div>
            </div>
            <div className="w-2/5">
              <div>
                <span className="inline-block mr-2 text-lg font-semibold">
                  License ID:
                </span>
                {licenseId}
              </div>
              <div>
                <span className="inline-block mr-2 text-lg font-semibold">
                  Local License ID:
                </span>
                {localLicenseId}
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
                {currentUser?.userName}
              </div>
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default InternationalLicenseInfo;
