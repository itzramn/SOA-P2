import React, {useState} from "react";

const ModalContainer = (props) => {
  const {onClose, onSucces, children, options, selectedItem} = props;

  const [item, setItem] = useState(selectedItem)

  return (
    <div className="modalTableStyles">
      <div className="modalContentStyles">
        <div className="input-form-content row full">
          <div className="label-normal">
            <p>
              <b>Nombre:</b>
            </p>
          </div>
          <div className="column full">
            <input
              className="form-control"
              type="text"
              placeholder="Default input"
              aria-label="default input example"
              value={item.nombre}
              onChange={(event) => setItem(event.target.value)}
            />
          </div>
        </div>
        <div style={{height: "10px"}}></div>
        <select className="form-select">
          {options.map((item, index) => (
            <option value={item.id} key={index}>{item.nombre}</option>
          ))}
        </select>
        {children}
        <div className="modalFooterStyles">
          <button
            className="btn btn-primary"
            type="button"
            onClick={onClose}
            style={{marginRight: "10px"}}
          >
            Cancelar
          </button>
          <button className="btn btn-primary" type="button" onClick={() => onSucces()}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
