import * as csvWriterLib from 'csv-writer';
import * as operations from '../db/operations';
import {ConstituentData, SearchFilterParams} from "../types"
import {parse} from "csv-parse";


export const getAllConstituentsAsync = async (body: SearchFilterParams): Promise<ConstituentData[]> => {

    return await operations.getAllConstituentsAsync(body);
};


export const exportConstituentCSVAsync = async (body: SearchFilterParams): Promise<string> => {

    // todo check startDate is before endDate

    const fileHeaders = [
        {id: 'id', title: 'Constituent ID'},
        {id: 'email', title: 'Email'},
        {id: 'name', title: 'Name'},
        {id: 'address', title: 'Address'},
        {id: 'signup_time', title: 'Signup Datetime'}
    ];

    const records = await operations.getAllConstituentsAsync(body) || [];

    const exportTime = new Date();

    const filePath = `./constituent_export_${exportTime.toISOString()}.csv`

    const csvWriter = csvWriterLib.createObjectCsvWriter({
        path: filePath,
        header: fileHeaders
    })

    await csvWriter.writeRecords(records);

    return filePath;
};


export const insertConstituentAsync = async (data: ConstituentData): Promise<ConstituentData | null> => {

    return await operations.insertConstituentAsync(data);
};


export const importCSVAsync = async (data: Buffer): Promise<boolean> => {

    const parsedData = await parse(data);

    const constituentsData = [];

    // we assume order of rows is [email, name, address]
    for await (const row of parsedData) {
        const constituent: ConstituentData = {
            email: row[0],
            name: row[1],
            address: row[2],
        }

        constituentsData.push(constituent);
    }

    await operations.insertConstituentsBulkAsync(constituentsData);

    return true
}