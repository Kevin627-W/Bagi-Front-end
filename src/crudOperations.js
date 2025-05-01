import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config';

// Fungsi untuk menambahkan item ke keranjang
export const addToCart = async (item) => {
  try {
    const cartRef = collection(db, 'cart');
    const cartSnapshot = await getDocs(cartRef);
    const existingItem = cartSnapshot.docs.find(doc => doc.data().id === item.id);

    if (existingItem) {
      const docRef = doc(db, 'cart', existingItem.id);
      await updateDoc(docRef, {
        quantity: existingItem.data().quantity + 1,
      });
    } else {
      await addDoc(cartRef, {
        ...item,
        quantity: 1,
      });
    }
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};

// Fungsi untuk memperbarui kuantitas item
export const updateCartItemQuantity = async (docId, increment) => {
  try {
    const cartRef = doc(db, 'cart', docId);
    await updateDoc(cartRef, { quantity: increment });
    return true;
  } catch (error) {
    console.error('Error updating quantity:', error);
    return false;
  }
};

// Fungsi untuk menghapus item dari keranjang
export const removeFromCart = async (docId) => {
  try {
    const cartRef = doc(db, 'cart', docId);
    await deleteDoc(cartRef);
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

// Fungsi untuk mendapatkan semua item dari keranjang (snapshot real-time)
export const getCartItems = (callback) => {
  try {
    const cartRef = collection(db, 'cart');
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      }));
      callback(items);
    });

    return unsubscribe; // Kembalikan fungsi untuk berhenti mendengarkan
  } catch (error) {
    console.error('Error getting cart items:', error);
    return null;
  }
};
