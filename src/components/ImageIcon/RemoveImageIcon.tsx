import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { ImageCancel } from "@sikaai/assets/svgs/index";

interface ImageWithCancelButtonProps {
  image: FileList | null;
  imageSrc?: string;
  onImageRemove: () => void;
}

const ImageWithCancelButton: React.FC<ImageWithCancelButtonProps> = ({
  image,
  imageSrc,
  onImageRemove,
}) => {
  return (
    <>
      {image && (
        <HStack alignItems="top" marginLeft="2px">
          <Image
            height="55px"
            width="55px"
            src={imageSrc || URL.createObjectURL(image?.[0] as Blob)}
            alt="This is an image"
          />
          <Box onClick={onImageRemove}>
            <ImageCancel style={{ cursor: "pointer" }} />
          </Box>
        </HStack>
      )}
    </>
  );
};

export default ImageWithCancelButton;
