export interface UserInterface {
  _id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  title: string;
}

export const User = (
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
