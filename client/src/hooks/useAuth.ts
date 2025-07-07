import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  return {
    user: {
      id: "mock-user",
      email: "mock@example.com",
      nickname: "MockUser",
      profileImageUrl: "",
    },
    isAuthenticated: true,
    isLoading: false,
    login: () => {},
    logout: () => {},
  };
}
