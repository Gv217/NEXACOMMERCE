import "./OrdersTable.css";

function OrdersTable() {
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>ORD-2024-001</td>
          <td>$2,499</td>
          <td className="delivered">Delivered</td>
        </tr>
        <tr>
          <td>ORD-2024-002</td>
          <td>$1,248</td>
          <td className="shipped">Shipped</td>
        </tr>
      </tbody>
    </table>
  );
}

export default OrdersTable;