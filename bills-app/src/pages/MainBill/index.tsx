import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { MainBills } from "../../features/MainBill";

export function MainBill () {

    const [userId, setUserId] = useState<string>('');
    const location = useLocation();
    useEffect(() => {
        setUserId(location.state.userId);
    }, 
    []);
    
    return (
        <>
        {
            userId &&
            <MainBills idUser = {userId} />
        }
        </>
    )
}
