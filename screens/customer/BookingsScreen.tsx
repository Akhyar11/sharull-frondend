import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Booking {
  id: string;
  packageName: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
  passengers: number;
  bookingDate: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    packageName: "Bali Adventure",
    destination: "Bali, Indonesia",
    departureDate: "2024-02-15",
    returnDate: "2024-02-19",
    status: "confirmed",
    totalPrice: 2500000,
    passengers: 2,
    bookingDate: "2024-01-10",
  },
  {
    id: "2",
    packageName: "Yogyakarta Heritage",
    destination: "Yogyakarta, Indonesia",
    departureDate: "2024-03-20",
    returnDate: "2024-03-22",
    status: "pending",
    totalPrice: 1500000,
    passengers: 1,
    bookingDate: "2024-01-15",
  },
  {
    id: "3",
    packageName: "Lombok Paradise",
    destination: "Lombok, Indonesia",
    departureDate: "2024-01-05",
    returnDate: "2024-01-08",
    status: "completed",
    totalPrice: 1800000,
    passengers: 3,
    bookingDate: "2023-12-20",
  },
];

export default function BookingsScreen() {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState("all");

  const statuses = [
    { id: "all", name: "All", color: "bg-gray-500" },
    { id: "pending", name: "Pending", color: "bg-yellow-500" },
    { id: "confirmed", name: "Confirmed", color: "bg-blue-500" },
    { id: "completed", name: "Completed", color: "bg-green-500" },
    { id: "cancelled", name: "Cancelled", color: "bg-red-500" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "confirmed":
        return "✅";
      case "completed":
        return "🎉";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  const filteredBookings =
    selectedStatus === "all"
      ? mockBookings
      : mockBookings.filter((booking) => booking.status === selectedStatus);

  const renderBookingCard = (booking: Booking) => (
    <TouchableOpacity
      key={booking.id}
      className="bg-white rounded-lg shadow-lg mb-4 p-4"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {booking.packageName}
          </Text>
          <Text className="text-gray-600">{booking.destination}</Text>
        </View>
        <View
          className={`rounded-full px-3 py-1 ${getStatusColor(booking.status)}`}
        >
          <Text className="text-xs font-semibold">
            {getStatusIcon(booking.status)} {booking.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View className="space-y-2 mb-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Departure:</Text>
          <Text className="text-gray-800 font-medium">
            {formatDate(booking.departureDate)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Return:</Text>
          <Text className="text-gray-800 font-medium">
            {formatDate(booking.returnDate)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Passengers:</Text>
          <Text className="text-gray-800 font-medium">
            {booking.passengers} person(s)
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Total Price:</Text>
          <Text className="text-primary-600 font-bold">
            {formatPrice(booking.totalPrice)}
          </Text>
        </View>
      </View>

      <View className="flex-row space-x-3">
        <TouchableOpacity className="flex-1 bg-primary-500 rounded-lg py-2">
          <Text className="text-white font-semibold text-center">
            View Details
          </Text>
        </TouchableOpacity>
        {booking.status === "pending" && (
          <TouchableOpacity className="flex-1 bg-red-500 rounded-lg py-2">
            <Text className="text-white font-semibold text-center">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            My Bookings
          </Text>
          <Text className="text-gray-600">
            Track your travel bookings and reservations
          </Text>
        </View>

        {/* Stats */}
        <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600">
                {mockBookings.length}
              </Text>
              <Text className="text-gray-600 text-sm">Total Bookings</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">
                {mockBookings.filter((b) => b.status === "confirmed").length}
              </Text>
              <Text className="text-gray-600 text-sm">Confirmed</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-yellow-600">
                {mockBookings.filter((b) => b.status === "pending").length}
              </Text>
              <Text className="text-gray-600 text-sm">Pending</Text>
            </View>
          </View>
        </View>

        {/* Status Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {statuses.map((status) => (
            <TouchableOpacity
              key={status.id}
              className={`rounded-full px-4 py-2 mr-3 ${
                selectedStatus === status.id
                  ? status.color
                  : "bg-white border border-gray-300"
              }`}
              onPress={() => setSelectedStatus(status.id)}
            >
              <Text
                className={`font-medium ${
                  selectedStatus === status.id ? "text-white" : "text-gray-700"
                }`}
              >
                {status.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bookings List */}
        <View>{filteredBookings.map(renderBookingCard)}</View>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-6xl mb-4">📋</Text>
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              No bookings found
            </Text>
            <Text className="text-gray-600 text-center">
              {selectedStatus === "all"
                ? "You haven't made any bookings yet"
                : `No ${selectedStatus} bookings found`}
            </Text>
            {selectedStatus === "all" && (
              <TouchableOpacity className="bg-primary-500 rounded-lg px-6 py-3 mt-4">
                <Text className="text-white font-semibold">
                  Browse Packages
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
