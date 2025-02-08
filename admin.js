// Function to fetch order details by Order ID
async function getOrderDetails() {
    const orderId = document.getElementById("orderId").value;
    const orderDetailsDiv = document.getElementById("orderDetails");
  
    if (!orderId) {
      alert("Please enter an Order ID.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/order/${orderId}`);
      const order = await response.json();
  
      if (response.status !== 200) {
        orderDetailsDiv.innerHTML = `<p style="color: red;">${order.message}</p>`;
        return;
      }
  
      // Display Order Details and Order Status Progress Bar
      orderDetailsDiv.innerHTML = `
        <div><strong>Order ID:</strong> ${order.orderId}</div>
        <div><strong>Product:</strong> ${order.product}</div>
        <div><strong>Price:</strong> ${order.price}</div>
        <div><strong>Payment Type:</strong> ${order.paymentType}</div>
        <div><strong>Status:</strong> 
          <div id="progressBar">
            <div class="step ${getStepClass(order.orderStatus, 1)}">
              <div class="circle">1</div>
              <div>Started</div>
            </div>
            <div class="step ${getStepClass(order.orderStatus, 2)}">
              <div class="circle">2</div>
              <div>In Progress</div>
            </div>
            <div class="step ${getStepClass(order.orderStatus, 3)}">
              <div class="circle">3</div>
              <div>Half Done</div>
            </div>
            <div class="step ${getStepClass(order.orderStatus, 4)}">
              <div class="circle">4</div>
              <div>Completed</div>
            </div>
          </div>
        </div>
        <div><strong>Notes:</strong> ${order.orderNotes}</div>
        <div><strong>Paid:</strong> ${order.paid ? "Yes" : "No"}</div>
        <div><strong>Created At:</strong> ${new Date(order.createdAt).toLocaleString()}</div>
      `;
  
      // Show Update Form
      document.getElementById("updateForm").style.display = 'block';
      document.getElementById("product").value = order.product;
      document.getElementById("price").value = order.price;
      document.getElementById("paymentType").value = order.paymentType;
      document.getElementById("orderNotes").value = order.orderNotes;
      document.getElementById("paid").checked = order.paid;
      document.getElementById("orderStatus").value = order.orderStatus;
  
    } catch (error) {
      orderDetailsDiv.innerHTML = `<p style="color: red;">Error fetching order details.</p>`;
    }
  }
  
  // Function to get step class based on order status
  function getStepClass(orderStatus, step) {
    if (orderStatus >= step) {
      return 'completed';
    } else if (orderStatus === step) {
      return 'active';
    }
    return '';
  }
  
  // Function to update order
  async function updateOrder() {
    const orderId = document.getElementById("orderId").value;
    const product = document.getElementById("product").value;
    const price = document.getElementById("price").value;
    const paymentType = document.getElementById("paymentType").value;
    const orderNotes = document.getElementById("orderNotes").value;
    const paid = document.getElementById("paid").checked;
    const orderStatus = document.getElementById("orderStatus").value;
  
    const updatedOrder = {
      product,
      price,
      paymentType,
      orderNotes,
      paid,
      orderStatus
    };
  
    try {
      const response = await fetch(`http://localhost:3000/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
      });
  
      const result = await response.json();
  
      if (response.status !== 200) {
        alert(`Error updating order: ${result.message}`);
      } else {
        alert("Order updated successfully!");
        getOrderDetails(); // Refresh order details
      }
    } catch (error) {
      alert("Error updating order.");
    }
  }
  