import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserRole = "customer" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string | null;
  createdAt?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!token && !!user;

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const clearError = () => {
    setError(null);
  };

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storedToken = await AsyncStorage.getItem("authToken");
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedToken && storedUser) {
        // Validate token (in real app, you would verify with server)
        const isValid = await validateToken(storedToken);

        if (isValid) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token is invalid, clear stored data
          await logout();
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setError("Failed to check authentication status");
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual token validation API call
      // const response = await fetch('/api/validate-token', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      // });
      // return response.ok;

      // For now, simulate token validation
      return token.length > 10; // Simple validation
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!token) return false;

      // TODO: Replace with actual token refresh API call
      // const response = await fetch('/api/refresh-token', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      // });

      // Simulate token refresh
      const newToken = `refreshed-${token}-${Date.now()}`;

      await AsyncStorage.setItem("authToken", newToken);
      setToken(newToken);

      return true;
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  };

  const updateUserProfile = async (
    userData: Partial<User>
  ): Promise<boolean> => {
    try {
      if (!user) return false;

      const updatedUser = { ...user, ...userData };

      // TODO: Replace with actual API call to update user profile
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(userData),
      // });

      // For now, just update local state
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      // Simulate API response for now
      const mockResponse = {
        success: true,
        data: {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: "1",
            name: "John Doe",
            email: email,
            role: "customer" as UserRole,
            phone: "+1234567890",
            avatar: null,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          },
        },
      };

      if (mockResponse.success) {
        const { token: newToken, user: userData } = mockResponse.data;

        await AsyncStorage.setItem("authToken", newToken);
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        setToken(newToken);
        setUser(userData);

        return { success: true, message: "Login successful" };
      } else {
        const errorMessage = "Invalid credentials";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });

      // Simulate API response for now
      const mockResponse = {
        success: true,
        data: {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: "1",
            name: userData.name,
            email: userData.email,
            role: "customer" as UserRole,
            phone: userData.phone,
            avatar: null,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          },
        },
      };

      if (mockResponse.success) {
        const { token: newToken, user: newUser } = mockResponse.data;

        await AsyncStorage.setItem("authToken", newToken);
        await AsyncStorage.setItem("userData", JSON.stringify(newUser));

        setToken(newToken);
        setUser(newUser);

        return { success: true, message: "Registration successful" };
      } else {
        const errorMessage = "Registration failed";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userData");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    checkAuthStatus,
    refreshToken,
    updateUserProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
