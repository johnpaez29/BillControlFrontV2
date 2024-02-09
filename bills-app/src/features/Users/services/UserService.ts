import { apiService } from "../../../services/apiServiceRest";
import { GetUsersResponse } from "../../../types/users/GetUsersResponse";
import { UserDomain } from "../types/UserDomain";


export async function GetAllUsers() : Promise<UserDomain[]>
{
    const responseUsers = await <Promise<GetUsersResponse>>apiService.GetAllAsync('User');

    return responseUsers.map<UserDomain>(user => {
        return {
            idUser: user.idUser,
            image: user.image,
            name: user.name,
            lastName: user.lastName
        };
    });
} 