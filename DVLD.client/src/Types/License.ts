type licenseClass = {
  id: number;
  className: string;
  classDescription: string;
  minimumAllowedAge: number;
  defaultValidityLength: number;
  classFees: number;
};
type LocalDrivingLicenseInfo = {
  licenseClass: string;
  fullName: string;
  licenseId: number;
  isActive: boolean;
  nationalNo: string;
  dateOfBirth: string;
  gender: string;
  driverId: number;
  issueDate: string;
  expireDate: string;
  issueReason: string;
  isDetained: boolean;
  notes: string;
  image: string;
};
type LicenseView = {
  id: number;
  applicationId: number;
  className: string;
  issueDate: string;
  ExpDate: string;
  isActive: boolean;
};
type NewLicenseInfo = {
  id: number;
  applicationId: number;
  applicationDate: string;
  oldLicenseId: number;
  issueDate: string;
  expirationDate: string;
  applicationFees: number;
  createdBy: string;
  licenseFees: number;
  totalFees: string;
};
type IntLicense = {
  id: number;
  applicationId: number;
  issueUsingLocalDrivingLicenseId: string;
  issueDate: string;
  expirationDate: string;
  driverId: number;
  isActive: boolean;
};
export enum ReplaceType {
  lost = 3,
  damaged,
}
type DetainLicense = {
  licenseId: number;
  fees: number;
};
type DetainInfo = {
  licenseId: number;
  fees: number;
  detainDate: string;
  createdBy: string;
};
export type {
  licenseClass,
  LocalDrivingLicenseInfo,
  LicenseView,
  NewLicenseInfo,
  IntLicense,
  DetainLicense,
  DetainInfo,
};
