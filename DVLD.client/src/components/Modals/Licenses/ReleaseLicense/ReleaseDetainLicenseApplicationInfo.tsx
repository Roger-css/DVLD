import { useSelector } from "react-redux";
import { DetainInfo } from "../../../../Types/License";
import { getApplicationTypes } from "../../../../redux/Slices/Applications";

type Props = {
  info: DetainInfo;
  releaseId?: number;
};
const ReleaseLicenseApplicationInfo = ({
  info: { createdBy, detainDate, fees, licenseId, detainId },
  releaseId,
}: Props) => {
  const applicationFees = useSelector(getApplicationTypes)?.find(
    (e) => e.applicationTypeId == 5
  )?.applicationTypeFees;
  return (
    <main>
      <section className="p-2 mb-3">
        <h2 className="mb-2 ml-2 text-base">
          Release Detained License Application Info:
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
                  {detainDate}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Application Fees:
                  </span>
                  {applicationFees as number}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Total Fees:
                  </span>
                  {(applicationFees as number) + fees}
                </div>
              </div>
              <div className="mr-48">
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
                  {createdBy}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Fine Fees:
                  </span>
                  {fees}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Release Id:
                  </span>
                  {releaseId ?? "??"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ReleaseLicenseApplicationInfo;
