import { Skeleton as ChakraSkeleton, Stack } from "@chakra-ui/react";

const Skeleton = ({ count, height }: { count: number; height: string }) => {
  return (
    <Stack>
      {[...Array(count)].map((_, index) => (
        <ChakraSkeleton key={index} height={height ? height : "20px"} />
      ))}
    </Stack>
  );
};

export default Skeleton;
