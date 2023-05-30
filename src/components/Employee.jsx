import React, { useEffect, useState } from 'react';
import moment from 'moment';
import EmployeeTable from './employee/EmployeeTable';
import ModalContainer from './employee/ModalContainer';
import { getEmployees } from '../api/employee.api';
import { getAssets } from '../api/asset.api';

/* const ASSETS = [
   { id: 0, name: 'Opcion 1', description: 'descripcion 1', status: true },
   { id: 1, name: 'Opcion 2', description: 'Descripcion 2', status: false },
   { id: 2, name: 'Opcion 3', description: 'descripcion 3', status: true },
]; */

/* const EMPLOYEES = [
   {
      employeeId: 1,
      personId: 2,
      employeeNumber: 7,
      entryDate: '2023-07-31T00:00:00',
      name: 'Diego',
      lastName: 'Gutiérrez',
      curp: 'GUCD010528HQRTTGA7',
      birthDate: '2001-05-28T00:00:00',
      email: 'diegogutcat28@gmail.com',
      assets: [
         {
            id: 1,
            name: 'MacBook Air',
            description: 'Laptop Apple',
            status: true,
            assignmentDate: '2023-05-02T00:00:00',
            releaseDate: '2023-05-17T00:00:00',
            deliveryDate: '2023-05-16T00:00:00',
         },
         {
            id: 3,
            name: 'Lapicero',
            description: 'Lapicero de juntas',
            status: true,
            assignmentDate: '2023-05-02T00:00:00',
            releaseDate: '2023-05-17T00:00:00',
            deliveryDate: '2023-05-16T00:00:00',
         },
      ],
   },
   {
      employeeId: 2,
      personId: 3,
      employeeNumber: 18,
      entryDate: '2026-12-10T00:00:00',
      name: 'Itzel',
      lastName: 'Ramon',
      curp: 'RAAI011218MQRLTA0',
      birthDate: '2001-12-18T00:00:00',
      email: 'itzelramonf@gmail.com',
      assets: [
         {
            id: 1,
            name: 'MacBook Air',
            description: 'Laptop Apple',
            status: true,
            assignmentDate: '2023-06-02T00:00:00',
            releaseDate: '2023-06-17T00:00:00',
            deliveryDate: '2023-06-16T00:00:00',
         },
         {
            id: 3,
            name: 'Lapicero',
            description: 'Lapicero de juntas',
            status: true,
            assignmentDate: '2023-06-02T00:00:00',
            releaseDate: '2023-06-17T00:00:00',
            deliveryDate: '2023-06-16T00:00:00',
         },
      ],
   },
]; */

