import React, {useState} from "react";
import "../../styles/modal.css";

const AssetTable = (props) => {
  const {assets} = props;

  return (
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Nombre</th>
              <th className="text-left">Descripción</th>
              <th className="text-left">Estatus</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index}>
                <th className="text-left">{asset.name}</th>
                <th className="text-left">{asset.description}</th>
                {asset.status === true ? (
                  <th className="text-left">Activo</th>
                ): <th className="text-left">Desactivado</th>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default AssetTable;
