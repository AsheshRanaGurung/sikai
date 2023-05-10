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
  // TODO: modalSize to sm md xl 2xl 3xl
  modalSize?: string;
  height?: string;
  overflowY?: "auto" | "visible";
  isLoading?: boolean;
  resetButttonText?: string;
  submitButtonText?: string;
  submitHandler?: () => void;
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
  modalSize,
}) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size={modalSize ? modalSize : "3xl"}
        // {TODO: make this dynamic}
        isCentered
      >
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
            {resetButttonText && submitButtonText && (
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
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default ModalForm;
