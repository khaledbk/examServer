export interface EmployeeInterface {
  _id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  title: string;
}

export const Employee = (
  name: string,
  surname: string,
  phoneNumber: string,
  address: string,
  title: string
) => {
  return {
    _id: "", // mongo objectId
    name,
    surname,
    phoneNumber,
    address,
    title,
    createdAt: new Date(),
  };
};
