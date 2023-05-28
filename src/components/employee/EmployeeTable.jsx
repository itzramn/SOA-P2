import React, {useState} from "react";
import moment from 'moment';
import "../../styles/modal.css";
import ModalContainer from "./ModalContainer";
import ModalDelete from "./ModalDelete";

const EmployeeTable = (props) => {
  const {employees, assets} = props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [selectedAssetId, setSelectedAssetId] = useState(0);
  const [newName, setNewName] = useState(undefined);

  const handleDeleteAsset = (assetId, employeeId) => {
    console.log("IdAsset:", assetId, "idEmployee:", employeeId);
  };

  const handleAddAsset = async (assetId, employeeId) => {
    if (assetId === -1) return;
    console.log("IdAsset:", assetId, "idEmployee:", employeeId);
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

  //Modal Eliminar
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  //Cerrar Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  //EDITAR
  const handleEditEmployeName = (newName, employeeId) => {
    console.log("newName:", newName, "id:", employeeId);
    setShowEditModal(false);
  };
  //ELIMINAR
  const handleDeleteEmploye = () => {
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
                <th className="text-left">{moment(employee.birthDate).format('DD/MM/YYYY')}</th>
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
                    onClick={handleShowDeleteModal}
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
          onSucces={() => handleEditEmployeName(newName, selectedEmployee.id)}
        >
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
                placeholder="Escribe un nombre"
                value={
                  typeof newName === "undefined"
                    ? selectedEmployee.name
                    : newName
                }
                onChange={(e) => setNewName(e.target.value)}
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
            onClick={() => handleAddAsset(selectedAssetId, selectedEmployee.id)}
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
                        handleDeleteAsset(asset.id, selectedEmployee.id)
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
        <ModalDelete
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteEmploye}
        />
      )}
    </React.Fragment>
  );
};

export default EmployeeTable;
