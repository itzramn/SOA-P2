import React, {useEffect, useState} from "react";
import moment from "moment";
import EmployeeTable from "./employee/EmployeeTable";
import ModalContainer from "./employee/ModalContainer";
import {getEmployees, createdEmployees} from "../api/employee.api";
import {getAssets} from "../api/asset.api";

const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});
  const [selectedAssetId, setSelectedAssetId] = useState(0);
  const [newDeliveryDate, setNewDeliveryDate] = useState("");

  const handleAddAsset = async (selectedAssetId, newDeliveryDate) => {
    if (selectedAssetId === -1 || newDeliveryDate === "") return;
    const selectedAsset = assets.find((asset) => asset.id === selectedAssetId);
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      assets: [
        ...(prevEmployee.assets || []), //verifica si prevEmployee.assetsIds existe y tiene un valor
        {
          id: selectedAssetId,
          name: selectedAsset ? selectedAsset.name : "",
          deliveryDate: moment
            .utc(newDeliveryDate)
            .format("YYYY-MM-DD[T]HH:mm:ss"),
        },
      ],
    }));
  };

  const handleDeleteAsset = (selectedAssetId) => {
    const filteredAssetsIds = newEmployee.assets.filter(
      (employeeAsset) => employeeAsset.id !== selectedAssetId
    );

    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      assets: filteredAssetsIds,
    }));
  };

  const handleEditNewEmployee = (field, value) => {
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [field]: value,
    }));
  };

  const clearModalStates = () => {
    setNewEmployee({});
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseShowModal = () => {
    setShowModal(false);
    clearModalStates();
  };

  const fetchEmployees = async () => {
    const employees = await getEmployees();
    setEmployees(employees);
  };

  const fetchAssets = async (status) => {
    const assets = await getAssets(status);
    setAssets(assets);
  };

  const handleCreateEmployee = async (newEmployee) => {
    console.log(newEmployee);
    await createdEmployees(newEmployee);
    fetchEmployees();
    fetchAssets(true);
    setShowModal(false);
    clearModalStates();
  };

  useEffect(() => {
    fetchEmployees();
    fetchAssets(true);
  }, []);

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
          employees={employees}
          assets={assets}
          fetchEmployees={fetchEmployees}
          fetchAssets={fetchAssets}
        />
      </div>
      {showModal && (
        <ModalContainer
          onClose={handleCloseShowModal}
          onSucces={() => handleCreateEmployee(newEmployee)}
        >
          <div style={{width: "40rem"}}>
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
                  value={newEmployee.name}
                  onChange={(e) =>
                    handleEditNewEmployee("name", e.target.value)
                  }
                />
              </div>
            </div>
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
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    handleEditNewEmployee("lastName", e.target.value)
                  }
                />
              </div>
            </div>
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
                  value={newEmployee.curp}
                  onChange={(e) =>
                    handleEditNewEmployee("curp", e.target.value)
                  }
                />
              </div>
            </div>
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
                  value={newEmployee.birthDate}
                  onChange={(e) =>
                    handleEditNewEmployee("birthDate", e.target.value)
                  }
                />
              </div>
            </div>
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
                  value={newEmployee.email}
                  onChange={(e) =>
                    handleEditNewEmployee("email", e.target.value)
                  }
                />
              </div>
            </div>
            <select
              className="form-select"
              onChange={(e) => setSelectedAssetId(parseInt(e.target.value))}
              value={selectedAssetId || -1 || ""}
            >
              <option value={-1} disabled>
                Seleccionar
              </option>
              {assets?.map((asset) => (
                <option value={asset.id} key={asset.id}>
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
                  value={newDeliveryDate}
                  onChange={(e) => setNewDeliveryDate(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              style={{marginRight: "10px"}}
              onClick={() => handleAddAsset(selectedAssetId, newDeliveryDate)}
            >
              Añadir
            </button>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-left">Activos</th>
                    <th className="text-left">Entrega</th>
                    <th className="text-left">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {newEmployee?.assets?.map((asset) => (
                    <tr key={asset.id}>
                      <th className="text-left">{asset.name}</th>
                      <th className="text-left">
                        {moment(asset.deliveryDate).format("DD/MM/YYYY")}
                      </th>
                      <th className="text-left">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => handleDeleteAsset(asset.id)}
                          style={{marginRight: "10px"}}
                        >
                          Eliminar
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ModalContainer>
      )}
    </React.Fragment>
  );
};

export default Employee;
