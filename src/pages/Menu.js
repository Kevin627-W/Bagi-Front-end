import React, { useState } from "react";
import { addToCart as addToCartFirebase } from "../crudOperations"; // Mengimpor fungsi CRUD
import nasigoreng from "../assets/nasi-goreng.jpg";
import miegoreng from "../assets/mie goreng.webp";
import steaksapi from "../assets/steak.jpg";
import steakayam from "../assets/steak ayam.jpg";
import esjeruk from "../assets/es jeruk.jpg";
import espresso from "../assets/espresso.jpg";
import mocha from "../assets/mocha.webp";
import cappuchino from "../assets/cappuchino.webp";
import latte from "../assets/latte.jpg";
import esteh from "../assets/es teh.jpg";
import carrotcake from "../assets/Carrot cake.jpg";
import velvetcake from "../assets/red velvet.jpg";

const MenuData = {
  "main-dish": [
    {
      id: "main-dish-1",
      name: "Nasi Goreng",
      price: 15,
      image: nasigoreng,
    },
    {
      id: "main-dish-2",
      name: "Mie Goreng",
      price: 15,
      image: miegoreng,
    },
    {
      id: "main-dish-3",
      name: "Steak Sapi",
      price: 30,
      image: steaksapi,
    },
    {
      id: "main-dish-4",
      name: "Steak Ayam",
      price: 30,
      image: steakayam,
    },
  ],
  drinks: [
    {
      id: "drinks-1",
      name: "Es Jeruk",
      price: 10,
      image: esjeruk,
    },
    {
      id: "drinks-2",
      name: "Espresso",
      price: 15,
      image: espresso,
    },
    {
      id: "drinks-3",
      name: "Mocha",
      price: 20,
      image: mocha,
    },
    {
      id: "drinks-4",
      name: "Cappuccino",
      price: 20,
      image: cappuchino,
    },
    {
      id: "drinks-5",
      name: "Latte",
      price: 15,
      image: latte,
    },
    {
      id: "drinks-6",
      name: "Es Teh",
      price: 5,
      image: esteh,
    },
  ],
  desserts: [
    {
      id: "desserts-1",
      name: "Carrot Cake",
      price: 25,
      image: carrotcake,
    },
    {
      id: "desserts-2",
      name: "Red Velvet",
      price: 30,
      image: velvetcake,
    },
  ],
};


const MENU_TABS = [
  { id: "main-dish", label: "Main Dish" },
  { id: "drinks", label: "Drinks" },
  { id: "desserts", label: "Desserts" },
];

const RestaurantMenu = () => {
  const [activeTab, setActiveTab] = useState("main-dish");

  const handleAddToCart = async (item) => {
    const success = await addToCartFirebase(item);
    if (success) {
      alert(`${item.name} has been added to your cart.`);
    } else {
      alert(`Failed to add ${item.name} to your cart.`);
    }
  };

  const styles = {
    mainContainer: {
      backgroundColor: "#000",
      height: "100%", // Changed to use exact height
      color: "white",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    navigation: {
      backgroundColor: "#111",
      padding: "0.5rem",
      marginBottom: "2rem",
    },
    tabButton: {
      backgroundColor: "transparent",
      border: "none",
      color: "#999",
      padding: "0.5rem 1.5rem",
      margin: "0 0.25rem",
      fontSize: "0.9rem",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
    },
    activeTabButton: {
      backgroundColor: "#ffc107",
      color: "#000",
      borderRadius: "4px",
    },
    contentWrapper: {
      flex: 1,
      overflow: "auto",
      padding: "0 1rem",
    },
    menuGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    menuCard: {
      backgroundColor: "#111",
      border: "none",
      borderRadius: "8px",
      overflow: "hidden",
      height: "100%",
      marginBottom: "4rem",  
    },
    menuImage: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
    },
    cardContent: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem"
    },
    itemName: {
      color: "#fff",
      fontSize: "0.9rem",
      fontWeight: "600",
      margin: "0.5rem 0",
      textTransform: "uppercase",
    },
    description: {
      color: "#666",
      fontSize: "0.75rem",
      textAlign: "center",
      margin: "0 0 1rem 0",
      lineHeight: "1.4",
    },
    price: {
      color: "#ffc107",
      fontSize: "1rem",
      fontWeight: "500",
      margin: "0.5rem 0",
    },
    addButton: {
      backgroundColor: "transparent",
      border: "1px solid #ffc107",
      color: "#ffc107",
      padding: "0.4rem 1rem",
      fontSize: "0.8rem",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: "100%",
      marginTop: "0.5rem",
    },
  };
  
  const renderMenuItems = (items) => {
    return (
      <div className="menu-item" style={styles.contentWrapper}>
        <div style={styles.menuGrid}>
          {items.map((item) => (
            <div key={item.id}>
              <div style={styles.menuCard}>
                <img src={item.image} alt={item.name} style={styles.menuImage} />
                <div style={styles.cardContent}>
                  <h5 style={styles.itemName}>{item.name}</h5>
                  <p style={styles.description}>{item.description}</p>
                  <p style={styles.price}>Rp {item.price.toFixed(3)}</p>
                  <button
                    style={styles.addButton}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div style={styles.mainContainer}>
      <nav style={styles.navigation}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          {MENU_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab.id ? styles.activeTabButton : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      {renderMenuItems(MenuData[activeTab])}
    </div>
  );
};

export default RestaurantMenu;

