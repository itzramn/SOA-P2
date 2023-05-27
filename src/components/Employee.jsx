import React, {useState} from "react";
import EmployeeTable from "./employee/EmployeeTable";
import ModalContainer from "./employee/ModalContainer";

const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [options, setOptions] = useState([]);

  const Opciones = [
    {id: 0, nombre: "Opcion 1"},
    {id: 1, nombre: "Opcion 3"},
    {id: 2, nombre: "Opcion 4"},
  ];

  const Empleados = [
    {id: 0, nombre: "Diego"},
    {id: 1, nombre: "Itzel"},
    {id: 2, nombre: "Itzdi"},
  ];

  async function getEmployee() {}

  async function getOptionSelect() {}

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseShowModal = () => {
    setShowModal(false);
  };

  const handleCreateEmployee = () => {
    console.log();
  };

  return (
    <React.Fragment>
      <div className="container" style={{marginTop: "2rem"}}>
        <div className="row">
          <div className="col">
            <h3>Empleados</h3>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleShowModal}
            >
              Nuevo
            </button>
          </div>
        </div>
        <EmployeeTable
          employees={Empleados}
          options={Opciones}
          setOptions={setOptions}
        />
      </div>
      {showModal && (
        <ModalContainer
          onClose={handleCloseShowModal}
          onSucces={handleCreateEmployee}
          options={Opciones}
          selectedItem={""}
        ></ModalContainer>
      )}
    </React.Fragment>
  );
};

export default Employee;
