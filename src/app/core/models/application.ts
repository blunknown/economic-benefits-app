export interface Application {
  id: number;
  userId: number;
  applicationTypeId: number;
  beneficiaryNames: string;
  beneficiarySurnames: string;
  beneficiaryDni: string;
  beneficiaryEmail: string;
  beneficiaryMobileNumber: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  comment: string;
  userNames: string;
  userSurnames: string;
  userDni: string;
  applicationTypeName: string;
}
