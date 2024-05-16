export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  profile: {
    gpa: number;
    avatar: string;
    balance: string;
    university_name: string;
  };
}
