import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Moon, Sun, GraduationCap } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search:", searchQuery);
  };

  const handleLogin = () => alert("Login (mock)");
  const handleLogout = () => alert("Logout (mock)");

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
              <GraduationCap className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold text-primary-800 dark:text-primary-300">
              StartClass
            </h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar (Hidden on mobile) */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <Input
                type="text"
                placeholder="강의 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pr-10"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>

            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Login/Profile */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {user?.nickname?.[0] || user?.firstName?.[0] || user?.email?.[0] || "U"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user?.nickname || user?.firstName || "사용자"}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white"
              >
                <FaGoogle />
                <span className="hidden sm:block">로그인</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
