import Modal from 'react-modal';
import { SpinnerDotted } from 'spinners-react';

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
    activate : boolean
}


let subtitle : any;
export const ModalSpinner = (props : ModalProps) => {
  
    const afterOpenModal = () => {
    subtitle.style.color = 'black';
  }


  return (
    <>
      <Modal
        isOpen={props.activate}
        onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={styles}
        contentLabel="Spinner Modal"
      >
          <h2 className='col' ref={(_subtitle) => (subtitle = _subtitle)}>Cargando...</h2>
          <SpinnerDotted
            size={50}
            thickness={100}
            speed={100}
            color='#36ad47'
            className="mx-5 my-4"
            />
        <SpinnerDotted enabled={false} />
      </Modal>
    </>
  )
}