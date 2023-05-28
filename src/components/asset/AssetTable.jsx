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
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index}>
                <th className="text-left">{asset.name}</th>
                <th className="text-left">{asset.description}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default AssetTable;
