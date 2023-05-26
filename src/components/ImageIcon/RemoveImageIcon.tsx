import { Box, HStack, Image } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { ImageCancel } from "@sikaai/assets/svgs/index";

interface ImageWithCancelButtonProps {
  image: FileList | null;
  onImageRemove: () => void;
}

const ImageWithCancelButton: React.FC<ImageWithCancelButtonProps> = ({
  image,
  onImageRemove,
}) => {
  const handleImageRemove = useCallback(() => {
    onImageRemove();
  }, [onImageRemove]);

  return (
    <>
      {image && (
        <HStack alignItems="top" marginLeft="2px">
          <Image
            height="55px"
            width="55px"
            src={URL.createObjectURL(image?.[0] as Blob)}
            alt="This is an image"
          />
          <Box onClick={handleImageRemove}>
            <ImageCancel style={{ cursor: "pointer" }} />
          </Box>
        </HStack>
      )}
    </>
  );
};

export default React.memo(ImageWithCancelButton);
