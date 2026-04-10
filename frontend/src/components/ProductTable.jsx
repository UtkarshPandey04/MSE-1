function ProductTable({ products, loading, onEdit, onDelete }) {
  if (loading) {
    return <p className="status-text">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="status-text">No products found for the current filters.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Stock</th>
            <th>Reorder</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.productCode}</td>
              <td>{product.category}</td>
              <td>{product.supplierName}</td>
              <td>{product.quantityInStock}</td>
              <td>{product.reorderLevel}</td>
              <td>Rs. {Number(product.unitPrice).toFixed(2)}</td>
              <td>
                <span
                  className={`status-pill ${product.status === 'Available' ? 'available' : 'out'}`}
                >
                  {product.status}
                </span>
              </td>
              <td className="action-cell">
                <button
                  className="ghost-button small-button"
                  type="button"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="danger-button small-button"
                  type="button"
                  onClick={() => onDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
