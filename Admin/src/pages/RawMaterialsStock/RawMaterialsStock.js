import React, { useState } from "react";
import Styles from "../RawMaterialsStock/RawMaterialsStock.css";

const RawMaterialsStock = () => {
  const [selectedFabric, setSelectedFabric] = useState("");
  const [rawMaterials, setRawMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState("");

  // Static mock data for fabric types and raw materials
  const fabricTypes = [
    { id: "silk", name: "Silk" },
    { id: "cotton", name: "Cotton" },
    { id: "chiffon", name: "Chiffon" },
  ];

  const rawMaterialsData = {
    silk: [
      {
        name: "Silk Fibers",
        requiredQuantity: "10 kg",
        availableStock: "12 kg",
      },
      {
        name: "Dye",
        requiredQuantity: "2 liters",
        availableStock: "1.5 liters",
      },
      {
        name: "Chemical Agents",
        requiredQuantity: "5 kg",
        availableStock: "5 kg",
      },
    ],
    cotton: [
      {
        name: "Raw Cotton Fibers",
        requiredQuantity: "15 kg",
        availableStock: "18 kg",
      },
      {
        name: "Bleaching Agents",
        requiredQuantity: "3 liters",
        availableStock: "2 liters",
      },
      { name: "Dye", requiredQuantity: "4 liters", availableStock: "5 liters" },
    ],
    chiffon: [
      { name: "Silk Fibers", requiredQuantity: "8 kg", availableStock: "6 kg" },
      {
        name: "Polyester Fibers",
        requiredQuantity: "10 kg",
        availableStock: "12 kg",
      },
      { name: "Dye", requiredQuantity: "3 liters", availableStock: "4 liters" },
    ],
  };

  // Handle fabric selection
  const handleFabricChange = (e) => {
    const fabricId = e.target.value;
    setSelectedFabric(fabricId);
    setRawMaterials(rawMaterialsData[fabricId] || []);
  };

  // Handle Edit button click
  const handleEditClick = (material) => {
    setEditingMaterial(material);
    setEditedQuantity(material.requiredQuantity);
  };

  // Handle Save button click
  const handleSaveClick = () => {
    const updatedMaterials = rawMaterials.map((material) => {
      if (material.name === editingMaterial.name) {
        return { ...material, requiredQuantity: editedQuantity };
      }
      return material;
    });
    setRawMaterials(updatedMaterials);
    setEditingMaterial(null);
    setEditedQuantity("");
  };

  // Handle Cancel button click
  const handleCancelClick = () => {
    setEditingMaterial(null);
    setEditedQuantity("");
  };

  return (
    <div className={Styles.rawMaterialsData}>
      <h1>Raw Materials Needed</h1>
      <div className={Styles.controls}>
        <select onChange={handleFabricChange} value={selectedFabric}>
          <option value="">Select a Fabric</option>
          {fabricTypes.map((fabric) => (
            <option key={fabric.id} value={fabric.id}>
              {fabric.name}
            </option>
          ))}
        </select>
      </div>
      <div className={Styles.materialstable}>
        {rawMaterials.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Material Name</th>
                <th>Required Quantity</th>
                <th>Available Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((material, index) => (
                <tr key={index}>
                  <td>{material.name}</td>
                  <td>
                    {editingMaterial?.name === material.name ? (
                      <input
                        type="text"
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(e.target.value)}
                      />
                    ) : (
                      material.requiredQuantity
                    )}
                  </td>
                  <td>{material.availableStock}</td>
                  <td>
                    {parseFloat(material.availableStock) >=
                    parseFloat(material.requiredQuantity) ? (
                      <span className="status-sufficient">Sufficient</span>
                    ) : (
                      <span className="status-insufficient">Insufficient</span>
                    )}
                  </td>
                  <td>
                    {editingMaterial?.name === material.name ? (
                      <>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => handleEditClick(material)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Please select a fabric to view raw materials.</p>
        )}
      </div>
    </div>
  );
};

export default RawMaterialsStock;
