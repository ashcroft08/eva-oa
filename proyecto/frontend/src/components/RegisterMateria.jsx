import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardHeader,
  CListGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from "@coreui/react";
import { FaPlus } from "react-icons/fa";
import ListItem from "./ui/ListItem";

export function RegisterMateria() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [deleteSubject, setDeleteSubject] = useState(null);

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      console.log(`Nueva materia: ${newSubjectName}`);
      setNewSubjectName("");
      setShowAddModal(false);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteSubject) {
      console.log(`Eliminando definitivamente: ${deleteSubject}`);
      setShowDeleteModal(false);
      setDeleteSubject(null);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <CCard style={{ width: "18rem" }}>
          <CCardHeader className="fw-bold text-center d-flex justify-content-between align-items-center">
            Primero de Básica
            <CButton color="light" onClick={() => setShowAddModal(true)}>
              <FaPlus style={{ color: "green" }} />
            </CButton>
          </CCardHeader>
          <CListGroup flush>
            <ListItem
              title="Lengua y Literatura"
              onEdit={() => handleEdit("Lengua y Literatura")}
              onDelete={() => {
                setDeleteSubject("Lengua y Literatura");
                setShowDeleteModal(true);
              }}
            />
            <ListItem
              title="Matemáticas"
              onEdit={() => handleEdit("Matemáticas")}
              onDelete={() => {
                setDeleteSubject("Matemáticas");
                setShowDeleteModal(true);
              }}
            />
            <ListItem
              title="Ciencias Naturales"
              onEdit={() => handleEdit("Ciencias Naturales")}
              onDelete={() => {
                setDeleteSubject("Ciencias Naturales");
                setShowDeleteModal(true);
              }}
            />
          </CListGroup>
        </CCard>

        {/* Repite el bloque de CCard según sea necesario */}
        <CCard style={{ width: "18rem" }}>
          <CCardHeader className="fw-bold text-center d-flex justify-content-between align-items-center">
            Primero de Básica
            <CButton color="light" onClick={() => setShowAddModal(true)}>
              <FaPlus style={{ color: "green" }} />
            </CButton>
          </CCardHeader>
          <CListGroup flush>
            <ListItem
              title="Lengua y Literatura"
              onEdit={() => handleEdit("Lengua y Literatura")}
              onDelete={() => {
                setDeleteSubject("Lengua y Literatura");
                setShowDeleteModal(true);
              }}
            />
            <ListItem
              title="Matemáticas"
              onEdit={() => handleEdit("Matemáticas")}
              onDelete={() => {
                setDeleteSubject("Matemáticas");
                setShowDeleteModal(true);
              }}
            />
            <ListItem
              title="Ciencias Naturales"
              onEdit={() => handleEdit("Ciencias Naturales")}
              onDelete={() => {
                setDeleteSubject("Ciencias Naturales");
                setShowDeleteModal(true);
              }}
            />
          </CListGroup>
        </CCard>

        <CCard style={{ width: "18rem" }}>
          <CCardHeader className="fw-bold text-center d-flex justify-content-between align-items-center">
            Primero de Básica
            <CButton color="light" onClick={() => setShowAddModal(true)}>
              <FaPlus style={{ color: "green" }} />
            </CButton>
          </CCardHeader>
          <CListGroup flush>
            <ListItem
              title="Lengua y Literatura"
              onEdit={() => handleEdit("Lengua y Literatura")}
              onDelete={() => {
                setDeleteSubject("Lengua y Literatura");
                setShowDeleteModal(true);
              }}
            />
            <ListItem
              title="Matemáticas"
              onEdit={() => handleEdit("Matemáticas")}
              onDelete={() => {
                setDeleteSubject("Matemáticas");
                setShowDeleteModal(true);
              }}
            />
            <ListItem
              title="Ciencias Naturales"
              onEdit={() => handleEdit("Ciencias Naturales")}
              onDelete={() => {
                setDeleteSubject("Ciencias Naturales");
                setShowDeleteModal(true);
              }}
            />
          </CListGroup>
        </CCard>
      </div>

      {/* Modal para agregar materia */}
      <CModal
        backdrop="static"
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <CModalHeader onClose={() => setShowAddModal(false)}>
          <CModalTitle>Agregar Nueva Materia</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            placeholder="Nombre de la materia"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleAddSubject}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para confirmar eliminación */}
      <CModal
        backdrop="static"
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <CModalHeader onClose={() => setShowDeleteModal(false)}>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Estás seguro de eliminar la materia: {deleteSubject}?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleConfirmDelete}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
