import { useState } from "react";
import { ModalTwoOptions } from "../../../../components/modalTwoOptions";
import { GetBill } from "../../../../types/Bills/GetBill";
import "./index.css";

type ListBillProps = {
    billList : GetBill[],
    deleteBill : (id : any) => void,
    updatePayBill : (id : any, isPartial : boolean) => void
}

export function ListBill (props : ListBillProps) {

    const [showModalTwoOptions, setShowModalTwoOptions] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [textSubmitOne, setTextSubmitOne] = useState<string>('');
    const [textSubmitTwo, setTextSubmitTwo] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [isUpdate, setIsUpdate] = useState<boolean>(true);

    const anyBill : boolean = (props.billList?.length  ?? 0) > 0;

    const updatePayBill = (e : any) => {
        setText('Factura paga de forma parcial o total ?');
        setTextSubmitOne('Parcial');
        setTextSubmitTwo('Total');
        setShowModalTwoOptions(true);
        setValue(e.target.value);
        setIsUpdate(true);
    }

    const deleteBill = (e : any) => {
        setText('Esta seguro que desea eliminar factura ?');
        setTextSubmitOne('Si');
        setTextSubmitTwo('No');
        setShowModalTwoOptions(true);
        setValue(e.target.value);
        setIsUpdate(false);
    }

    const onSubmitOne = (e : any) => {
        isUpdate ? props.updatePayBill(e, true) : props.deleteBill(e);
        onCloseModal();
    }

    const onSubmitTwo = (e : any) => {
        isUpdate ? props.updatePayBill(e, false) : '';
        onCloseModal();
    }

    const onCloseModal = () => {
        setShowModalTwoOptions(false);
    }
    return (
        <>
        {
            !anyBill &&
            <p>
                No existien servicios a mostrar
            </p>
        }
        
        {
            anyBill &&
            <div className='mx-5'>
            <table className='table'>
                <thead className='thead-dark'>
                <tr>
                    <th scope='col'>Servicio</th>
                    <th scope='col'>Fecha de pago</th>
                    <th scope='col'>Estado</th>
                    <th scope='col'>Registrar pago</th>
                    <th scope='col'>Eliminar Servicio</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.billList.GroupBy('idBill').map(group => {
                        
                        return (
                            group.map((service , index) => {
                            return (
                                <tr key={service.id} className={service.state === 'ATRASADO' ? 'table-danger' : ''}>
                                <th scope='row'>{service.name}</th>
                                <td>{new Date(service.payDate).toLocaleDateString("en-US")}</td>
                                <td>{service.state}</td>
                                <td><button
                                    className='btn btn-outline-info btn-block btn-eye'
                                    value={service.id}
                                    hidden={new Date().getMonth() + 1 < new Date(service.payDate).getMonth()}
                                    onClick={updatePayBill}
                                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></td>
                                <td><button
                                    className='btn btn-outline-danger btn-block'
                                    value={service.idBill}
                                    hidden={index > 0}
                                    onClick={deleteBill}
                                >Eliminar</button></td>
                                </tr>
                            )
                            })
                        )
                    })
                }
                </tbody>
            </table>
            {
                    <ModalTwoOptions 
                        activate = {showModalTwoOptions}
                        onSubmitOne={onSubmitOne}
                        onSubmitTwo={onSubmitTwo}
                        onCloseModal={onCloseModal}
                        text={text}
                        textSubmitOne={textSubmitOne}
                        textSubmitTwo={textSubmitTwo}
                        value={value}
                    />
            }
            </div>
        }
        </>
      )
}