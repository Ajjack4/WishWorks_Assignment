// src/PropertyList.js
import  { useState, useEffect } from 'react';

const ListListing = () => {
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProperty, setEditProperty] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/Listings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    try {
      const response = await fetch(`http://localhost:5000/Listings/${propertyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setProperties(properties.filter((property) => property.property_id !== propertyId));
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  const handleEdit = (property) => {
    setEditMode(true);
    setEditProperty(property);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log('Updating property:', editProperty);

    try {
      const response = await fetch(`http://localhost:5000/Listings/${editProperty.property_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProperty),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedProperty = await response.json();
      setProperties(properties.map((property) => (property.property_id === updatedProperty.property_id ? updatedProperty : property)));
      setEditMode(false);
      setEditProperty({});
    } catch (error) {
      console.error('There was a problem with the update operation:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProperty({ ...editProperty, [name]: value });
  };

  return (
    <div className="container">
      <h2 className="my-4">Property List</h2>
      <div className="row">
        {properties.length === 0 ? (
          <div className="col">
            <p>No properties available.</p>
          </div>
        ) : (
          properties.map((property) => (
            <div className="col-md-4 mb-4" key={property.property_id}>
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{property.property_name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{property.property_owner}</h6>
                  <p className="card-text">{property.property_locality}</p>
                  <button className="btn btn-primary mr-2" onClick={() => handleEdit(property)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(property.property_id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editMode && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Property</h5>
                <button type="button" className="close" onClick={() => setEditMode(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="property_name">Property Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="property_name"
                      name="property_name"
                      value={editProperty.property_name || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="property_owner">Property Owner</label>
                    <input
                      type="text"
                      className="form-control"
                      id="property_owner"
                      name="property_owner"
                      value={editProperty.property_owner || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="property_locality">Property Locality</label>
                    <input
                      type="text"
                      className="form-control"
                      id="property_locality"
                      name="property_locality"
                      value={editProperty.property_locality || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Property
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListListing;
