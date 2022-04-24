import { ObjectId } from "mongodb";

export interface EmployeeInterface {
  _id: ObjectId;
  username: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  title: string;
}

export const Employee = (
  username: string,
  email: string,
  name: string,
  surname: string,
  phoneNumber: string,
  address: string,
  title: string
) => {
  return {
    _id: new ObjectId(), // mongo objectId
    username,
    email,
    name,
    surname,
    phoneNumber,
    address,
    title,
    createdAt: new Date(),
  };
};
