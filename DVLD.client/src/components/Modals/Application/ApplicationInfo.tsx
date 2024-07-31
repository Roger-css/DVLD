import { BasicApplicationInfo } from "../../Types/Applications";

type TyProps = {
  Details: BasicApplicationInfo;
};

const ApplicationInfo = ({ Details }: TyProps) => {
  const {
    id,
    applicationId,
    applicationType,
    createdBy,
    date,
    paidFees,
    licenseClass,
    name,
    passedTests,
    status,
    statusDate,
  } = Details;
  return (
    <section>
      <fieldset className="p-4 pr-24 mb-3 testFieldset">
        <legend className="text-lg">Driving License Application Info</legend>
        <div className="flex justify-between">
          <div>
            <span className="inline-block mr-2 text-lg">D.L.App ID:</span>
            {id}
          </div>
          <div>
            <span className="inline-block mr-2 text-lg">
              Applied For License:{" "}
            </span>
            {licenseClass.split(" - ")[1]}
          </div>
        </div>
        <div className="mr-2">
          <span className="inline-block mr-2 text-lg">Passed Tests: </span>
          {passedTests}
        </div>
      </fieldset>
      <fieldset className="p-4 pr-24 mb-3 testFieldset">
        <legend className="text-lg">Application Basic Info</legend>
        <div className="flex justify-between">
          <div>
            <span className="inline-block mr-2 text-lg">ID: </span>
            {applicationId}
          </div>
          <div>
            <span className="inline-block mr-2 text-lg">Date:</span>
            {new Date(date).toLocaleDateString()}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="inline-block mr-2 text-lg">Status: </span>
            {status}
          </div>
          <div>
            <span className="inline-block mr-2 text-lg">Status Date: </span>
            {new Date(statusDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="inline-block mr-2 text-lg">Fees: </span>
            {paidFees}
          </div>
          <div>
            <span className="inline-block mr-2 text-lg">Created By: </span>
            {createdBy}
          </div>
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">Type: </span>
          {applicationType}
        </div>
        <div>
          <span className="inline-block mr-2 text-lg">Applicant: </span>
          {name}
        </div>
      </fieldset>
    </section>
  );
};

export default ApplicationInfo;
