import Modal from 'react-modal';
import { BillDomain } from '../../types/BillDomain';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import './index.css';
import { GetBill } from '../../../../types/Bills/GetBill';

Modal.setAppElement('#root');

const styles = {
  content: {
    top: '50%',
    botton: 'auto',
    left: '50%',
    right: 'auto',
    marginRight: '-40%',
    transform: 'translate(-30%, -80%)'
  }
}

type ModalProps = {
    activate : boolean,
    bill: BillDomain | null,
    edit: boolean,
    onSubmitModal : (arg0: BillForm) => void
    onCloseModal : () => void,
    bills: GetBill[]
}


let subtitle : any;
export function FormModalBill (props : ModalProps) {
  
    const [billModal, setBillModal] = useState<BillForm>({ name:'', payDay:0 });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const afterOpenModal = () => {
        subtitle.style.color = 'black';
    }

    const handlerChange = (e: { target: { name: string; value: string; }; }) => {
        setBillModal({
            ...billModal,
          [e.target.name] : e.target.name === 'payDay' ? Number.parseInt(e.target.value) : e.target.value
        });
      }

    const closeModal = () => {
        props.onCloseModal();
    }

    const validateField = (value: string) : boolean => {
        if (!value) {
            setErrorMessage('Error en el valor insertado');

            return false;
        }
        let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

        for (let char of value) {
            if(char.match(format) ){
                setErrorMessage('No se permiten caracteres especiales');
                return false;
            }
        }
        if (props.bills.some(bill => bill.name.toUpperCase() === value.toUpperCase())){
            setErrorMessage('Ya existe un servicio con el mismo nombre.');
            return false;
        }

        setErrorMessage(null);
        return true;
      }

      const validateFieldNumber = (value: number) : boolean => {
        let error : string | null;
        if (value > 31) {
            error = 'No se puede ingresar un valor mayor a 31.';
            setErrorMessage(error);
            return false
        }
        if (value < 1) {
            error = 'No se puede ingresar un valor menor a 1.';
            setErrorMessage(error);
            return false
        }
        if (Number.isNaN(value)) {
            error = 'Favor ingresa un valor valido.';
            setErrorMessage(error);
            return false
        }
        setErrorMessage(null);
        return true;
      }

    const handlerSubmit = (e: any) => {
        e.preventDefault();
        if (validateField(billModal.name) && validateFieldNumber(billModal.payDay)){
            props.onSubmitModal(billModal);
        }
      }

  return (
    <>
      <Modal
        isOpen={props.activate}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={styles}
        contentLabel="Bill Modal"
      >
        <div className='row'>
          <h2 className='col-9' ref={(_subtitle) => (subtitle = _subtitle)}>
            {props.edit ? 'Actualizar' : 'Agregar'}
          </h2>
          <Button 
            class='col-2 btn btn-info'
            onClick={closeModal}
            text='X'
            />
        </div>
        <h3>Servicio</h3>
        <form onSubmit={handlerSubmit} className='form-group'>
          <label htmlFor='name'>Nombre del servicio</label>
          <input
            className='form-control mb-3'
            type='text'
            name='name'
            id='name'
            onChange={handlerChange}
            value={billModal.name}
          />
          <label htmlFor='payDay'>Dia de pago</label>
          <input
            className='form-control mb-3'
            type="number"
            name='payDay'
            id='payDay'
            onChange={handlerChange}
            value={billModal.payDay.toString()}
          />
          <br />
          
        {
          errorMessage != null &&
          <p className='errorMessage'>
            {errorMessage}
          </p>
        }
          <button
            type='submit'
            className='btn btn-primary'>Guardar</button>
        </form>
      </Modal>
    </>
  )
}