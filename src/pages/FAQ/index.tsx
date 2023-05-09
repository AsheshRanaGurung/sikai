import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import FormControl from "@sikaai/components/form/FormControl";
import { useForm } from "react-hook-form";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { sikaai_colors } from "@sikaai/theme/color";
import { Search2Icon } from "@chakra-ui/icons";
import { AddCircleIcon, EditIcon, TrashIcon } from "@sikaai/assets/svgs";
import {
  IFaq,
  useCreateFaq,
  useDelFaq,
  useGetFaq,
  useUpdateFaq,
} from "@sikaai/service/service-faq";
import httpStatus from "http-status";
import { toastSuccess } from "@sikaai/service/service-toast";
import { useEffect, useState } from "react";
const initialValue = {
  id: 0,
  question: "",
  answer: "",
};

const FAQ = () => {
  const [editId, setEditId] = useState<null | number>(null);
  const [delId, setDelId] = useState<number>();
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: initialValue,
  });

  console.log("getvalues", getValues());

  const {
    isOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isModalDelete,
    onOpen: onDelModalOpen,
    onClose: onDelModalClose,
  } = useDisclosure();

  const { mutateAsync: createFaq } = useCreateFaq();
  const { mutateAsync: updateFaq } = useUpdateFaq();
  const { mutateAsync: delFaq } = useDelFaq();
  const { data: dataFaq } = useGetFaq();

  useEffect(() => {
    const editData = dataFaq?.find(item => item.id == editId);
    console.log("editData", editData);
    reset({ ...editData });
  }, [editId]);

  const onCloseHandler = () => {
    onModalClose();
    reset(initialValue);
    setIsEdit(false);
  };
  const onSubmit = async (faqs: IFaq) => {
    if (isEdit && editId !== null) {
      const response = await updateFaq({
        ...faqs,
        id: editId,
      });
      if (response.status === httpStatus.OK) {
        toastSuccess("Faq updated");
        onCloseHandler();
      }
    } else {
      const response = await createFaq({
        ...faqs,
      });
      if (response.status === httpStatus.CREATED) {
        toastSuccess("Faq created");
        onCloseHandler();
      }
    }
  };
  const handleDelete = async (id: number) => {
    const response = await delFaq(id.toString());

    if (response.status === httpStatus.OK) {
      toastSuccess("Faq deleted");
      onDelModalClose();
    }
  };

  return (
    <>
      <BreadCrumb
        items={[]}
        title={{
          name: "Frequently Asked Question",
          route: `${NAVIGATION_ROUTES.FAQ}`,
        }}
      />

      <Box background={sikaai_colors.white} p={3} borderRadius={12}>
        <Flex justify={"space-between"} mb={4}>
          <InputGroup maxW={356}>
            <InputRightElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input type="tel" placeholder="Search" />
          </InputGroup>
          <Button
            size={"fit"}
            leftIcon={<AddCircleIcon />}
            outline="none"
            border={"none"}
            onClick={onModalOpen}
          >
            Add FAQ
          </Button>
        </Flex>

        <ModalForm
          isModalOpen={isOpen}
          title={isEdit ? "Edit FAQ" : "Add FAQ"}
          closeModal={onCloseHandler}
          resetButttonText={"Cancel"}
          submitButtonText={isEdit ? "Update" : "Add"}
          submitHandler={handleSubmit(onSubmit)}
        >
          <>
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="question"
              placeholder={"your question"}
              label={"Question"}
              isRequired
            />
            <FormControl
              control="textArea"
              size="lg"
              register={register}
              name="answer"
              placeholder={"Type where"}
              label={"Answer"}
              isRequired
            />
          </>
        </ModalForm>

        <ModalForm
          isModalOpen={isModalDelete}
          title={"Delete"}
          closeModal={onDelModalClose}
          resetButttonText={"Cancel"}
          submitButtonText={"Yes"}
          submitHandler={handleSubmit(
            () => delId !== undefined && handleDelete(delId)
          )}
        >
          <Text> Are you sure you want to delete?</Text>
        </ModalForm>

        <Accordion defaultIndex={[0]} allowMultiple>
          {dataFaq?.map(faq => {
            return (
              <AccordionItem mb={3} p={2} key={faq?.id}>
                <AccordionButton
                  _expanded={{
                    background: sikaai_colors.primary_light,
                    color: sikaai_colors.primary,
                    borderRadius: "8px 8px 0 0",
                  }}
                  background={sikaai_colors.gray}
                  borderRadius={"8px"}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {faq?.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  borderTop={"1px solid gray"}
                  background={sikaai_colors.primary_light}
                  borderRadius={"0 0 8px 8px"}
                >
                  {faq?.answer}
                  <Flex
                    justify={"flex-end"}
                    gap={4}
                    alignItems={"center"}
                    mr={3}
                  >
                    <Tooltip
                      hasArrow
                      label="Edit"
                      bg={sikaai_colors.tooltip_gray}
                      color={sikaai_colors.white}
                    >
                      <IconButton
                        width={"20px"}
                        onClick={() => {
                          setEditId(faq?.id ?? null);
                          setIsEdit(true);
                          onModalOpen();
                        }}
                        aria-label="settings"
                        bgColor={"transparent"}
                        icon={<EditIcon />}
                        sx={{
                          "&:hover": {
                            bgColor: "transparent",
                          },
                          "&:focus": {
                            outline: "none",
                          },
                          "&:disabled": {
                            background: "none !important",
                          },
                        }}
                      />
                    </Tooltip>

                    <Tooltip
                      hasArrow
                      label="Delete"
                      bg={sikaai_colors.tooltip_gray}
                      color={sikaai_colors.white}
                    >
                      <IconButton
                        width={"20px"}
                        aria-label="settings"
                        bgColor={"transparent"}
                        icon={<TrashIcon />}
                        onClick={() => {
                          onDelModalOpen();
                          setDelId(faq.id);
                        }}
                        sx={{
                          "&:hover": {
                            bgColor: "transparent",
                          },
                          "&:focus": {
                            outline: "none",
                          },
                          "&:disabled": {
                            background: "none !important",
                          },
                        }}
                      />
                    </Tooltip>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </>
  );
};
export default FAQ;
