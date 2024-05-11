type testType = {
  id: number;
  testTypeTitle: string;
  testTypeDescription: string;
  testTypeFees: number;
};
type testAppointment = {
  id: number;
  appointmentDate: Date;
  paidFees: number;
  isLocked: boolean;
};
type appointmentClass = {
  id?: number;
  TestTypeId: number;
  LocalDrivingLicenseApplicationId: number;
  AppointmentDate: string | Date;
  PaidFees: number;
  CreatedByUserId: number;
  IsLocked: boolean;
  RetakeTestApplicationId?: number;
};
type test = {
  testAppointmentId: number;
  testResult: number;
  notes: string;
  createdByUserId: number;
};
export type { testType, testAppointment, appointmentClass, test };
