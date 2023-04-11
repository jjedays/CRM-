export interface IUser {
  age: number;
  displayName: string;
  bio: string;
  role: "Driver" | "Passenger" | "Dispatch";
  user: string;
}
