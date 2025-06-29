export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string | null;
  createdAt?: string;
  lastLogin?: string;
}

export type UserRole = "customer" | "admin" | null;

export interface Image {
  id: string;
  FK: string;
  image_base64: string;
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

export interface Description {
  // Define properties for Description if available in API.json
  // Assuming it's a simple string for now based on PackageCore
  text: string;
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

export interface AdminUserListItem {
  no: number;
  id: string;
  name: string;
  image_id: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUserListResponse {
  list: AdminUserListItem[];
  total: number;
  page: number;
  limit: number;
}
