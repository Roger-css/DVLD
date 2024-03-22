type personInfo = {
  id: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  birthDate: string;
  gender: number;
  address: string;
  phone: string;
  email: string;
  nationalityCountryId: number;
  image?: string;
};
type person = {
  id: number;
  nationalNo: string;
  name: string;
  birthDate: Date;
  gender: string;
  phone: string;
  email: string;
  nationalityCountry: number;
};
interface personFilters {
  [key: string]: string;
  none: "None";
  id: "Id";
  nationalNo: string;
  name: string;
  phone: string;
  email: string;
}
export type { person, personInfo, personFilters };
