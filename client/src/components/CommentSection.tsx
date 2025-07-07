import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface CommentSectionProps {
  courseId: number;
}

const mockComments = [
  {
    id: 1,
    content: "Great course!",
    user: { nickname: "Alice" },
    createdAt: new Date().toISOString(),
  },
  // 필요시 더 추가
];

export default function CommentSection({ courseId }: CommentSectionProps) {
  const [comments, setComments] = useState(mockComments);
  const [commentText, setCommentText] = useState("");
  const isAuthenticated = true; // 항상 로그인된 상태로 mock

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        content: commentText,
        user: { nickname: "MockUser" },
        createdAt: new Date().toISOString(),
      },
    ]);
    setCommentText("");
  };

  const getUserDisplayName = (user: any) => {
    return user?.nickname || "익명";
  };

  const getUserInitial = (user: any) => {
    return user?.nickname?.[0] || "U";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }
  };

  const handleLogin = () => alert("Login (mock)");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        댓글 <span className="text-gray-500">({comments?.length || 0})</span>
      </h3>
      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="궁금한 점이나 후기를 남겨주세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="resize-none mb-3"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!commentText.trim()}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                댓글 작성
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            댓글을 작성하려면 로그인이 필요합니다.
          </p>
          <Button
            onClick={handleLogin}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            로그인하기
          </Button>
        </div>
      )}
      {/* Comments List */}
      {comments?.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment: any) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.user?.profileImageUrl} />
                <AvatarFallback>
                  {getUserInitial(comment.user)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {getUserDisplayName(comment.user)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400">아직 댓글이 없습니다.</div>
      )}
    </div>
  );
}
