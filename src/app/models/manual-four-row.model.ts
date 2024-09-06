export class ManualFourRowComponent {
    corporateCode: string;
    corporateName: string;
    narration: string;
    description: string;
    beneficiary: string;
    forecastedAmount: number;
    lockRecord: boolean;
    valueDate: Date;
    recurringFrom: Date;
    recurringTo: Date;
    recurringPattern: string;
  
    constructor() {
      // Initialize the properties if necessary
      this.corporateCode = '';
      this.corporateName = '';
      this.narration = '';
      this.description = '';
      this.beneficiary = '';
      this.forecastedAmount = 0;
      this.lockRecord = false;
      this.valueDate = new Date();
      this.recurringFrom = new Date();
      this.recurringTo = new Date();
      this.recurringPattern = '';
    }
  }
  