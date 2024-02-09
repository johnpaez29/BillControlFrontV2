import { useEffect, useState } from "react";
import { GetAllUsers } from "./services/UserService";
import { UserDomain } from "./types/UserDomain";
import "./index.css";
import { LoginButton } from "./components/loginButton";
import { SubTitle } from "../../components/subTitle";
import { useNavigate } from "react-router-dom";
import { ModalSpinner } from "../../components/modalSpinner";

export function Users () {
    
    const [users, setUsers] = useState<UserDomain[]  | null>(null);
    const [responseOk, setResponseOk] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const GetUsers = async () => {
        
        setShowModal(true);
        const response = await GetAllUsers();
        if (response?.length > 0){
            setResponseOk(true);
            setUsers(response);
        } else {
            setResponseOk(false);
            setUsers(null);
        }
        setShowModal(false);
    }
    
    useEffect(()=> {
        GetUsers();
    },[])

    const ShowBillPage = (element: any) => {

        if (element?.target?.value) {
            navigate('/bill',{
                state: {
                    userId :element?.target?.value
                }});
        }
    }

    return (
        <>
        {
            <ModalSpinner 
                activate = {showModal}
            />
        }
        {
            responseOk &&
            <div className="containerImage row">
                {
                    users?.map(user =>
                        {
                                return (
                                    <div key={user.idUser} className="col-2">
                                        <LoginButton 
                                            value={user.idUser} 
                                            image={user.image}
                                            onClick={ShowBillPage} />
                                        <SubTitle text={user.name}/>
                                    </div>
                                    )
                            })

                }
            </div>
        }
        </>
    );
}