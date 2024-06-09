import React, { useEffect, useState } from 'react';
import { database } from '../firebase/firebase';
import './Donations.css';

function Donations() {
  const [medicineDonations, setMedicineDonations] = useState([]);
  const [equipmentDonations, setEquipmentDonations] = useState([]);
  const [bloodDonations, setBloodDonations] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactNow = (email) => {
    setSelectedEmail(email);
  };

  useEffect(() => {
    const fetchMedicineDonations = async () => {
      try {
        const medicineDonationsRef = database.ref('medicineDonations');
        const snapshot = await medicineDonationsRef.once('value');
        const data = snapshot.val();

        if (data) {
          const donationArray = Object.values(data);
          setMedicineDonations(donationArray);
        }
      } catch (error) {
        console.error('Error fetching medicine donations:', error);
      }
    };

    const fetchEquipmentDonations = async () => {
      try {
        const equipmentDonationsRef = database.ref('equipmentDonations');
        const snapshot = await equipmentDonationsRef.once('value');
        const data = snapshot.val();

        if (data) {
          const donationArray = Object.values(data);
          setEquipmentDonations(donationArray);
        }
      } catch (error) {
        console.error('Error fetching equipment donations:', error);
      }
    };

    const fetchBloodDonations = async () => {
      try {
        const bloodDonationsRef = database.ref('bloodDonations');
        const snapshot = await bloodDonationsRef.once('value');
        const data = snapshot.val();

        if (data) {
          const donationArray = Object.values(data);
          setBloodDonations(donationArray);
        }
      } catch (error) {
        console.error('Error fetching blood donations:', error);
      }
    };

    fetchMedicineDonations();
    fetchEquipmentDonations();
    fetchBloodDonations();
  }, []);

  const filteredMedicineDonations = medicineDonations.filter(donation =>
    donation.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEquipmentDonations = equipmentDonations.filter(donation =>
    donation.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBloodDonations = bloodDonations.filter(donation =>
    donation.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donation.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Donations..."
        style={{
            marginTop: '40px',
            marginLeft: '35%',
            marginBottom: '10px',
            width: '35%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
            fontSize: '16px',
          }}
      />
      <section className="donsec">
        <h1 style={{ textAlign: 'center' }}>Medicine Donations</h1>
        <div className="donation-card">
          {filteredMedicineDonations.map((donation, index) => (
            <div key={index} className="card">
              <h2>Medicine Name: {donation.medicineName}</h2>
              <p>Quantity: {donation.quantity}</p>
              <p>Location: {donation.location}</p>
              <p>Expiry Date: {donation.expiryDate}</p>
              <button className="button" onClick={() => handleContactNow(donation.email)}>Contact Now</button>
              {selectedEmail === donation.email && (
                <div className="email-popup">
                  <p>Email: {donation.email}</p>
                  <button onClick={() => setSelectedEmail('')}>Close</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="donsec">
        <h1 style={{ textAlign: 'center' }}>Equipment Donations</h1>
        <div className="donation-card">
          {filteredEquipmentDonations.map((donation, index) => (
            <div key={index} className="card">
                <h2>Equipment Name: {donation.equipmentName}</h2>
                <p>Quantity: {donation.quantity}</p>
                <p>Location: {donation.location}</p>
                <p>Condition: {donation.condition}</p>
                <button className="button" onClick={() => handleContactNow(donation.email)}>Contact Now</button>
              {selectedEmail === donation.email && (
                <div className="email-popup">
                  <p>Email: {donation.email}</p>
                  <button onClick={() => setSelectedEmail('')}>Close</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="donsec">
        <h1 style={{ textAlign: 'center' }}>Blood Donations</h1>
        <div className="donation-card">
        {filteredBloodDonations.map((donation, index) => (
            <div key={index} className="card">
            <h2>Blood Type: {donation.bloodType}</h2>
            <p>Donor's Age: {donation.age}</p>
            <p>Location: {donation.location}</p>
                <button className="button" onClick={() => handleContactNow(donation.email)}>Contact Now</button>
                {selectedEmail === donation.email && (
                <div className="email-popup">
                <p>Email: {donation.email}</p>
                <button onClick={() => setSelectedEmail('')}>Close</button>
                </div>
            )}
        </div>
        ))}
        </div>
        </section>
        </div>
        );
        }

export default Donations;
