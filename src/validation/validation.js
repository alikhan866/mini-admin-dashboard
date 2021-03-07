export const nameValidation = [
  { required: true, message: "Name is required" },
  { min: 3, message: "Name should be atleast 3 characters long" },
  { max: 26, message: "Name should be less than 26 characters long" },
];

export const birthDateValidation = [
  { required: true, message: "Date is required" },
];

export const addressValidation = [
  { min: 3, message: "Address should be atleast 3 characters long" },
  { required: true, message: "Address is required" },
];

export const genderValidation = [
  { required: true, message: "Gender is required" },
];

export const collegeValidation = [
  { required: true, message: "College is required" },
];

export const hobbiesValidation = [
  { required: true, message: "Hobbies is required" },
];
