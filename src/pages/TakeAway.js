import { useEffect, useState } from "react";
import { db } from "../config";
import { collection, query, where, onSnapshot, and } from "firebase/firestore";

const TakeAway = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {

    const q = query(
      collection(db, "orders"),
      and(
        where("orderStatus", "==", "Process"),
        where("isTakeAway", "==", true) 
      )
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    });
  
    return () => unsubscribe();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const OrderModal = ({ order, onClose }) => (
    <>
      <div
        className="modal-backdrop show"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      />
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Order Summary</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-warning">Recipient Details</h6>
                  <p><strong>Name:</strong> {order.recipientName}</p>
                  <p><strong>Address:</strong> {order.recipientAddress}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-warning">Order Information</h6>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.orderDate.seconds * 1000).toLocaleString()}
                  </p>
                  <p><strong>Status:</strong> {order.orderStatus}</p>
                </div>
              </div>

              <h6 className="text-warning mt-3">Order Items</h6>
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.docId}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>Rp {item.price.toFixed(2)}</td>
                      <td>Rp {(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="fw-bold">
                    <td colSpan="3" className="text-end">Total Amount:</td>
                    <td>Rp {order.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="container-fluid bg-black min-vh-100 text-white py-4">
      <div className="container">
        <h3 className="mb-4 text-warning">Take Away Orders</h3>
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr className="bg-warning text-dark">
                <th>Order Details</th>
                <th>Recipient</th>
                <th>Total Amount</th>
                <th>Order Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    {order.items
                      .map((item) => `${item.name} (x${item.quantity})`)
                      .join(", ")}
                  </td>
                  <td>{order.recipientName}</td>
                  <td>Rp {order.totalAmount.toFixed(2)}</td>
                  <td>
                    {new Date(order.orderDate.seconds * 1000).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleViewOrder(order)}
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showOrderModal && selectedOrder && (
          <OrderModal
            order={selectedOrder}
            onClose={() => setShowOrderModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TakeAway;