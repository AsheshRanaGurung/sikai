import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";
import React, { FC } from "react";
interface IModal {
  children?: React.ReactNode;
  title: string;
  isModalOpen: boolean;
  closeModal: () => void;
  modalSize?: "modal-xl" | "modal-md" | "modal-sm";
  height?: string;
  overflowY?: "auto" | "visible";
  submitHandler?: () => void;
  isLoading?: boolean;
  resetButttonText?: string;
  submitButtonText?: string;
  handleSubmit?: () => void;
}
const ModalForm: FC<IModal> = ({
  children,
  isLoading,
  title,
  isModalOpen,
  closeModal,
  submitHandler,
  resetButttonText,
  submitButtonText,
  handleSubmit,
}) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} size={"3xl"}>
        <ModalOverlay />
        <form onSubmit={submitHandler}>
          <ModalContent>
            <ModalHeader
              bgColor={sikaai_colors.secondary}
              fontSize={"16px"}
              fontWeight={"500"}
              borderRadius={"16px 16px 0 0"}
            >
              {title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDirection="column" pt={3} gap={4}>
              {children}
            </ModalBody>
            <ModalFooter gap={3}>
              <Button variant="reset" onClick={closeModal}>
                {resetButttonText}
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                {submitButtonText}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default ModalForm;
