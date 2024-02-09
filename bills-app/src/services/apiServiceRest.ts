import config from '../config.json'

export const apiService =  {
     GetAllAsync : async (endpoint: string): Promise<any> => {
        const response = await fetch(`${config.ENDPOINT_API_BACK}/${endpoint}`);

        if (response.ok) {
            return response.json();
        } else {
            return null;
        }
    },
    GetAllByUserAsync : async (endpoint: string, id : string): Promise<any> => {
        const response = await fetch(`${config.ENDPOINT_API_BACK}/${endpoint}/${id}`);

        if (response.ok) {
            return response.json();
        } else {
            return null;
        }
    },
    InsertOneAsync : async (endpoint: string, body : any): Promise<boolean> => {
        const response = await fetch(`${config.ENDPOINT_API_BACK}/${endpoint}`, {
            method : 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        });

        return response.ok;
    },
    DeleteOneAsync : async (endpoint: string, id : string): Promise<boolean> => {
        const response = await fetch(`${config.ENDPOINT_API_BACK}/${endpoint}/${id}`, {
            method: 'DELETE'
        });

        return response.ok;
    },
    updateBillAsync : async (endpoint: string, body : any): Promise<boolean> => {
        const response = await fetch(`${config.ENDPOINT_API_BACK}/${endpoint}`, {
            method : 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        });

        return response.ok;
    }
}