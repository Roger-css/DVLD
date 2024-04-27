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
export type { applicationTypes, localDrivingLA, localDrivingLA_view };
