import React, { useEffect, useState } from 'react';
import AssetTable from './asset/AssetTable';
import ModalContainer from './employee/ModalContainer';
import { createAsset, getAssets } from '../api/asset.api';

const Asset = () => {
   const [showModal, setShowModal] = useState(false);
   const [assets, setAssets] = useState([]);
   const [newAsset, setNewAsset] = useState({});

   const handleEditNewAsset = (field, value) => {
      setNewAsset((prevEmployee) => ({
         ...prevEmployee,
         [field]: value,
      }));
   };

   const handleCreateAsset = async newAsset => {
      await createAsset(newAsset);
      fetchAssets();
      setShowModal(false);
      setNewAsset({});
   };

   const handleShowModal = () => {
      setNewAsset({});
      setShowModal(true);
   };

   const handleCloseShowModal = () => {
      setShowModal(false);
      setNewAsset({})
   };

   const fetchAssets = async status => {
      const assets = await getAssets(status);
      setAssets(assets);
   };
   useEffect(() => {
      fetchAssets();
   }, []);

   // const getAsset = () => {}

   return (
      <React.Fragment>
         <div className="container" style={{ marginTop: '2rem' }}>
            <div className="row">
               <div className="col">
                  <h3>Activos</h3>
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
            <AssetTable assets={assets}
            fetchAssets={fetchAssets}
             />
         </div>

         {showModal && (
            <ModalContainer
               onClose={handleCloseShowModal}
               onSucces={() => handleCreateAsset(newAsset)}
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
                        value={newAsset.name}
                        onChange={e => handleEditNewAsset("name", e.target.value)}
                     />
                  </div>
               </div>
               <div className="input-form-content row full">
                  <div className="label-normal">
                     <p>
                        <b>Descripcion</b>
                     </p>
                  </div>
                  <div className="column full">
                     <input
                        className="form-control"
                        type="text"
                        placeholder="Escribe un nombre"
                        value={newAsset.description}
                        onChange={e =>
                           handleEditNewAsset("description", e.target.value)
                        }
                     />
                  </div>
               </div>
            </ModalContainer>
         )}
      </React.Fragment>
   );
};

export default Asset;
