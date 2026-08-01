export interface Client {
  _id: string;

  firstName: string;
  lastName: string;

  dob: string;
  gender: string;

  phone: string;
  email: string;

  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface UpdatedClientResponse {
  updatedClient: Client;
}