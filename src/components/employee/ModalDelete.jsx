const ModalDelete = (props) => {
  const {onClose, onDelete} = props;
  return (
    <div className="modalTableStyles">
      <div className="modalContentStyles">
        <div className="full row align-center justify-center">
          <p className="text-center color-black font-huge weight-bold">
            ¿Está seguro que desea eliminar al empleado?
          </p>
        </div>
        <div className="modalFooterStyles">
          <button className="btn btn-primary" type="button" onClick={onClose} style={{marginRight: "10px"}}>
            Cerrar
          </button>
          <button className="btn btn-primary" type="button" onClick={onDelete}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
