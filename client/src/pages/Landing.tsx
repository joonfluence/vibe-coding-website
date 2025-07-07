import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";

// 서버 연동 코드 제거 및 mock 데이터 사용
const mockCourses = [
  {
    id: 1,
    title: "Mock Course 1",
    description: "This is a mock course.",
    category: "Development",
    price: 0,
    isFree: true,
    duration: "1h 30m",
    thumbnailUrl: "https://via.placeholder.com/300x200",
    videoUrl: "샘플_영상_URL_여기에_입력",
    instructorId: "mock-user",
    viewCount: 123,
    rating: 4.5,
    ratingCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 필요시 더 추가
];

export default function Landing() {
  // 기존 useQuery 등 서버 연동 코드 제거
  // const { data: courses, isLoading } = useQuery(...)
  const courses = mockCourses;
  const isLoading = false;

  // 로그인 버튼 등 서버 이동 부분은 alert로 대체
  const handleLogin = () => alert("Login (mock)");

  const scrollToCourses = () => {
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                커리어 첫걸음을 위한<br />
                <span className="text-blue-200">실무 중심 강의</span>
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                20~30대 사회 초년생을 위한 실용적이고 단기 집중형 교육 플랫폼.
                누구나 강사가 되어 지식을 공유하고, 실무 역량을 키워보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={scrollToCourses}
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  강의 둘러보기
                </Button>
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  시작하기
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional learning environment"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">7,500+</div>
              <div className="text-gray-600 dark:text-gray-400">등록된 강의</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">16,500+</div>
              <div className="text-gray-600 dark:text-gray-400">수강생</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">2,100+</div>
              <div className="text-gray-600 dark:text-gray-400">강사</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">98%</div>
              <div className="text-gray-600 dark:text-gray-400">만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-8">인기 카테고리</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: "💻", name: "프로그래밍", color: "text-primary-600" },
              { icon: "📈", name: "마케팅", color: "text-green-600" },
              { icon: "🎨", name: "디자인", color: "text-purple-600" },
              { icon: "📢", name: "영업", color: "text-orange-600" },
              { icon: "🧮", name: "재무", color: "text-blue-600" },
              { icon: "👥", name: "인사", color: "text-red-600" },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`text-2xl mb-2 ${category.color}`}>{category.icon}</div>
                <div className="font-medium">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Courses Section */}
      <section id="courses" className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">최신 강의</h3>
          </div>

          {isLoading ? (
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
                  <div className="text-gray-500 dark:text-gray-400 text-lg">
                    아직 등록된 강의가 없습니다.
                  </div>
                  <Button
                    onClick={handleLogin}
                    className="mt-4"
                  >
                    첫 번째 강의를 업로드해보세요!
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">당신의 지식을 공유해보세요</h3>
          <p className="text-xl text-gray-300 mb-8">
            전문성을 바탕으로 강의를 만들고, 많은 사람들과 지식을 나누며 수익도 창출하세요.
          </p>
          <Button
            onClick={handleLogin}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            지금 강의 업로드하기
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  🎓
                </div>
                <h4 className="text-xl font-bold text-white">StartClass</h4>
              </div>
              <p className="text-gray-400">커리어 첫걸음을 위한 실무 중심 온라인 강의 플랫폼</p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">서비스</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">강의 찾기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">강의 업로드</a></li>
                <li><a href="#" className="hover:text-white transition-colors">카테고리</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">고객지원</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">회사</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">회사소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 StartClass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
