import React, {useState} from "react";
import moment from "moment";
import "../../styles/modal.css";
import ModalContainer from "./ModalContainer";
import {deleteEmployee} from "../../api/employee.api";
// import ModalDelete from "./ModalDelete";

const EmployeeTable = (props) => {
  const {employees = [], assets = [], fetchEmployees} = props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [editEmployee, setEditEmployee] = useState({});
//   const [selectedAssetId, setSelectedAssetId] = useState(0);
//   const [editReleaseDate, setEditReleaseDate] = useState("");
//   const [editDeliveryDate, setEditDeliveryDate] = useState("");
  const [addAsset, setAddAsset] = useState([]);

  //   selectedAssetId, newReleaseDate, newDeliveryDate

  const handleDeleteAsset = (employeeId, assetId) => {
    console.log(employeeId, assetId);
  };

  const handleAddAssetField = (field, value, employeeId) => {
   console.log(value)
   setAddAsset((prevEmployee) => [
      ...prevEmployee,
      {
        employeeId: employeeId,
        [field]: value,
      },
    ]);
  };

  const handleAddAsset = (addAsset) => {
   console.log(addAsset)
   if (!addAsset.assetId || addAsset.assetId === -1 || !addAsset.releseDate || !addAsset.deliveryDate) {
      return;
    }
   console.log(addAsset);
  };

  const handleEditEmployeeField = (field, value, employeeId) => {
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      id: employeeId,
      [field]: value,
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
  const handleEditEmployee = (editEmployee) => {
    console.log(editEmployee);
    setShowEditModal(false);
  };
  //ELIMINAR
  const handleDeleteEmploye = async (employeeId) => {
    await deleteEmployee(employeeId);
    fetchEmployees();
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
            {employees?.map((employee, index) => (
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
          onSucces={() => handleEditEmployee(editEmployee)}
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
                  typeof editEmployee.name === "undefined"
                    ? selectedEmployee.name
                    : editEmployee.name
                }
                onChange={(e) =>
                  handleEditEmployeeField(
                    "name",
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
                  typeof editEmployee.lastName === "undefined"
                    ? selectedEmployee.lastName
                    : editEmployee.lastName
                }
                onChange={(e) =>
                  handleEditEmployeeField(
                    "lastName",
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
                  typeof editEmployee.curp === "undefined"
                    ? selectedEmployee.curp
                    : editEmployee.curp
                }
                onChange={(e) =>
                  handleEditEmployeeField(
                    "curp",
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
                  typeof editEmployee.birthDate === "undefined"
                    ? moment(selectedEmployee.birthDate).format("YYYY-MM-DD")
                    : editEmployee.birthDate
                }
                onChange={(e) =>
                  handleEditEmployeeField(
                    "birthDate",
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
                  typeof editEmployee.email === "undefined"
                    ? selectedEmployee.email
                    : editEmployee.email
                }
                onChange={(e) =>
                  handleEditEmployeeField(
                    "email",
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
            onChange={(e) => handleAddAssetField('assetId', parseInt(e.target.value), selectedEmployee.employeeId)}
            value={addAsset.id || -1}
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
          <div style={{height: "10px"}}></div>
          <div className="row">
            <div className="col-form-label col">
              <p>
                <b>Liberacion:</b>
              </p>
            </div>
            <div className="col">
              <input
                className="form-control"
                type="date"
                value={addAsset.releseDate }
                onChange={(e) => handleAddAssetField('releseDate', e.target.value, selectedEmployee.employeeId)}
              />
            </div>
            <div className="col-form-label col">
              <p>
                <b>Entrega:</b>
              </p>
            </div>
            <div className="col">
              <input
                className="form-control"
                type="date"
                value={addAsset.deliveryDate }
                onChange={(e) => handleAddAssetField('deliveryDate', e.target.value, selectedEmployee.employeeId)}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            style={{marginRight: "10px"}}
            onClick={() => handleAddAsset(addAsset)}
          >
            Añadir
          </button>
          <table className="table">
            <thead>
              <tr>
                <th className="text-left">Actvos</th>
                <th className="text-left">Asignación</th>
                <th className="text-left">Liberación</th>
                <th className="text-left">Entrega</th>
                <th className="text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee?.assets?.map((asset) => (
                <tr key={asset.id}>
                  <th className="text-left">{asset.name}</th>
                  <th className="text-left">
                    {moment(asset.assignmentDate).format("DD/MM/YYYY")}
                  </th>
                  <th className="text-left">
                    {moment(asset.releaseDate).format("DD/MM/YYYY")}
                  </th>
                  <th className="text-left">
                    {moment(asset.deliveryDate).format("DD/MM/YYYY")}
                  </th>
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