const Employee = () => {
   const [showModal, setShowModal] = useState(false);
   const [employees, setEmployees] = useState([]);
   const [assets, setAssets] = useState([]);
   const [newEmployee, setNewEmployee] = useState({});
   const [newName, setNewName] = useState(undefined);
   const [newLastName, setNewLastName] = useState(undefined);
   const [newCurp, setNewCurp] = useState(undefined);
   const [newBirthDate, setNewBirthDate] = useState(undefined);
   const [newEmail, setNewEmail] = useState(undefined);
   const [selectedAssetId, setSelectedAssetId] = useState(0);
   const [newReleaseDate, setNewReleaseDate] = useState('');
   const [newDeliveryDate, setNewDeliveryDate] = useState('');

   const handleAddAsset = async (
      selectedAssetId,
      newReleaseDate,
      newDeliveryDate
   ) => {
      if (
         selectedAssetId === -1 ||
         newDeliveryDate === '' ||
         newDeliveryDate === ''
      )
         return;
      setNewEmployee(prevEmployee => ({
         ...prevEmployee,
         assetsIds: [
            ...(prevEmployee.assetsIds || []), //verifica si prevEmployee.assetsIds existe y tiene un valor
            {
               id: selectedAssetId,
               releaseDate: moment
                  .utc(newReleaseDate)
                  .format('YYYY-MM-DD[T]HH:mm:ss'),
               deliveryDate: moment
                  .utc(newDeliveryDate)
                  .format('YYYY-MM-DD[T]HH:mm:ss'),
            },
         ],
      }));
   };

   const handleDeleteAsset = selectedAssetId => {
      const employeeAssetsIds = newEmployee.assetsIds;
      const filteredAssetsIds = employeeAssetsIds.filter(
         employeeAssetId => employeeAssetId !== selectedAssetId
      );
      //Accede al estado anterior ...prev
      //Accede al estado actual ...new

      //La funcion felcha seria como un return y el valor devuelto (el que se le pasa a set)
      //es un objeto con la copia del estado anterior y la propiedad modificada
      setNewEmployee(prevEmployee => ({
         ...prevEmployee,
         assetsIds: filteredAssetsIds,
      }));
   };

   const handleEditEmployeeName = newName => {
      setNewName(newName);
      setNewEmployee(prevEmployee => ({
         ...prevEmployee,
         name: newName,
      }));
   };

   const handleEditEmployeeLastName = newLastName => {
      setNewLastName(newLastName);
      setNewEmployee(prevEmployee => ({
         ...prevEmployee,
         lastName: newLastName,
      }));
   };

   const handleEditEmployeeCurp = newCurp => {
      setNewCurp(newCurp);
      setNewEmployee(prevEmployee => ({
         ...prevEmployee,
         curp: newCurp,
      }));
   };

   const handleEditEmployeeBirthDate = newBirthDate => {
      setNewBirthDate(newBirthDate);
      setNewEmployee(prevEmployee => ({
         ...prevEmployee,
         birthDate: moment.utc(newBirthDate).format('YYYY-MM-DD[T]HH:mm:ss'),
      }));
   };

   const handleEditEmployeeEmail = newEmail => {
      setNewEmail(newEmail);
      setNewEmployee(prevEmployee => ({
         ...prevEmployee,
         email: newEmail,
      }));
   };

   const handleCreateEmployee = newEmployee => {
      console.log(newEmployee);
   };

   const findAssetName = selectedAssetId => {
      const asset = assets.find(asset => asset.id === selectedAssetId);
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

   const fetchEmployees = async () => {
      const employees = await getEmployees();
      setEmployees(employees);
   };

   const fetchAssets = async status => {
      const assets = await getAssets(status);
      setAssets(assets);
   };

   useEffect(() => {
      fetchEmployees();
      fetchAssets(true);
   }, []);

   return (
      <React.Fragment>
         <div className="container" style={{ marginTop: '2rem' }}>
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
            />
         </div>
         {showModal && (
            <ModalContainer
               onClose={handleCloseShowModal}
               onSucces={() => handleCreateEmployee(newEmployee)}
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
                        value={newName}
                        onChange={e => handleEditEmployeeName(e.target.value)}
                     />
                  </div>
               </div>
               <div style={{ height: '10px' }}></div>
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
                        value={newLastName}
                        onChange={e =>
                           handleEditEmployeeLastName(e.target.value)
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
                        value={newEmployee.curp}
                        onChange={e => handleEditEmployeeCurp(e.target.value)}
                     />
                  </div>
               </div>
               <div style={{ height: '10px' }}></div>
               <div className="row">
                  <div className="col-form-label col-sm-3">
                     <p>
                        <b>Fecha de nacimiento:</b>
                     </p>
                  </div>
                  <div className="col-sm-9">
                     <input
                        className="form-control"
                        type="date"
                        placeholder="Escribe un nombre"
                        value={newBirthDate}
                        onChange={e =>
                           handleEditEmployeeBirthDate(e.target.value)
                        }
                     />
                  </div>
               </div>
               <div style={{ height: '10px' }}></div>
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
                        value={newEmail}
                        onChange={e => handleEditEmployeeEmail(e.target.value)}
                     />
                  </div>
               </div>
               <div style={{ height: '10px' }}></div>
               <select
                  className="form-select"
                  onChange={e => setSelectedAssetId(parseInt(e.target.value))}
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
               <div style={{ height: '10px' }}></div>
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
                        value={newReleaseDate}
                        onChange={e => setNewReleaseDate(e.target.value)}
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
                        value={newDeliveryDate}
                        onChange={e => setNewDeliveryDate(e.target.value)}
                     />
                  </div>
               </div>
               <button
                  className="btn btn-primary"
                  type="button"
                  style={{ marginRight: '10px' }}
                  onClick={() =>
                     handleAddAsset(
                        selectedAssetId,
                        newReleaseDate,
                        newDeliveryDate
                     )
                  }
               >
                  Añadir
               </button>
               <table className="table">
                  <thead>
                     <tr>
                        <th className="text-left">Activos</th>
                        <th className="text-left">Asignación</th>
                        <th className="text-left">Liberación</th>
                        <th className="text-left">Entrega</th>
                        <th className="text-left">Eliminar</th>
                     </tr>
                  </thead>
                  <tbody>
                     {newEmployee?.assets?.map(assetId => (
                        <tr key={assetId}>
                           <th className="text-left">
                              {findAssetName(assetId)}
                           </th>
                           <th className="text-left">
                              <button
                                 className="btn btn-primary"
                                 type="button"
                                 onClick={() => handleDeleteAsset(assetId)}
                                 style={{ marginRight: '10px' }}
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
