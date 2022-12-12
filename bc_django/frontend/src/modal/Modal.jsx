import React from 'react'
import "./modal.css"

const Modal = ({active, setActive, children}) => {
    return (
        <div className ={active ? 'modal__first active': 'modal__first' } onClick={() => setActive(false)}>
            <div className={active ? 'modal__content active': 'modal__content' } onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
};


const ErrorDisplay = ({active, setActive, children}) => {

    if (active)
        return (
           <div className="card" style={{background: "#cf2d16",borderRadius:"15px", height: "50px", marginBottom:"15px"}}>
                    <h6 className="text-uppercase text-sm-center mb-5" style={{marginTop: "15px"}}>
                         {children}
                    </h6>
            </div>
        )
};

{/* <Modal active={modalActive} setActive={setModalActive}> */}
{/*                 <h1> Unable to log in </h1> */}
{/*              </Modal> */}
// export default Modal;
export default ErrorDisplay;

