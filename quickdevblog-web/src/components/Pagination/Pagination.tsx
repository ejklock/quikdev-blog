import { Stack } from "@chakra-ui/react";
import { PageIndicator } from "./PageIndicator";
import { PaginationGroupItems } from "./PaginationGroupItems";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}
const siblingsCount = 1;
function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}
export const Pagination = ({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  lastPage,
  onPageChange,
}: PaginationProps) => {
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
  const paginationGroupItemsProps = {
    currentPage,
    siblingsCount,
    onPageChange,
    previousPages,
    nextPages,
    lastPage,
  };
  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      align="center"
      mt="8"
      justify="space-between"
    >
      <PageIndicator
        pageInitial={currentPage}
        pageEnd={
          lastPage === 1
            ? totalCountOfRegisters
            : currentPage * registersPerPage
        }
        total={totalCountOfRegisters}
      />
      <PaginationGroupItems {...paginationGroupItemsProps} />
    </Stack>
  );
};
