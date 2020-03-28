export interface ProcessingActivity {
  id: number;
  description: string;
  personResponsible: string;
  purpose: string;
  affectedGroups: string;
  recipients: string;
  thirdCountryDataTransfers:string;
  dataDeletionPeriod: string;
  resourcesUsed: string
}
