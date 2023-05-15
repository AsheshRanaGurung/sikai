import { CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  GridItem,
  Heading,
  HStack,
  Image,
  keyframes,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  DocumentAltIcon,
  VideoAltIcon,
  ImagePlaceholder,
} from "@sikaai/assets/svgs";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import Dropzone, { Accept, FileRejection } from "react-dropzone";

interface IDropzoneComponentProps {
  setAcceptedFiles: Dispatch<SetStateAction<Blob[]>>;
  imagePreview?: string;
  previewColumnsNo?: {
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
  };
  multiple?: boolean;
  maxSize?: number;
  helperText?: string;
  accept?: Accept;
  isFile?: boolean;
}

interface IPreview {
  link: string;
  fileType?: string;
  fileName?: string;
}

interface IFile {
  fileType?: string;
}

const progress = keyframes`
from{
  width: 0%
}
to{
  width: 100%
}
`;

export const returnType = (item: IFile) => {
  if (item?.fileType?.substring(0, 5) == "image") return "image";
  else if (item?.fileType?.substring(0, 5) == "video") return "video";
  else return "document";
};

export default function DropzoneComponent({
  setAcceptedFiles,
  previewColumnsNo,
  multiple,
  helperText,
  imagePreview,
  maxSize,
  accept,
  isFile,
}: IDropzoneComponentProps) {
  const [preview, setPreview] = useState<IPreview[]>([]);

  const [rejectedFileList, setRejectedFileList] = useState<FileRejection[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    if (imagePreview && imagePreview != "")
      setPreview([
        {
          link: imagePreview ?? "",
        },
      ]);
  }, [imagePreview]);

  const singleUpload = useMemo(() => {
    return !multiple && preview.length > 0;
  }, [preview, imagePreview, multiple]);

  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles) => {
        multiple
          ? (setAcceptedFiles(prev => [...prev, ...acceptedFiles]),
            setRejectedFileList(prev => [...prev, ...rejectedFiles]))
          : (setAcceptedFiles(acceptedFiles),
            setRejectedFileList(rejectedFiles));

        acceptedFiles.forEach(file => {
          const filePreview = {
            link: URL.createObjectURL(file),
            fileType: file.type,
            fileName: file.name,
          };
          multiple
            ? setPreview(prev => [...prev, filePreview])
            : setPreview([filePreview]);
        });
      }}
      maxSize={maxSize ?? 5242880}
      multiple={!!multiple}
      accept={accept ? accept : { "*/*": [".*"] }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <Box {...getRootProps()} border="2px dashed #D1D5DB" padding={6}>
            <input {...getInputProps()} />
            <VStack spacing={4}>
              {singleUpload ? (
                <>
                  <CloseButton
                    onClick={e => {
                      e.stopPropagation();
                      setPreview([]);
                    }}
                    alignSelf="flex-end"
                  />
                  {isFile ? (
                    <DocumentAltIcon width={22} height={22} />
                  ) : (
                    <Image
                      src={preview[0]?.link}
                      width="200px"
                      height="200px"
                      objectFit="cover"
                    />
                  )}
                  <Text flex={1} noOfLines={[1]}>
                    {preview[0]?.fileName}
                  </Text>
                </>
              ) : (
                <>
                  <ImagePlaceholder />
                  <Heading
                    fontSize={"14px"}
                    display="flex"
                    justifyContent={"center"}
                    gap={1}
                  >
                    <Text color="#14B8A6" display={"inline-block"}>
                      Upload {multiple ? "files" : "a file"},
                    </Text>
                    or click to select files
                  </Heading>
                  <VStack spacing={1}>
                    {accept && (
                      <Text color="gray.400">{`Only ${Object.values(
                        accept
                      )} file types are accepted`}</Text>
                    )}
                    <Text color="gray.400">{helperText}</Text>
                  </VStack>
                </>
              )}
            </VStack>
          </Box>
          {(preview.length > 1 || rejectedFileList.length > 1) && (
            <Button
              mt={4}
              leftIcon={<CloseIcon width={3} height={3} />}
              colorScheme="purple"
              variant="ghost"
              onClick={e => {
                e.stopPropagation();
                setPreview([]);
                setRejectedFileList([]);
              }}
            >
              Remove All
            </Button>
          )}
          {multiple && (
            <SimpleGrid
              columns={previewColumnsNo ?? { xl: 4, lg: 3, md: 2, sm: 1 }}
              spacing={2}
              mt={2}
            >
              {preview.map((item, index) => {
                const isImage = returnType(item) == "image";
                const isVideo = returnType(item) == "video";
                return (
                  <GridItem
                    key={index}
                    colSpan={1}
                    cursor={isImage ? "pointer" : "initial"}
                  >
                    <Popover
                      returnFocusOnClose={false}
                      isOpen={isOpen && imageIndex == index && isImage}
                      onClose={onClose}
                      placement="top"
                      closeOnBlur={false}
                    >
                      <PopoverContent>
                        <PopoverBody>
                          <Box>
                            <Image
                              src={preview[index]?.link}
                              objectFit="cover"
                              margin={"0 !important"}
                            />
                          </Box>
                        </PopoverBody>
                      </PopoverContent>

                      <PopoverTrigger>
                        <HStack
                          bg={"gray.50"}
                          p={2}
                          borderRadius={4}
                          onMouseEnter={() => {
                            onOpen();
                            setImageIndex(index);
                          }}
                          onMouseLeave={() => {
                            onClose();
                            setImageIndex(0);
                          }}
                        >
                          {isImage ? (
                            <Image
                              src={preview[index]?.link}
                              objectFit="cover"
                              margin={"0 !important"}
                              height={22}
                              width={22}
                            />
                          ) : isVideo ? (
                            <VideoAltIcon width={22} height={22} />
                          ) : (
                            <DocumentAltIcon width={22} height={22} />
                          )}
                          <Text flex={1} noOfLines={[1]}>
                            {item.fileName}
                          </Text>
                          <CloseButton
                            onClick={e => {
                              e.stopPropagation();
                              setPreview(prev => {
                                return prev.filter((_, i) => i !== index);
                              });
                            }}
                          />
                        </HStack>
                      </PopoverTrigger>
                    </Popover>

                    <Box
                      css={{
                        width: "0%",
                        height: "2px",
                        background: isImage
                          ? "purple"
                          : isVideo
                          ? "blue"
                          : "red",
                        animation: `1.5s ${progress}`,
                      }}
                    />
                  </GridItem>
                );
              })}
            </SimpleGrid>
          )}

          <SimpleGrid columns={1} spacing={2} mt={multiple ? 2 : 0}>
            {rejectedFileList.map((rejectedItem, index) => {
              return (
                <GridItem key={index}>
                  <Alert status="error" flexWrap={"wrap"}>
                    <AlertIcon />
                    <Text as="b" mr={2}>
                      {rejectedItem.file.name}{" "}
                    </Text>
                    <Text mr={2}>File not uploaded</Text>
                    <Text flex={1}>
                      {rejectedItem.errors[0].code == "file-too-large"
                        ? `File is large than ${
                            maxSize ? maxSize * 0.000001 + " MB" : "5MB"
                          }`
                        : rejectedItem.errors[0].message}
                    </Text>
                    <CloseButton
                      onClick={e => {
                        e.stopPropagation();
                        setRejectedFileList(prev => {
                          return prev.filter((_, i) => i !== index);
                        });
                      }}
                      justifySelf="flex-end"
                    />
                  </Alert>
                </GridItem>
              );
            })}
          </SimpleGrid>
        </section>
      )}
    </Dropzone>
  );
}
