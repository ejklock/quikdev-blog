import { Box } from "@chakra-ui/react";

interface PageIndicatorProps {
  pageInitial: number;
  pageEnd: number;
  total: number;
}
export const PageIndicator = ({
  pageInitial,
  pageEnd,
  total,
}: PageIndicatorProps) => {
  return (
    <Box>
      <strong>{pageInitial}</strong> de <strong>{total}</strong>
    </Box>
  );
};
