import React from 'react'
import './Modal.scss';
export default function Modal(props) {
    return (
        <div className="modal-parent">
           <div className="modal-child">
            {props.children}
           </div>
        </div>
    )
}
