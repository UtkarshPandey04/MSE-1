import { categoryOptions, productTypeOptions, statusOptions } from '../constants';

function ProductForm({
  editingId,
  form,
  onChange,
  onSubmit,
  onCancel,
  submitting,
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
          <p>Fields reflect the backend schema and validation rules.</p>
        </div>
        {editingId ? (
          <button className="ghost-button" type="button" onClick={onCancel}>
            Cancel Edit
          </button>
        ) : null}
      </div>

      <form className="product-form" onSubmit={onSubmit}>
        <label>
          Product Name
          <input
            name="productName"
            value={form.productName}
            onChange={onChange}
            placeholder="Wireless Mouse"
            required
          />
        </label>

        <label>
          Product Code
          <input
            name="productCode"
            value={form.productCode}
            onChange={onChange}
            placeholder="WM-001"
            required
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={onChange}>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Supplier Name
          <input
            name="supplierName"
            value={form.supplierName}
            onChange={onChange}
            placeholder="Logi Supply"
            required
          />
        </label>

        <label>
          Quantity In Stock
          <input
            name="quantityInStock"
            type="number"
            min="0"
            value={form.quantityInStock}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Reorder Level
          <input
            name="reorderLevel"
            type="number"
            min="1"
            value={form.reorderLevel}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Unit Price
          <input
            name="unitPrice"
            type="number"
            min="0.01"
            step="0.01"
            value={form.unitPrice}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Manufacture Date
          <input
            name="manufactureDate"
            type="date"
            value={form.manufactureDate}
            onChange={onChange}
          />
        </label>

        <label>
          Product Type
          <select name="productType" value={form.productType} onChange={onChange}>
            {productTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={onChange}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </section>
  );
}

export default ProductForm;
