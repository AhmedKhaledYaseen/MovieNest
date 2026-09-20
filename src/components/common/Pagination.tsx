import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToTop } from './ScrollToTop';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxPages = Math.min(totalPages, 500);
  
  if (maxPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    scrollToTop();
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="text-sm font-medium">
        Page {currentPage} of {maxPages}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= maxPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
