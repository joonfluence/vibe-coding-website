import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import CourseUploadModal from "@/components/CourseUploadModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SUPABASE_URL = "https://vwektyamnobdszjwxqnp.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3ZWt0eWFtbm9iZHN6and4cW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NTkxNTYsImV4cCI6MjA2MjQzNTE1Nn0.JBBuzLHgFIZN1M6pYZTP9TvkTpB4JNQC8XIktffTGWI";

export default function Home() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/courses?select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">모든 강의</h1>
            <p className="text-gray-600 dark:text-gray-400">
              최신 강의를 확인하고 새로운 기술을 배워보세요
            </p>
          </div>
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            강의 업로드
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-xl shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses?.length > 0 ? (
              courses.map((course: any) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  아직 등록된 강의가 없습니다.
                </div>
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  첫 번째 강의를 업로드해보세요!
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Upload Button (Mobile) */}
      <Button
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-colors md:hidden p-0"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <CourseUploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
      />
    </div>
  );
}
