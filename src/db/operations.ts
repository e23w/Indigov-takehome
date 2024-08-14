import {client} from './client';
import {ConstituentData, SearchFilterParams} from "../types";

export const insertConstituentAsync = async (data: ConstituentData): Promise<ConstituentData | null> => {

    // merge duplicate emails by overwriting row when a conflict occurs
    const sql = `
    INSERT INTO constituents (email, name, address, signup_time) VALUES ($1, $2, $3, NOW())
    ON CONFLICT (email) DO UPDATE SET (name, address, signup_time) = (excluded.name, excluded.address, excluded.signup_time)
    RETURNING *
    `;

    const values = [data.email, data.name, data.address];

    try {
        const results = await client.query(sql, values);
        return results.rows[0] || null;
    } catch (e) {
        console.error(`SQL error occurred trying to insert constituent with email ${data.email}. Error Details: \n${e}`);
        throw e;
    }
};


export const getAllConstituentsAsync = async (params: SearchFilterParams): Promise<ConstituentData[]> => {

    let sql = `
    SELECT * FROM constituents
    WHERE TRUE
    `

    const values = []

    let valNum = 1;

    if (params.startDate) {
        sql += ` AND signup_time >= $${valNum}`
        values.push(params.startDate);
        valNum++
    }

    if (params.endDate) {
        sql += ` AND signup_time <= $${valNum}`
        values.push(params.endDate);
    }

    if (params.sort) {
        sql += ` ORDER BY ${params.sort}`;
    }

    try {
        const results = await client.query(sql, values);
        return results.rows;
    } catch (e) {
        console.error(`SQL error occurred trying to retrieve constituents. Error Details: \n${e}`);
        throw e;
    }
};


export const insertConstituentsBulkAsync = async (data: ConstituentData[]) => {

    // todo wrap in a single transaction

    for (const constituentData of data) {
        await insertConstituentAsync(constituentData);
    }
}