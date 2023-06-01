import React, {useState} from "react";
import "../../styles/modal.css";
import {deleteAsset} from "../../api/asset.api";
import ModalContainer from "../employee/ModalContainer";

const AssetTable = (props) => {
  const {assets, fetchAssets} = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState({});
  
  const handleShowDeleteModal = (asset) => {
    setShowDeleteModal(true);
    setSelectedAsset(asset);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleSDeleteAsset = async (assetId) => {
    await deleteAsset(assetId);
    fetchAssets();
    setShowDeleteModal(false);
  }

  return (
    <React.Fragment>
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Nombre</th>
              <th className="text-left">Descripción</th>
              <th className="text-left">Estatus</th>
              <th className="text-left">Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index}>
                <th className="text-left">{asset.name}</th>
                <th className="text-left">{asset.description}</th>
                {asset.status === true ? (
                  <th className="text-left">Disponible</th>
                ): <th className="text-left">Ocupado</th>}
                <td className="text-left">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleShowDeleteModal(asset)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <ModalContainer
          onClose={handleCloseDeleteModal}
          onSucces={() => handleSDeleteAsset(selectedAsset.id)}
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

export default AssetTable;
