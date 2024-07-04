import { Fragment,useState } from "react"

const InputListing = () => {
  const [propertyName, setPropertyName] = useState('');
  const [propertyOwner, setPropertyOwner] = useState('');
  const [propertyLocality, setPropertyLocality] = useState('');
  
  const handleSubmit = async () => {
    // event.preventDefault();

    const property = {
      property_name: propertyName,
      property_owner: propertyOwner,
      property_locality: propertyLocality,
    };

    try {
      const response = await fetch('http://localhost:5000/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Property added:', result);
      setPropertyName('');
      setPropertyOwner('');
      setPropertyLocality('');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">
        Estate Listing
      </h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="property_name">Property Name:</label>
        <input
          type="text"
          id="property_name"
           className="form-control"
           placeholder="Enter Name Of Property"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="property_owner">Property Owner:</label>
        <input
          type="text"
          id="property_owner"
           className="form-control"
           placeholder="Enter Property Owner's Name"
           value={propertyOwner}
          onChange={(e) => setPropertyOwner(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="property_locality">Property Locality:</label>
        <input
          type="text"
          id="property_locality"
          className="form-control"
          placeholder="Enter Property Locality"
          value={propertyLocality}
          onChange={(e) => setPropertyLocality(e.target.value)}
        />
      </div>
      <button type="submit">Add Property</button>
      </form>
    </Fragment>
  )
}

export default InputListing
