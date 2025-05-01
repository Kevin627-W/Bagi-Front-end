import React, { useState, useEffect } from "react";
import {
  updateCartItemQuantity,
  removeFromCart,
  getCartItems,
} from "../crudOperations";
import { db } from "../config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import paypal from "../assets/paypal.webp";
import mandiri from "../assets/Mandiri.png";
import BSG from "../assets/BSG.jpg";
import successImage from "../assets/sucess.gif";
import { useNavigate } from "react-router-dom";

const PAYMENT_METHODS = [
  { id: "paypal", name: "PayPal", imageUrl: paypal },
  { id: "mandiri", name: "Mandiri", imageUrl: mandiri },
  { id: "bsg", name: "BSG", imageUrl: BSG },
];

const Pembayaran = () => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isTakeAway, setIsTakeAway] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return getCartItems(setItems);
  }, []);

  const updateQuantity = async (id, increment) => {
    const item = items.find((item) => item.docId === id);
    if (!item) return;

    const newQuantity = item.quantity + increment;
    if (newQuantity < 1) {
      await removeFromCart(id);
    } else {
      await updateCartItemQuantity(id, newQuantity);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleDeliveryOptionChange = (option, isTakeaway) => {
    setDeliveryOption(option);
    setIsTakeAway(isTakeaway);
  };

  const handlePaymentConfirmation = async () => {
    try {
      const orderData = {
        items,
        recipientName,
        recipientAddress,
        deliveryOption,
        totalAmount: subtotal,
        orderStatus: "Process",
        orderDate: serverTimestamp(),
        isTakeAway,
      };

      await addDoc(collection(db, "orders"), orderData);
      setPaymentSuccess(true);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const CartItem = ({ item }) => (
    <tr key={item.docId}>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => removeFromCart(item.docId)}
        >
          &times;
        </button>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={item.image}
            alt={item.name}
            className="me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div>
            <h6 className="mb-0">{item.name}</h6>
            <small className="text-muted">{item.description}</small>
          </div>
        </div>
      </td>
      <td>Rp {item.price.toFixed(2)}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => updateQuantity(item.docId, -1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => updateQuantity(item.docId, 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>Rp {(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  );

  const OrderModal = () => (
    <>
      <div
        className="modal-backdrop show"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => setShowModal(false)}
      />
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title text-white">Your Order</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <h6 className="text-white">Total Items:</h6>
                <h6 className="text-warning">{totalQuantity}</h6>
              </div>

              {items.map((item) => (
                <div
                  key={item.docId}
                  className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <div className="ms-3">
                      <h6 className="mb-0 text-white">
                        {item.name}{" "}
                        <span className="text-warning">(x{item.quantity})</span>
                      </h6>
                      <small className="text-muted">
                        {item.quantity} x Rp {item.price.toFixed(2)}
                      </small>
                    </div>
                  </div>
                  <div className="text-white">
                    Rp {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="order-summary mb-3">
                <div className="d-flex justify-content-between fw-bold">
                  <span className="text-white">Total</span>
                  <span className="text-warning">Rp {subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="text-white"> Dining Option</label>
                <div className="d-flex gap-3">
                  <div>
                    <input
                      type="radio"
                      id="Take Away"
                      name="deliveryOption"
                      value="Take Away"
                      checked={deliveryOption === "Take Away"}
                      onChange={() =>
                        handleDeliveryOptionChange("Take Away", true)
                      }
                    />
                    <label htmlFor="Take Away" className="text-white">
                      Take Away
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="makanSini"
                      name="deliveryOption"
                      value="Eat Here"
                      checked={deliveryOption === "Eat Here"}
                      onChange={() =>
                        handleDeliveryOptionChange("Eat Here", false)
                      }
                    />
                    <label htmlFor="Eat Here" className="text-white">
                      Eat Here
                    </label>
                  </div>
                </div>
              </div>

              {deliveryOption === "Take Away" && (
                <>
                  <div className="form-group mb-3">
                    <label className="text-white" htmlFor="recipientName">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipientName"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      autoFocus
                      
                      />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-white" htmlFor="recipientAddress">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipientAddress"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      />
                  </div>
                </>
              )}
              <div className="payment-methods mt-4">
                <h6 className="text-white">Select Payment Method</h6>
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id={method.id}
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={() => setSelectedPaymentMethod(method.id)}
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor={method.id}
                    >
                      <img
                        src={method.imageUrl}
                        alt={method.name}
                        width="50"
                        className="me-2"
                      />
                      {method.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handlePaymentConfirmation}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const SuccessModal = () => (
    <>
      <div
        className="modal-backdrop show"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => setPaymentSuccess(false)}
      />
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Payment Successful</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setPaymentSuccess(false)}
              />
            </div>
            <div className="modal-body">
              <div className="text-center">
                <img
                  src={successImage}
                  alt="Success"
                  className="mb-4"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <p>Your payment has been successfully processed!</p>
                {isTakeAway ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/takeaway")}
                  >
                    Take Away
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("dashboard/home")}
                  >
                    Go to Home
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="container-fluid bg-black min-vh-100 text-white py-4">
      <div className="container">
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr className="bg-warning text-dark">
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItem key={item.docId} item={item} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-warning px-4 py-2"
            onClick={() => setShowModal(true)}
            disabled={items.length === 0}
          >
            Proceed to Pay
          </button>
        </div>

        {showModal && <OrderModal />}
        {paymentSuccess && <SuccessModal />}
      </div>
    </div>
  );
};

export default Pembayaran;
