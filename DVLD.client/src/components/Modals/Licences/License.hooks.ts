import { useEffect, useState } from "react";
import usePrivate from "../../../hooks/usePrivate";
import { LicenseView, LocalDrivingLicenseInfo } from "../../../Types/License";

export const useGetLocalDrivingLicenseInfo = (appId: number) => {
  const [licenseInfo, setLicenseInfo] = useState<LocalDrivingLicenseInfo>({
    licenseId: 0,
    dateOfBirth: "",
    driverId: 0,
    expireDate: "",
    fullName: "",
    gender: "",
    isActive: false,
    isDetained: false,
    issueDate: "",
    issueReason: "",
    licenseClass: "",
    nationalNo: "",
    notes: "",
    image: "",
  });
  const axios = usePrivate();
  useEffect(() => {
    const fetchingLicenseInfo = async () => {
      try {
        const response = await axios.get(`License/local/${appId}`);
        setLicenseInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingLicenseInfo();
  }, [appId, axios]);
  return licenseInfo as LocalDrivingLicenseInfo;
};
export const useGetAllLocalDrivingLicenses = (personId: number) => {
  const [allLicense, setAllLicense] = useState<LicenseView[]>([]);
  const axios = usePrivate();
  useEffect(() => {
    const fetchingLicenseInfo = async () => {
      try {
        const response = await axios.get(`License/local/All/${personId}`);
        setAllLicense(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingLicenseInfo();
  }, [axios, personId]);
  return allLicense;
};
