// API Service for connecting frontend to MongoDB backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Storage keys
const TOKEN_KEY = 'airbnb_auth_token';
const USER_KEY = 'airbnb_user';

// Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Helper to set auth token
const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Helper to get current user
const getCurrentUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Helper to set current user
const setCurrentUser = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Helper to clear auth
const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Generic API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// ======================
// Authentication API
// ======================

export const authAPI = {
  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    const data = await apiRequest<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    setAuthToken(data.token);
    setCurrentUser(data.user);
    return data;
  },

  async login(credentials: { email: string; password: string }) {
    const data = await apiRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    setAuthToken(data.token);
    setCurrentUser(data.user);
    return data;
  },

  async getProfile() {
    return apiRequest<{ user: any }>('/auth/me');
  },

  async updateProfile(updates: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    avatar?: string;
  }) {
    const data = await apiRequest<{ user: any }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    
    setCurrentUser(data.user);
    return data;
  },

  logout() {
    clearAuth();
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  },

  getUser() {
    return getCurrentUser();
  },
};

// ======================
// Listings API
// ======================

export const listingsAPI = {
  async getAll(filters?: {
    city?: string;
    state?: string;
    guests?: number;
    bedrooms?: number;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    propertyType?: string;
    checkIn?: string;
    checkOut?: string;
    page?: number;
    limit?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const queryString = params.toString();
    return apiRequest<{ listings: any[]; pagination: any }>(
      `/listings${queryString ? `?${queryString}` : ''}`
    );
  },

  async getFeatured() {
    return apiRequest<{ listings: any[] }>('/listings/featured');
  },

  async getById(id: string) {
    return apiRequest<{ listing: any }>(`/listings/${id}`);
  },

  async create(listingData: {
    title: string;
    description: string;
    propertyType: string;
    location: any;
    capacity: any;
    amenities: string[];
    images: any[];
    pricing: any;
    availability?: any;
  }) {
    return apiRequest<{ listing: any }>('/listings', {
      method: 'POST',
      body: JSON.stringify(listingData),
    });
  },

  async update(id: string, updates: any) {
    return apiRequest<{ listing: any }>(`/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(id: string) {
    return apiRequest<{ message: string }>(`/listings/${id}`, {
      method: 'DELETE',
    });
  },

  async getByHost(hostId: string) {
    return apiRequest<{ listings: any[] }>(`/listings/host/${hostId}`);
  },
};

// ======================
// Bookings API
// ======================

export const bookingsAPI = {
  async create(bookingData: {
    listingId: string;
    checkIn: string;
    checkOut: string;
    guests: {
      adults: number;
      children?: number;
      infants?: number;
      pets?: number;
    };
    guestDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    paymentMethod: string;
    specialRequests?: string;
  }) {
    return apiRequest<{ booking: any }>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  async getAll(type: 'guest' | 'host' = 'guest', status?: string) {
    const params = new URLSearchParams({ type });
    if (status) params.append('status', status);
    
    return apiRequest<{ bookings: any[] }>(`/bookings?${params.toString()}`);
  },

  async getById(id: string) {
    return apiRequest<{ booking: any }>(`/bookings/${id}`);
  },

  async confirm(id: string) {
    return apiRequest<{ booking: any }>(`/bookings/${id}/confirm`, {
      method: 'PUT',
    });
  },

  async cancel(id: string, reason?: string) {
    return apiRequest<{ booking: any; refundAmount: number }>(`/bookings/${id}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  },

  async checkAvailability(listingId: string, month?: number, year?: number) {
    const params = new URLSearchParams();
    if (month) params.append('month', month.toString());
    if (year) params.append('year', year.toString());
    
    return apiRequest<{
      available: boolean;
      unavailableDates: any[];
      minNights: number;
      maxNights: number;
    }>(`/bookings/listing/${listingId}/availability?${params.toString()}`);
  },
};

// ======================
// Reviews API
// ======================

export const reviewsAPI = {
  async create(reviewData: {
    bookingId: string;
    reviewType: 'guest_to_host' | 'host_to_guest';
    ratings: {
      overall: number;
      cleanliness?: number;
      accuracy?: number;
      checkIn?: number;
      communication?: number;
      location?: number;
      value?: number;
    };
    comment: string;
  }) {
    return apiRequest<{ review: any }>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  async getByListing(listingId: string, page = 1, limit = 10) {
    return apiRequest<{ reviews: any[]; pagination: any }>(
      `/reviews/listing/${listingId}?page=${page}&limit=${limit}`
    );
  },

  async respond(reviewId: string, text: string) {
    return apiRequest<{ review: any }>(`/reviews/${reviewId}/response`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  async markHelpful(reviewId: string) {
    return apiRequest<{ message: string; helpfulCount: number }>(
      `/reviews/${reviewId}/helpful`,
      { method: 'POST' }
    );
  },
};

// ======================
// Contact API
// ======================

export const contactAPI = {
  async submit(contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    category?: string;
  }) {
    return apiRequest<{ message: string; ticketId: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  async getAll() {
    return apiRequest<{ contacts: any[] }>('/contact');
  },

  async getById(id: string) {
    return apiRequest<{ contact: any }>(`/contact/${id}`);
  },
};

// Export all APIs
export default {
  auth: authAPI,
  listings: listingsAPI,
  bookings: bookingsAPI,
  reviews: reviewsAPI,
  contact: contactAPI,
};
