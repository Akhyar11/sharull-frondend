import AsyncStorage from "@react-native-async-storage/async-storage";

// API Base URL - adjust this to your backend URL
const API_BASE_URL = "http://localhost:3000/api"; // Change this to your actual backend URL

// Types based on API.json schemas
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  image_id: string;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  location_point: string;
  province: string;
  city: string;
  country: string;
  category: string;
  popularity: number;
  featured: boolean;
  image_id: string;
  gallery: string;
  average_rating: number;
  review_count: number;
  is_active: boolean;
  meta_keywords: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
}

export interface PackageCore {
  id: string;
  name: string;
  descriptions: Description[];
  destination_ids: string[];
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Description {
  id: string;
  title: string;
  content: string;
}

export interface PackageWithDestinations extends PackageCore {
  destinations: Destination[];
}

export interface Fleet {
  id: string;
  name: string;
  type: string;
  plate_number: string;
  capacity: number;
  driver_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduleCore {
  id: string;
  package_id: string;
  fleet_id: string;
  departure_date: string;
  return_date: string;
  departure_time: string;
  available_seats: number;
  created_at: string;
  updated_at: string;
}

export interface ScheduleDetail extends ScheduleCore {
  package_data: PackageCore;
  fleet_data: Fleet;
}

export interface BookingCore {
  id: string;
  user_id: string;
  package_schedule_id: string;
  booking_date: string;
  number_of_seats: number;
  total_price: number;
  payment_status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BookingDetail extends BookingCore {
  package_data: PackageCore;
  schedule_data: ScheduleCore;
}

export interface PaymentMethod {
  id: string;
  name: string;
  provider: string;
  type: string;
  account_number: string;
  account_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentCore {
  id: string;
  booking_id: string;
  payment_method_id: string;
  payment_date: string;
  payment_amount: number;
  payment_proof: string;
  status: string;
  is_approved: boolean;
  approved_by: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentDetail extends PaymentCore {
  payment_method: PaymentMethod;
  booking: BookingCore;
}

// Response types
export interface PackageListResponse {
  list: PackageWithDestinations[];
  total: number;
  page: number;
  limit: number;
}

export interface ScheduleListResponse {
  list: ScheduleDetail[];
  total: number;
  page: number;
  limit: number;
}

export interface BookingListResponse {
  list: BookingDetail[];
  total: number;
  page: number;
  limit: number;
}

export interface PaymentListResponse {
  list: PaymentDetail[];
  total: number;
  page: number;
  limit: number;
}

export interface LoginResponse {
  msg: string;
  token: string;
  data: User;
}

export interface ApiResponse<T> {
  data?: T;
  msg?: string;
  error?: string;
}

// API Service Class
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("authToken");
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = await this.getAuthToken();
      const url = `${this.baseURL}${endpoint}`;

      const headers: HeadersInit & { Authorization?: string } = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.msg || "An error occurred",
        };
      }

      return { data };
    } catch (error) {
      console.error("API request error:", error);
      return {
        error: "Network error occurred",
      };
    }
  }

  // Authentication APIs
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    return this.makeRequest<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<ApiResponse<User>> {
    return this.makeRequest<User>("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
    });
  }

  // User Profile APIs
  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.makeRequest<User>("/user/profile");
  }

  async updateUserProfile(
    profileData: Partial<User>
  ): Promise<ApiResponse<User>> {
    return this.makeRequest<User>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Package APIs
  async getPackages(params?: {
    page?: number;
    limit?: number;
    search?: string;
    orderBy?: string;
  }): Promise<ApiResponse<PackageListResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

    const endpoint = `/user/packages${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return this.makeRequest<PackageListResponse>(endpoint);
  }

  async getPackageDetail(
    id: string
  ): Promise<ApiResponse<PackageWithDestinations>> {
    return this.makeRequest<PackageWithDestinations>(`/user/packages/${id}`);
  }

  // Schedule APIs
  async getPackageSchedules(
    packageId: string,
    params?: {
      page?: number;
      limit?: number;
      orderBy?: string;
    }
  ): Promise<ApiResponse<ScheduleListResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

    const endpoint = `/user/packages/${packageId}/schedules${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return this.makeRequest<ScheduleListResponse>(endpoint);
  }

  async getScheduleDetail(id: string): Promise<ApiResponse<ScheduleDetail>> {
    return this.makeRequest<ScheduleDetail>(`/user/schedules/${id}`);
  }

  // Booking APIs
  async getBookings(params?: {
    page?: number;
    limit?: number;
    orderBy?: string;
  }): Promise<ApiResponse<BookingListResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

    const endpoint = `/user/bookings${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return this.makeRequest<BookingListResponse>(endpoint);
  }

  async getBookingDetail(id: string): Promise<ApiResponse<BookingDetail>> {
    return this.makeRequest<BookingDetail>(`/user/bookings/${id}`);
  }

  async createBooking(data: {
    schedule_id: string;
    number_of_people: number;
    notes?: string;
  }): Promise<ApiResponse<BookingCore>> {
    return this.makeRequest<BookingCore>("/user/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Payment Method APIs
  async getPaymentMethods(params?: {
    orderBy?: string;
  }): Promise<ApiResponse<{ list: PaymentMethod[] }>> {
    const queryParams = new URLSearchParams();
    if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

    const endpoint = `/user/payment-methods${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return this.makeRequest<{ list: PaymentMethod[] }>(endpoint);
  }

  // Payment APIs
  async getPayments(params?: {
    page?: number;
    limit?: number;
    orderBy?: string;
  }): Promise<ApiResponse<PaymentListResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

    const endpoint = `/user/payments${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return this.makeRequest<PaymentListResponse>(endpoint);
  }

  async getPaymentDetail(id: string): Promise<ApiResponse<PaymentDetail>> {
    return this.makeRequest<PaymentDetail>(`/user/payments/${id}`);
  }

  async createPayment(data: {
    booking_id: string;
    payment_method_id: string;
    amount: number;
    payment_proof: string;
  }): Promise<ApiResponse<PaymentCore>> {
    return this.makeRequest<PaymentCore>("/user/payments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // File Proxy APIs
  getImage(id: string): string {
    return `${this.baseURL}/file-proxy/${id}`;
  }

  getImagesByFK(id: string): Promise<ApiResponse<{ images: any[] }>> {
    return this.makeRequest<{ images: any[] }>(`/file-proxy/fk/${id}`);
  }

  getSingleImageByFK(id: string): string {
    return `${this.baseURL}/file-proxy/fk/singel/${id}`;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
