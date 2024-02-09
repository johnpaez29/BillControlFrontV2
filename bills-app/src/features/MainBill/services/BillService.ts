import { apiService } from "../../../services/apiServiceRest";
import { BillDomain } from "../types/BillDomain";
import { GetBillsResponse } from "../../../types/Bills/GetBillsReponse";
import { Bill } from "../../../types/Bills/Bill";
import { GetBill } from "../../../types/Bills/GetBill";
import { UpdateBill } from "../../../types/Bills/UpdateBill";

export async function GetAllBills() : Promise<GetBillsResponse>
{
    const responseUsers = await <Promise<GetBillsResponse>>apiService.GetAllAsync('Bill');

    return responseUsers;
} 

export async function GetAllBillsByUser(idUser: string) : Promise<GetBill[]>
{
    const responseUsers = await <Promise<GetBillsResponse>>apiService.GetAllByUserAsync('Bill/GetBillsByIdUser', idUser);

    const response = responseUsers.map<GetBill>(bill =>  
       { return {
        idUser : bill.idUser,
        idBill : bill.idBill,
        name : bill.name,
        payDate: bill.payDate,
        state: bill.state,
        id : bill.id
    }});

    return response;
} 

export async function InsertBill(bill: BillDomain) : Promise<string | null> {
    try {
        const billRequest = <Bill>{
            idUser : bill.idUser,
            name : bill.name,
            payDay : bill.payDay,
            state : bill.state
        }
        await apiService.InsertOneAsync('Bill/InsertBill', billRequest);
        return null;
    } catch (error) {
        return 'Error'
    }
}

export async function DeleteBill(idBill: string) : Promise<string> {
    try {
        if(await apiService.DeleteOneAsync('Bill/DeleteBill', idBill) === true) {
        return 'Ok';
        }
        return 'Error';
    } catch (error) {
        return 'Error'
    }
}

export async function UpdateBill(bill: GetBill, isPartial: boolean = true) : Promise<string | null> {
    try {
        const billUpdate : UpdateBill = {
            isPartial : isPartial,
            bill : bill
        }

        await apiService.updateBillAsync('Bill/UpdateBill', billUpdate);
        return null;
    } catch (error) {
        return 'Error'
    }
}