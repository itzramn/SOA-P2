import React, {useState} from "react";
import "../../styles/modal.css";
import ModalContainer from "./ModalContainer";
import ModalDelete from "./ModalDelete";

const EmployeeTable = (props) => {
  const {employees, options} = props;

  const [filteredEmpluee, setFilteredEmployee] = useState(employees);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  //Modal Editar
  const handleShowEditModal = (item) => {
    setShowEditModal(true);
    console.log(item)
    setSelectedItem(item);
  };
  //Cerrar Modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  //Modal Eliminar
  const handleShowDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedItem(item);
  };
//Cerrar Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  //EDITAR
  const handleEditEmploye = () => {
    setShowEditModal(false);
    alert("Editado");
  };
//ELIMINAR
  const handleDeleteEmploye = () => {
    setShowDeleteModal(false);
    alert("Eliminado");
  };

  return (
    <React.Fragment>
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Nombre</th>
              <th className="text-left">Editar</th>
              <th className="text-left">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmpluee.map((item, index) => (
              <tr key={index}>
                <th className="text-left">{item.nombre}</th>
                <td className="text-left">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleShowEditModal(item)}
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleShowDeleteModal(item)}
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
          onSucces={handleEditEmploye}
          options={options}
          selectedItem={selectedItem}
        ></ModalContainer>
      )}
      {showDeleteModal && (
        <ModalDelete
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteEmploye}
          selectedItem={selectedItem}
        />
      )}
    </React.Fragment>
  );
};

export default EmployeeTable;
