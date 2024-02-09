const ConvertGender = (gender: number) => {
  switch (gender) {
    case 1:
      return "Male";
    case 2:
      return "Female";
    case 3:
      return "Unknown";
  }
};
export default ConvertGender;
