import { RenewLicenseApplicationInfo } from "../../../Types/Applications";
import ConvertBinaryToImage from "../../../Utils/ConvertBinaryToImage";

type Props = {
  data: RenewLicenseApplicationInfo;
  noTitle?: boolean;
};

const LocalLicenseInfo = ({ data, noTitle = false }: Props) => {
  const {
    expirationDate,
    oldLicenseId,
    applicationDate,
    applicationFees,
    applicationId,
    createdBy,
    id,
    licenseFees,
    statusDate,
    issueDate,

    notes,
  } = data;
  return (
    <main>
      <section className="p-2 mb-3">
        <div className="flex justify-between p-4 overflow-auto border border-black rounded-xl max-h-80">
          <div className="flex-grow licenseInfoContainers">
            <div className="mr-2">
              <span className="inline-block mr-2 text-lg font-semibold">
                class:{" "}
              </span>
              {licenseClass}
            </div>
            <div className="mr-2">
              <span className="inline-block mr-2 text-lg font-semibold">
                Name:{" "}
              </span>
              {fullName}
            </div>
            <div className="flex justify-between">
              <div className="">
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    License ID:
                  </span>
                  {licenseId}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    National No:
                  </span>
                  {nationalNo}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Gender:
                  </span>
                  {gender}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Issue Date:
                  </span>
                  {issueDate}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Issue Reason:
                  </span>
                  {issueReason}
                </div>
              </div>
              <div className="">
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Is Active?:
                  </span>
                  {isActive ? "Yes" : "No"}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Date of Birth:{" "}
                  </span>
                  {dateOfBirth}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Driver Id:
                  </span>
                  {driverId}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Expiration Date:
                  </span>
                  {expireDate}
                </div>
                <div>
                  <span className="inline-block mr-2 text-lg font-semibold">
                    Is Detained?:
                  </span>
                  {isDetained ? "Yes" : "No"}
                </div>
              </div>
            </div>
            <div className="mr-2">
              <span className="inline-block mr-2 text-lg font-semibold">
                Notes:{" "}
              </span>
              {notes}
            </div>
          </div>
          <div className="grid mt-4 ml-3 ">
            <img
              src={ConvertBinaryToImage(image)}
              alt=""
              className="self-center object-contain rounded-lg w-36"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
export default LocalLicenseInfo;
