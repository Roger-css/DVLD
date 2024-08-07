import { Dayjs } from "dayjs";

type applicationTypes = {
  applicationTypeId: number;
  applicationTypeTitle: string;
  applicationTypeFees: number;
};
type localDrivingLA = {
  id: number;
  date: Dayjs | null;
  classId: number;
  fees: number;
  creatorId: number;
};
type localDrivingLA_view = {
  id: number;
  drivingClass: number;
  nationalNo: string;
  fullName: string;
  applicationDate: Date;
  passedTests: number;
  status: string;
};
type BasicApplicationInfo = {
  id: number;
  licenseClass: string;
  passedTests: number;
  applicationId: number;
  date: string;
  status: string;
  statusDate: string;
  paidFees: number;
  createdBy: string;
  applicationType: string;
  name: string;
};

export type {
  applicationTypes,
  localDrivingLA,
  localDrivingLA_view,
  BasicApplicationInfo,
};
