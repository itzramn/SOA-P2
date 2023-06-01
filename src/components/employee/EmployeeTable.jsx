import React, {useState} from "react";
import moment from "moment";
import "../../styles/modal.css";
import ModalContainer from "./ModalContainer";
import {editEmployeesField, deleteEmployee} from "../../api/employee.api";
import {addAssetToEmployee, deleteAssetFromEmployee, releaseAsset} from "../../api/asset.api";

const EmployeeTable = (props) => {
  const {employees = [], assets = [], fetchEmployees, fetchAssets} = props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [editEmployee, setEditEmployee] = useState({});
  const [selectedAsset, setSelectedAsset] = useState({});

  const clearModalStates = () => {
    setSelectedEmployee({});
    setEditEmployee({});
  };

  const handleShowEditModal = (employee) => {
    setShowEditModal(true);
    setSelectedEmployee(employee);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    clearModalStates();
  };
  //////////////////////////////////////////////////
  const handleShowDeleteModal = (employee) => {
    setShowDeleteModal(true);
    setSelectedEmployee(employee);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    clearModalStates();
  };

  //////////////////////////////////////////////////////
  const handleSelectAsset = (field, value, employeeId) => {
    setSelectedAsset((prevEmployee) => ({
      ...prevEmployee,
      employeeId: employeeId,
      [field]: value,
    }));
  };

  const findName = (assetId) => {
    const asset = assets.find((asset) => asset.id === assetId);
    return asset?.name || "";
  };

  const handleAddAsset = async (addAsset) => {
    if (
      !addAsset.assetId ||
      addAsset.assetId === -1 ||
      !addAsset.deliveryDate
    ) {
      return;
    }
    setSelectedEmployee((prevEmployee) => ({
      ...prevEmployee,
      assets: [
        ...prevEmployee.assets,
        {
          ...addAsset,
          name: findName(addAsset.assetId),
        },
      ],
    }));

    await addAssetToEmployee([addAsset]);
    setSelectedAsset((...prevAsset)=>({
      ...prevAsset,
      assetId: 0
    }));
    fetchAssets(true);
    fetchEmployees();
  };

  const handleDeleteAsset = async (employeeId, assetId) => {
    await deleteAssetFromEmployee(employeeId, assetId);
    const filteredAssetsIds = selectedEmployee.assets.filter(
      (employeeAsset) => employeeAsset.id !== assetId
    );
    setSelectedEmployee((prevEmployee) => ({
      ...prevEmployee,
      assets: filteredAssetsIds,
    }));
    setSelectedAsset((...prevAsset)=>({
      ...prevAsset,
      assetId: 0
    }));
    fetchEmployees();
    fetchAssets(true);
  };

  const handleEditEmployeeField = (field, value) => {
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      [field]: value,
    }));
  };

  const handleEditEmployee = async (employeeId, editEmployee) => {
    await editEmployeesField(employeeId, editEmployee);
    fetchEmployees();
    setShowEditModal(false);
  };

  //ELIMINAR
  const handleDeleteEmploye = async (employeeId) => {
    await deleteEmployee(employeeId);
    fetchEmployees();
    fetchAssets();
    setShowDeleteModal(false);
  };

  const handleAssetRelease = async (assetId) => {
    await releaseAsset(assetId);
    fetchEmployees();
    fetchAssets(true);
  }

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
          onSucces={() =>
            handleEditEmployee(selectedEmployee.employeeId, editEmployee)
          }
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
                  handleEditEmployeeField("name", e.target.value)
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
                  handleEditEmployeeField("lastName", e.target.value)
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
                  handleEditEmployeeField("curp", e.target.value)
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
                  handleEditEmployeeField("birthDate", e.target.value)
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
                  handleEditEmployeeField("email", e.target.value)
                }
              />
            </div>
          </div>
          <select
            className="form-select"
            onChange={(e) =>
              handleSelectAsset(
                "assetId",
                parseInt(e.target.value),
                selectedEmployee.employeeId
              )
            }
            value={selectedAsset.assetId || -1}
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
                <b>Entrega:</b>
              </p>
            </div>
            <div className="col">
              <input
                className="form-control"
                type="date"
                value={selectedAsset.deliveryDate || ""}
                onChange={(e) =>
                  handleSelectAsset(
                    "deliveryDate",
                    e.target.value,
                    selectedEmployee.employeeId
                  )
                }
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            style={{marginRight: "10px"}}
            onClick={() => handleAddAsset(selectedAsset)}
          >
            Añadir
          </button>
          <table className="table">
            <thead>
              <tr>
                <th className="text-left">Activos</th>
                <th className="text-left">Asignación</th>
                <th className="text-left">Entrega</th>
                <th className="text-left">Liberación</th>
                <th className="text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee?.assets?.map((asset) => (
                <tr key={asset.id}>
                  {console.log(asset)}
                  <th className="text-left">{asset.name}</th>
                  <th className="text-left">
                    {moment(asset.assignmentDate).format("DD/MM/YYYY")}
                  </th>
                  <th className="text-left">
                    {moment(asset.deliveryDate).format("DD/MM/YYYY")}
                  </th>  
                  {!asset.releaseDate ?  
                  <th className="text-left">
                  <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() =>
                        handleAssetRelease(asset.id)
                      }
                      style={{marginRight: "10px"}}
                    >
                      Liberar
                    </button>
                </th>
                  : <th className="text-left">
                    {moment(asset.releaseDate).format("DD/MM/YYYY")}
                  </th>}
                  
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
