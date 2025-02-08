// Function to fetch order details by Order ID
async function getOrder() {
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

        // Convert order status number to text description
        let statusText = "Order Created";
        switch (order.orderStatus) {
            case 1:
                statusText = "Order Created";
                break;
            case 2:
                statusText = "Order Started";
                break;
            case 3:
                statusText = "Order Half Way Done";
                break;
            case 4:
                statusText = "Order Completed";
                break;
        }

        // Display Order Details without Slider
        orderDetailsDiv.innerHTML = `
            <div><strong>Order ID:</strong> ${order.orderId}</div>
            <div><strong>Product:</strong> ${order.product}</div>
            <div><strong>Price:</strong> ${order.price}</div>
            <div><strong>Payment Type:</strong> ${order.paymentType}</div>
            <div><strong>Status:</strong> ${statusText}</div>
            <div><strong>Notes:</strong> ${order.orderNotes}</div>
            <div><strong>Paid:</strong> ${order.paid ? "Yes" : "No"}</div>
            <div><strong>Created At:</strong> ${new Date(order.createdAt).toLocaleString()}</div>
        `;

        // Show Order Details
        document.getElementById("orderDetails").style.display = 'block';
    } catch (error) {
        orderDetailsDiv.innerHTML = `<p style="color: red;">Error fetching order details.</p>`;
    }
}

// Function to toggle order details visibility
function toggleOrderDetails() {
    const orderDetailsDiv = document.getElementById("orderDetails");
    const toggleButton = document.getElementById("toggleDetailsButton");

    if (orderDetailsDiv.style.display === 'block') {
        orderDetailsDiv.style.display = 'none';
        toggleButton.textContent = "Show Order Details";
    } else {
        orderDetailsDiv.style.display = 'block';
        toggleButton.textContent = "Hide Order Details";
    }
}

// Toggle button to hide/show order details
document.getElementById("toggleDetailsButton").addEventListener("click", toggleOrderDetails);
