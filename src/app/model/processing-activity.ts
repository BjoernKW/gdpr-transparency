export interface ProcessingActivity {
  id: number | undefined;
  description: string;
  personResponsible: string;
  purpose: string;
  affectedGroups: string;
  recipients: string;
  thirdCountryDataTransfers: string;
  dataDeletionPeriod: string;
  resourcesUsed: string
}
