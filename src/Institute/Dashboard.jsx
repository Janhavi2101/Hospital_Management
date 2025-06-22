import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import logo from './logo.png';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    // Replace 'Institute123' with the actual institute ID from context or authentication
    fetch('http://localhost:5000/inventory/user5595')
      .then((response) => response.json())
      .then((data) => setInventoryItems(data))
      .catch((error) => console.error('Error fetching inventory items:', error));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileOpen(!profileOpen);
  };

  const closeProfileMenu = () => {
    setProfileOpen(false);
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <img src={logo} alt="Logo" className="logo" />
        <a href="/" className="nav-title">HOSPITAL MANAGEMENT SYSTEM</a>
        <button className="menu-btn" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <li>
            <NavLink to="/inventory" activeClassName="selected">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/inventory-form" activeClassName="selected">Add to Inventory</NavLink>
          </li>
          <li className="profile-menu">
            <button onClick={toggleProfileMenu} className="profile-btn">
              Profile
            </button>
            {profileOpen && (
              <div className="dropdown-content">
                <NavLink to="/profile" onClick={closeProfileMenu}>Profile</NavLink>
                <NavLink to="/" onClick={closeProfileMenu}>Logout</NavLink>
              </div>
            )}
          </li>
        </ul>
      </nav>
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>×</button>
        <ul className="mobile-nav-links">
          <li>
            <NavLink to="/inventory" activeClassName="selected" onClick={closeMenu}>Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/inventory-form" activeClassName="selected" onClick={closeMenu}>Add to Inventory</NavLink>
          </li>
          <li>
            <button onClick={toggleProfileMenu} className="profile-btn">
              Profile
            </button>
            {profileOpen && (
              <div className="dropdown-content">
                <NavLink to="/profile" onClick={closeProfileMenu}>Profile</NavLink>
                <NavLink to="/" onClick={closeProfileMenu}>Logout</NavLink>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
              <th>Batch No</th>
              <th>Expiry Date</th>
              <th>Supplier</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map(item => (
              <tr key={item._id}>
                <td>{item.itemName || 'N/A'}</td>
                <td>{item.itemCategory || 'N/A'}</td>
                <td>{item.sku || 'N/A'}</td>
                <td>{item.stockInformation?.quantity || 'N/A'}</td>
                <td>{item.stockInformation?.reorderLevel || 'N/A'}</td>
                <td>{item.stockInformation?.batchDetails[0]?.batchNumber || 'N/A'}</td>
                <td>{item.stockInformation?.batchDetails[0]?.expiryDate || 'N/A'}</td>
                <td>{item.supplierInformation?.supplierName || 'N/A'}</td>
                <td>{item.storageInformation?.storageLocation || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
