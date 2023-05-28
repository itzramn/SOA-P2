import React, {useState} from "react";
import EmployeeTable from "./employee/EmployeeTable";
import ModalContainer from "./employee/ModalContainer";

const ASSETS = [
  {id: 0, name: "Opcion 1"},
  {id: 1, name: "Opcion 2"},
  {id: 2, name: "Opcion 3"},
];

const EMPLOYEES = [
  {id: 0, name: "Diego", assets: [ASSETS[0], ASSETS[2]]},
  {id: 1, name: "Itzel", assets: [ASSETS[1], ASSETS[0]]},
  {id: 2, name: "Itzdi", assets: [ASSETS[2], ASSETS[1]]},
];

const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [assets, setAssets] = useState(ASSETS);
  const [newEmployee, setNewEmployee] = useState({});
  const [selectedAssetId, setSelectedAssetId] = useState(0);
  const [newName, setNewName] = useState(undefined);

  const handleDeleteAsset = (selectedAssetId) => {
    const employeeAssetsIds = newEmployee.assetsIds;
    const filteredAssetsIds = employeeAssetsIds.filter(
      (employeeAssetId) => employeeAssetId !== selectedAssetId
    );
    //Accede al estado anterior ...prev
    //Accede al estado actual ...new

    //La funcion felcha seria como un return y el valor devuelto (el que se le pasa a set)
    //es un objeto con la copia del estado anterior y la propiedad modificada
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      assetsIds: filteredAssetsIds,
    }));
  };

  const handleAddAsset = async (selectedAssetId) => {
    if (selectedAssetId === -1) return;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee, //Copia del objeto
      assetsIds: prevEmployee.assetsIds //Modificas la propiedad del objeto
        ? [...prevEmployee.assetsIds, selectedAssetId]
        : [selectedAssetId], //array del objeto
    }));
  };

  const handleEditEmployeeName = (newName) => {
    setNewName(newName);
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      name: newName,
    }));
  };

  const handleCreateEmployee = (newEmployee) => {
    console.log(newEmployee);
  };

  const findAssetName = (selectedAssetId) => {
    const asset = ASSETS.find((asset) => asset.id === selectedAssetId);
    return asset.name;
  };

  // async function getEmployee() {}

  // async function getOptionsSelect() {}

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseShowModal = () => {
    setShowModal(false);
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
        <EmployeeTable employees={employees} assets={assets} />
      </div>
      {showModal && (
        <ModalContainer
          onClose={handleCloseShowModal}
          onSucces={() => handleCreateEmployee(newEmployee)}
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
                value={newName}
                onChange={(e) => handleEditEmployeeName(e.target.value)}
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
            onClick={() => handleAddAsset(selectedAssetId)}
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
              {newEmployee?.assets?.map((assetId) => (
                <tr key={assetId}>
                  <th className="text-left">{findAssetName(assetId)}</th>
                  <th className="text-left">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => handleDeleteAsset(assetId)}
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
    </React.Fragment>
  );
};

export default Employee;
