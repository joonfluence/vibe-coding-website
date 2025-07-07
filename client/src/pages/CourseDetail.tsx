import { useEffect } from "react";
import { useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Clock, User } from "lucide-react";

// mock instructor 추가
const mockInstructor = {
  id: "mock-user",
  nickname: "MockUser",
  profileImageUrl: "",
};

// 서버 연동 코드 제거 및 mock 데이터 사용
const mockCourse = {
  id: 1,
  title: "Mock Course 1",
  description: "This is a mock course.",
  category: "Development",
  price: 0,
  isFree: true,
  duration: "1h 30m",
  thumbnailUrl: "https://via.placeholder.com/300x200",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  instructorId: "mock-user",
  instructor: mockInstructor,
  viewCount: 123,
  rating: 4.5,
  ratingCount: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
const mockComments = [
  {
    id: 1,
    content: "Great course!",
    user: { nickname: "Alice" },
    createdAt: new Date().toISOString(),
  },
  // 필요시 더 추가
];

export default function CourseDetail() {
  // 기존 useQuery, useMutation, apiRequest 등 서버 연동 코드 제거
  const course = mockCourse;
  const comments = mockComments;
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="animate-pulse">
          <div className="w-full h-64 md:h-96 bg-gray-300 dark:bg-gray-600"></div>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            강의를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            요청하신 강의가 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
        </div>
      </div>
    );
  }

  const instructorName = course.instructor?.nickname || "익명";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Video Player Section */}
      <div className="bg-black">
        <VideoPlayer videoUrl={course.videoUrl} />
      </div>

      {/* Course Info Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {course.category}
            </Badge>
            <Badge variant="secondary" className={course.isFree ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"}>
              {course.isFree ? "무료" : `₩${parseInt(course.price).toLocaleString()}`}
            </Badge>
            <div className="flex items-center text-yellow-500 ml-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {course.rating || "4.8"} ({course.ratingCount || 0}명 평가)
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {course.title}
          </h1>

          <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span>{instructorName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{course.viewCount?.toLocaleString() || 0}명 시청</span>
            </div>
            {course.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">강의 소개</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {course.description}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection courseId={course.id} />
      </div>
    </div>
  );
}
