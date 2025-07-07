import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";

interface CourseUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CourseUploadModal({ open, onOpenChange }: CourseUploadModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "0",
    isFree: true,
    duration: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const { toast } = useToast();

  const handleUpload = () => {
    alert("Course uploaded (mock)");
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === "price" && value === "0" ? { isFree: true } : {}),
      ...(field === "price" && value !== "0" ? { isFree: false } : {}),
    }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSize) {
        toast({
          title: "파일 크기 초과",
          description: "비디오 파일은 100MB 이하만 업로드 가능합니다.",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: "파일 크기 초과",
          description: "썸네일 이미지는 5MB 이하만 업로드 가능합니다.",
          variant: "destructive",
        });
        return;
      }
      setThumbnailFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "비디오 파일이 필요합니다",
        description: "강의 비디오를 업로드해주세요.",
        variant: "destructive",
      });
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString());
    });
    
    submitData.append("video", videoFile);
    if (thumbnailFile) {
      submitData.append("thumbnail", thumbnailFile);
    }

    handleUpload();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">새 강의 업로드</DialogTitle>
          <p className="text-gray-600 dark:text-gray-400">
            고품질 강의로 지식을 공유해보세요
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">강의 제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="매력적인 강의 제목을 입력하세요"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">카테고리 *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="프로그래밍">프로그래밍</SelectItem>
                <SelectItem value="마케팅">마케팅</SelectItem>
                <SelectItem value="디자인">디자인</SelectItem>
                <SelectItem value="영업">영업</SelectItem>
                <SelectItem value="재무">재무</SelectItem>
                <SelectItem value="인사">인사</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">강의 설명 *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="강의 내용과 학습 목표를 자세히 설명해주세요"
              rows={4}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">가격 설정</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="₩ 가격 (0원은 무료)"
              />
            </div>
            <div>
              <Label htmlFor="duration">예상 수강시간</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="예: 2시간 30분"
              />
            </div>
          </div>

          <div>
            <Label>썸네일 이미지</Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                {thumbnailFile ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>{thumbnailFile.name}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        setThumbnailFile(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">
                      클릭하여 썸네일 이미지 업로드
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      권장 크기: 1280x720px (선택사항)
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          <div>
            <Label>강의 영상 *</Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                {videoFile ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>{videoFile.name}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        setVideoFile(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">
                      클릭하여 강의 영상 업로드
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      지원 포맷: MP4, AVI, MOV (최대 100MB)
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={false}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
            >
              "강의 업로드"
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
