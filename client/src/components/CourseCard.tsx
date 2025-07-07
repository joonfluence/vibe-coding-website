import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Star, Eye } from "lucide-react";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    category: string;
    price: string;
    isFree: boolean;
    duration?: string;
    thumbnailUrl?: string;
    instructorName?: string;
    viewCount: number;
    rating: string;
    ratingCount: number;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.id}`}>
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative">
          {course.thumbnailUrl ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-t-xl flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                {course.category}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {course.category}
            </Badge>
            <Badge 
              variant="secondary" 
              className={course.isFree 
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs"
                : "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs"
              }
            >
              {course.isFree ? "무료" : `₩${parseInt(course.price).toLocaleString()}`}
            </Badge>
          </div>
          
          <h4 className="font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
            {course.title}
          </h4>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {course.instructorName || "익명"}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{parseFloat(course.rating || "0").toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{course.viewCount?.toLocaleString() || 0}</span>
              </div>
            </div>
            {course.duration && (
              <span>{course.duration}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
