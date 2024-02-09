import { useEffect, useState } from "react"
import { FilterBill } from "./components/FIlterBill"
import { BillDomain } from "./types/BillDomain";
import { DeleteBill, GetAllBillsByUser, InsertBill, UpdateBill } from "./services/BillService";
import { ElementState } from "./types/ElementState";
import { Button } from "../../components/Button";
import { ModalSpinner } from "../../components/modalSpinner";
import { FormModalBill } from "./components/FormModalBill";
import { ListBill } from "./components/ListBill";
import { useNavigate } from "react-router-dom";
import { BillState } from "../../types/constants/Bill";
import { GetBill } from "../../types/Bills/GetBill";

type MainBillProp = {
    idUser : string
} 

export function MainBills (props : MainBillProp) {

    const [elementFilter, setElementFilter] = useState<ElementState | any>({
        selectValue: '',
        selectState: '',
        checkAll: false
    });
    const [bills, setBills] = useState<GetBill[]>([]);
    let billsFiltered : GetBill[] = (bills.filter(service  => {
        return (service.idUser === props.idUser) && (
            elementFilter.checkAll || 
                ((elementFilter.selectValue || elementFilter.selectState) &&
                (elementFilter.selectValue === '' || service.idBill === elementFilter.selectValue) &&
                (elementFilter.selectState === '' || service.state === elementFilter.selectState)))}));

    const [getBillsOk, setGetBillsOk] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalBill, setShowModalBill] = useState<boolean>(false);

    const navigate = useNavigate();
    
    const handlerFilter = (filterService : any) => {
        const nameFilter : string = Object.keys(filterService)[0];
        setElementFilter({
            ...elementFilter,
            [nameFilter]: Object.values(filterService)[0]
        });
      }

    const  handlerSubmit = async (data : BillForm) : Promise<any> =>  {
        
        const billInsert : BillDomain = 
        { 
            name : data.name,
            payDay : data.payDay,
            state : BillState.Pendiente,
            idUser : props.idUser
        };
        setShowModal(true);
        await InsertBill(billInsert);
        await GetBills(props.idUser);
        setShowModalBill(false);
    }

    const handlerUpdatePayBill = async (element : any, isPartial: boolean) => {
        
        if (element.target.value) {
            const billSelected = bills.find(bill => bill.id == element.target.value);
            if (billSelected) {
                billSelected.state = BillState.Pago;

                setShowModal(true);
                await UpdateBill(billSelected, isPartial);
                await GetBills(props.idUser);
                setShowModalBill(false);
            }
        }
    }
    const handlerDeleteBill = async (element : any) => {
        
        if (element.target.value) {
            setShowModal(true);
            if((await DeleteBill(element.target.value)) === 'Ok') {
                await GetBills(props.idUser);
            }
            setShowModalBill(false);
        }
    }

    const GetBills = async (idUser : string) => {
        setShowModal(true);

        try {   
            const response = await GetAllBillsByUser(idUser);
            if ((response?.length ?? 0) > 0) {
                setBills(response);
            } else {
                setBills([]);
            }
            setGetBillsOk(true);
        } catch (error) {
            alert(error);
        } finally {
            setShowModal(false);
        }

        setShowModal(false);
    } 
    useEffect(() => {
        GetBills(props.idUser);
    },[]);

    const ShowModalBill = () => {
        setShowModalBill(true);
    }

    const showUsers = () => {
        navigate('/login');
    }

    const handlerCloseModal = () => {
        setShowModalBill(false);
    }
    return (
        <>
        {
            getBillsOk &&
            <>
            <div ><Button class="btn btn-primary mx-2" text="Usuarios" onClick={showUsers}/></div>
            <div className="container">
                <FilterBill 
                    serviceList={bills}
                    serviceFilter={handlerFilter} />
            </div>
            <div className="container">
                <Button class="btn btn-info my-1" onClick={ShowModalBill} text="Adicionar Servicio"/>
            </div>

            </>
        }
        {
            <>
            <FormModalBill  
                activate = {showModalBill}
                bill = {null}
                edit = {false}
                onSubmitModal={handlerSubmit}
                onCloseModal={handlerCloseModal}
                bills = {bills} />            
            </>
        }
        {
            <ListBill
                billList={billsFiltered}
                deleteBill={handlerDeleteBill}
                updatePayBill={handlerUpdatePayBill}
            />
        }
        {
            <ModalSpinner 
            activate = {showModal}
        />
        }
        </>
        
    )
} 


