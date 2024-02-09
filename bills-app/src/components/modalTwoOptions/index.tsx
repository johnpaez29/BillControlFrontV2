import Modal from 'react-modal';
import { Button } from '../Button';

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

type ModalTwoOptionsProps = {
    activate : boolean,
    onSubmitOne : (arg0: any) => void
    onSubmitTwo : (arg0: any) => void
    onCloseModal : () => void
    text : string
    textSubmitOne : string
    textSubmitTwo : string
    value : string
}

let subtitle : any;
export function ModalTwoOptions (props : ModalTwoOptionsProps) {

    const afterOpenModal = () => {
        subtitle.style.color = 'black';
    }


    const closeModal = () => {
        props.onCloseModal();
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
            {'Información'}
          </h2>
          <Button 
            class='col-2 btn btn-info'
            onClick={closeModal}
            text='X'
            />
        </div>
        <hr></hr>
        <br></br>
        <p>{props.text}</p>
        <br></br>
        <div className='row'>
          <Button
            class='col-5 btn btn-info'
            onClick={props.onSubmitOne}
            text={props.textSubmitOne}
            value={props.value}
             />
             <div className='col-1'></div>
        <Button
            class='col-5 btn btn-info'
            onClick={props.onSubmitTwo}
            text={props.textSubmitTwo}
            value={props.value}
            />
        </div>
      </Modal>
    </>
  )
}