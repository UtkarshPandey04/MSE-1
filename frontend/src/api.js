const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.errors?.join(', ') || data.message || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export function getProducts() {
  return request('/api/products');
}

export function searchProducts(name) {
  return request(`/api/products/search?name=${encodeURIComponent(name)}`);
}

export function filterProductsByCategory(category) {
  return request(`/api/products/category?cat=${encodeURIComponent(category)}`);
}

export function createProduct(payload) {
  return request('/api/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateProduct(id, payload) {
  return request(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id) {
  return request(`/api/products/${id}`, {
    method: 'DELETE',
  });
}
