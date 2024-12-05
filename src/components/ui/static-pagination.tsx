import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StaticPagination({
  activePage,
  lastPage,
  limit,
  setLimit,
  onPageChange,
}: {
  activePage: number;
  lastPage: number;
  limit: number;
  setLimit: (limit: number) => void;
  onPageChange: (pageNumber: number) => void;
}) {
  const pages = [];
  const showEllipsis = (side: "left" | "right") => {
    return (
      <Button key={`ellipsis-${side}`} variant="outline" size="sm" disabled>
        ...
      </Button>
    );
  };

  const showPageButton = (pageNumber: number) => {
    const page = Math.ceil(pageNumber);
    return (
      <Button
        key={page}
        variant={page === activePage ? "default" : "outline"}
        size="sm"
        onClick={() => page != activePage && onPageChange(page)}
      >
        {page}
      </Button>
    );
  };
  pages.push(showPageButton(1));

  if (activePage > 3) {
    pages.push(showEllipsis("left"));
  }

  // Calculate start and end page numbers to show around the current page
  const startPage = Math.max(activePage - 1, 2);
  const endPage = Math.min(activePage + 1, lastPage - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(showPageButton(i));
  }

  if (activePage < lastPage - 2) {
    pages.push(showEllipsis("right"));
  }

  // Always show the last page
  if (lastPage > 1) {
    pages.push(showPageButton(lastPage));
  }

  pages.unshift(
    <Button
      key="prev"
      variant="outline"
      size="sm"
      onClick={() => onPageChange(activePage - 1)}
      disabled={activePage < 2}
    >
      <ChevronLeft className="text-primary" size={20} />
    </Button>
  );

  pages.push(
    <Button
      key="next"
      variant="outline"
      size="sm"
      onClick={() => onPageChange(activePage + 1)}
      disabled={activePage >= lastPage}
    >
      <ChevronRight className="text-primary" size={20} />
    </Button>
  );
  pages.push(
    <Select onValueChange={(e) => setLimit(Number(e))}>
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder={limit} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return pages;
}

export default StaticPagination;
