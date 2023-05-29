import React, {useState} from "react";
import moment from "moment";
import "../../styles/modal.css";
import ModalContainer from "./ModalContainer";
// import ModalDelete from "./ModalDelete";

const EmployeeTable = (props) => {
  const {employees, assets} = props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [edithEmployee, setEditEmployee] = useState({});
  const [editName, setEditName] = useState(undefined);
  const [editLastName, setEditLastName] = useState(undefined);
  const [editCurp, setEditCurp] = useState(undefined);
  const [editBirthDate, setEditBirthDate] = useState(undefined);
  const [editEmail, setEditEmail] = useState(undefined);
  const [selectedAssetId, setSelectedAssetId] = useState(0);

  const handleDeleteAsset = (employeeId, assetId) => {
    console.log(employeeId, assetId);
  };

  const handleAddAsset = async (employeeId, assetId) => {
    if (assetId === -1) return;
    console.log(employeeId, assetId);
  };

  const handleEditEmployeeName = (newName, employeeId) => {
    setEditName(newName);
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      employeeId: employeeId,
      name: newName,
    }));
  };

  const handleEditEmployeeLastName = (newLastName, employeeId) => {
    setEditLastName(newLastName);
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      employeeId: employeeId,
      lastName: newLastName,
    }));
  };

  const handleEditEmployeeCurp = (newCurp, employeeId) => {
    setEditCurp(newCurp);
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      employeeId: employeeId,
      curp: newCurp,
    }));
  };

  const handleEditEmployeeBirthDate = (newBirthDate, employeeId) => {
    setEditBirthDate(newBirthDate);
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      employeeId: employeeId,
      birthDate: moment.utc(newBirthDate).format('YYYY-MM-DD[T]HH:mm:ss')
    }));
  };

  const handleEditEmployeeEmail = (newEmail, employeeId) => {
    setEditEmail(newEmail);
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      employeeId: employeeId,
      email: newEmail,
    }));
  };

  //Modal Editar
  const handleShowEditModal = (employee) => {
    setShowEditModal(true);
    setSelectedEmployee(employee);
  };

  //Cerrar Modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  //////////////////////////////////////////////////
  //Modal Eliminar
  const handleShowDeleteModal = (employee) => {
    setShowDeleteModal(true);
    setSelectedEmployee(employee);
  };
  //Cerrar Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  //EDITAR
  const handleEditEmployeName = (editEmployee) => {
    console.log(editEmployee);
    setShowEditModal(false);
  };
  //ELIMINAR
  const handleDeleteEmploye = (employeeId) => {
    console.log(employeeId);
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Nombre</th>
              <th className="text-left">Apellido</th>
              <th className="text-left">CURP</th>
              <th className="text-left">Fecha de nacimiento</th>
              <th className="text-left">Email</th>
              <th className="text-left">Editar</th>
              <th className="text-left">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <th className="text-left">{employee.name}</th>
                <th className="text-left">{employee.lastName}</th>
                <th className="text-left">{employee.curp}</th>
                <th className="text-left">
                  {moment(employee.birthDate).format("DD/MM/YYYY")}
                </th>
                <th className="text-left">{employee.email}</th>
                <td className="text-left">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleShowEditModal(employee)}
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleShowDeleteModal(employee)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <ModalContainer
          onClose={handleCloseEditModal}
          onSucces={() => handleEditEmployeName(edithEmployee)}
        >
          <div className="row">
            <div className="col-form-label col-sm-3">
              <p>
                <b>Nombre:</b>
              </p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                placeholder="Escribe un nombre"
                value={
                  typeof editName === "undefined"
                    ? selectedEmployee.name
                    : editName
                }
                onChange={(e) =>
                  handleEditEmployeeName(
                    e.target.value,
                    selectedEmployee.employeeId
                  )
                }
              />
            </div>
          </div>
          <div style={{height: "10px"}}></div>
          <div className="row">
            <div className="col-form-label col-sm-3">
              <p>
                <b>Apellido:</b>
              </p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                placeholder="Escribe un nombre"
                value={
                  typeof editLastName === "undefined"
                    ? selectedEmployee.lastName
                    : editLastName
                }
                onChange={(e) =>
                  handleEditEmployeeLastName(
                    e.target.value,
                    selectedEmployee.employeeId
                  )
                }
              />
            </div>
          </div>
          {/* <div style={{height: "10px"}}></div> */}
          <div className="row">
            <div className="col-form-label col-sm-3">
              <p>
                <b>CURP:</b>
              </p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                placeholder="Escribe un nombre"
                value={
                  typeof editCurp === "undefined"
                    ? selectedEmployee.curp
                    : editCurp
                }
                onChange={(e) =>
                  handleEditEmployeeCurp(
                    e.target.value,
                    selectedEmployee.employeeId
                  )
                }
              />
            </div>
          </div>
          <div style={{height: "10px"}}></div>
          <div className="row">
            <div className="col-form-label col-sm-7">
              <p>
                <b>Fecha de nacimiento:</b>
              </p>
            </div>
            <div className="col-sm-5">
              <input
                className="form-control"
                type="date"
                placeholder="Escribe un nombre"
                value={
                  typeof editBirthDate === "undefined"
                    ? moment(selectedEmployee.birthDate).format("YYYY-MM-DD")
                    : editBirthDate
                }
                onChange={(e) =>
                  handleEditEmployeeBirthDate(
                    e.target.value,
                    selectedEmployee.employeeId
                  )
                }
              />
            </div>
          </div>
          <div style={{height: "10px"}}></div>
          <div className="row">
            <div className="col-form-label col-sm-3">
              <p>
                <b>Email:</b>
              </p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="email"
                placeholder="ejemplo@gmail.com"
                value={
                  typeof editEmail === "undefined"
                    ? selectedEmployee.email
                    : editEmail
                }
                onChange={(e) =>
                  handleEditEmployeeEmail(
                    e.target.value,
                    selectedEmployee.employeeId
                  )
                }
              />
            </div>
          </div>
          <div style={{height: "10px"}}></div>
          <select
            className="form-select"
            onChange={(e) => setSelectedAssetId(e.target.value)}
            value={selectedAssetId || -1}
          >
            <option value={-1} disabled>
              Seleccionar
            </option>
            {assets?.map((asset, index) => (
              <option value={asset.id} key={index}>
                {asset.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            type="button"
            style={{marginRight: "10px"}}
            onClick={() =>
              handleAddAsset(
                selectedEmployee.employeeId,
                parseInt(selectedAssetId)
              )
            }
          >
            Añadir
          </button>
          <table className="table">
            <thead>
              <tr>
                <th className="text-left">Actvos</th>
                <th className="text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee?.assets?.map((asset) => (
                <tr key={asset.id}>
                  <th className="text-left">{asset.name}</th>
                  <th className="text-left">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() =>
                        handleDeleteAsset(selectedEmployee.employeeId, asset.id)
                      }
                      style={{marginRight: "10px"}}
                    >
                      Eliminar
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalContainer>
      )}

      {showDeleteModal && (
        <ModalContainer
          onClose={handleCloseDeleteModal}
          onSucces={() => handleDeleteEmploye(selectedEmployee.employeeId)}
        >
          <div className="full row align-center justify-center">
            <p className="text-center color-black font-huge weight-bold">
              ¿Está seguro que desea eliminar al empleado?
            </p>
          </div>
        </ModalContainer>
      )}
    </React.Fragment>
  );
};

export default EmployeeTable;
