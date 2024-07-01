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
export type { licenseClass, LocalDrivingLicenseInfo, LicenseView };
