import { useEffect, useState } from 'react';
import {
  createProduct,
  deleteProduct,
  filterProductsByCategory,
  getProducts,
  searchProducts,
  updateProduct,
} from './api';
import FeedbackMessage from './components/FeedbackMessage';
import FilterBar from './components/FilterBar';
import HeroSection from './components/HeroSection';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import { initialForm } from './constants';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts(filters = {}) {
    setLoading(true);
    setError('');

    try {
      let data;
      const trimmedName = filters.name?.trim() ?? '';
      const category = filters.category ?? '';

      if (trimmedName) {
        data = await searchProducts(trimmedName);
        if (category) {
          data = data.filter((item) => item.category === category);
        }
      } else if (category) {
        data = await filterProductsByCategory(category);
      } else {
        data = await getProducts();
      }

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    const payload = {
      ...form,
      productCode: form.productCode.toUpperCase(),
      quantityInStock: Number(form.quantityInStock),
      reorderLevel: Number(form.reorderLevel),
      unitPrice: Number(form.unitPrice),
      manufactureDate: form.manufactureDate || undefined,
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        setMessage('Product updated successfully.');
      } else {
        await createProduct(payload);
        setMessage('Product created successfully.');
      }

      resetForm();
      await loadProducts({ name: searchTerm, category: selectedCategory });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(product) {
    setEditingId(product._id);
    setForm({
      productName: product.productName || '',
      productCode: product.productCode || '',
      category: product.category || 'Other',
      supplierName: product.supplierName || '',
      quantityInStock: product.quantityInStock ?? 0,
      reorderLevel: product.reorderLevel ?? 1,
      unitPrice: product.unitPrice ?? '',
      manufactureDate: product.manufactureDate ? product.manufactureDate.slice(0, 10) : '',
      productType: product.productType || 'Non-Perishable',
      status: product.status || 'Available',
    });
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Delete this product?');
    if (!confirmed) {
      return;
    }

    setError('');
    setMessage('');

    try {
      await deleteProduct(id);
      setMessage('Product deleted successfully.');
      if (editingId === id) {
        resetForm();
      }
      await loadProducts({ name: searchTerm, category: selectedCategory });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleFilterSubmit(event) {
    event.preventDefault();
    setMessage('');
    await loadProducts({ name: searchTerm, category: selectedCategory });
  }

  async function clearFilters() {
    setSearchTerm('');
    setSelectedCategory('');
    setMessage('');
    await loadProducts();
  }

  return (
    <div className="page-shell">
      <div className="page-overlay" />
      <main className="app-layout">
        <HeroSection />

        <ProductForm
          editingId={editingId}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          submitting={submitting}
        />
        <FeedbackMessage message={message} type="success" />
        <FeedbackMessage message={error} type="error" />

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Inventory List</h2>
              <p>Search by name or filter by category using the backend endpoints.</p>
            </div>
          </div>

          <FilterBar
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onSubmit={handleFilterSubmit}
            onReset={clearFilters}
          />

          <ProductTable
            products={products}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
