import { BaseCommand } from '@adonisjs/core/build/standalone'
import xlsx from 'xlsx'
import File from 'App/Models/File'
import Client from 'App/Models/Client'
import Bank from 'App/Models/Bank'
import Address from 'App/Models/Address'
import { DateTime } from 'luxon'

interface ClientInterface {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    name: string;
    email: string | undefined;
    phoneNumber: string | undefined;
    pan: string | undefined;
}

interface BankInterface {
  id: number;
  createdAt: DateTime;
  updatedAt: DateTime;
  clientId: number;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string | undefined;
  address: string | undefined;
  city: string | undefined;  
}

interface AddressInterface {
  id: number;
  createdAt: DateTime;
  updatedAt: DateTime;
  clientId: number;
  city: string;
  addressLine1: string;
  addressLine2: string | undefined;
  state: string | undefined;
  zip: string | undefined;  
}

export default class ProcessFile extends BaseCommand {
  public static commandName = 'process:file'

  public static description = 'process excel file into database'

  public static settings = {
    loadApp: true,
  }

  public async run() {
    const files = await File.query().orderBy('id').limit(1)
    this.processFile(files)
  }

  public async processFile(files: File[]) {
    const file = files[0]
    const workbook = xlsx.readFile(file.filePath)

    // Process Client Sheet (Sheet 1)
    const clientSheet = workbook.Sheets['Sheet1']
    const clientData : ClientInterface[] = xlsx.utils.sheet_to_json(clientSheet)

    for (const clientRow of clientData) {
      console.log('Processing client:', clientRow);
      await Client.create(clientRow)
      console.log('Client processed:', clientRow);
    }

    // Process Client Bank Details Sheet (Sheet 2)
    const bankDetailSheet = workbook.Sheets['Sheet2']
    const bankDetailData : BankInterface[] = xlsx.utils.sheet_to_json(bankDetailSheet)

    for (const bankDetailRow of bankDetailData) {
      console.log('Processing bank detail:', bankDetailRow);
      await Bank.create(bankDetailRow)
      console.log('Bank detail processed:', bankDetailRow);
    }

    // Process Client Address Sheet (Sheet 3)
    const addressSheet = workbook.Sheets['Sheet3']
    const addressData : AddressInterface[] = xlsx.utils.sheet_to_json(addressSheet)

    for (const addressRow of addressData) {
      console.log('Processing address:', addressRow);
      await Address.create(addressRow)
      console.log('Address processed:', addressRow);
    }

    console.log('Excel file processing complete.');
  }
}
