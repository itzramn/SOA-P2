const ModalContainer = (props) => {
  const {onClose, onSucces, children} = props;

  return (
    <div className="modalTableStyles">
      <div className="modalContentStyles">
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
          <button className="btn btn-primary" type="button" onClick={onSucces}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
