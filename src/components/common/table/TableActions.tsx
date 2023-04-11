import { Flex, IconButton } from "@chakra-ui/react";

// import {
//   SettingIcon,
//   EditIcon,
//   DeleteIcon,
//   ViewIcon,
//   RecordIcon,
// } from "@sikaai/assets/svgs";

const TableActions = ({
  onEdit,
  onView,
  onDelete,
  onSetting,
  onShowRecord,
  onDisableSetting,
  onDisableEdit,
  onDisableDelete,
  onDisableView,
  onDisableShowRecord,
}: ITableActions) => {
  return (
    <Flex
      gap={2}
      justifyItems="center"
      alignItems="center"
      justifyContent={"center"}
    >
      {!!onSetting && (
        <IconButton
          disabled={onDisableSetting}
          width={"20px"}
          aria-label="settings"
          bgColor={"transparent"}
          onClick={onSetting}
            // icon={<SettingIcon />}
          sx={{
            "&:hover": {
              bgColor: "transparent",
            },
            "&:disabled": {
              background: "none !important",
            },
          }}
        />
      )}
      {!!onEdit && (
        <IconButton
          disabled={onDisableEdit}
          width={"20px"}
          aria-label="settings"
          bgColor={"transparent"}
          onClick={onEdit}
          //   icon={<EditIcon />}
          // TODO: make a generic component for repeating code
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
      )}

      {!!onDelete && (
        <IconButton
          disabled={onDisableDelete}
          width={"20px"}
          aria-label="settings"
          bgColor={"transparent"}
          //   icon={<DeleteIcon />}
          onClick={onDelete}
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
      )}

      {!!onView && (
        <IconButton
          disabled={onDisableView}
          width={"20px"}
          aria-label="settings"
          bgColor={"transparent"}
          //   icon={<ViewIcon />}
          onClick={onView}
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
      )}

      {!!onShowRecord && (
        <IconButton
          disabled={onDisableShowRecord}
          width={"20px"}
          aria-label="settings"
          bgColor={"transparent"}
          //   icon={<RecordIcon />}
          onClick={onShowRecord}
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
      )}
    </Flex>
  );
};
interface ITableActions {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onSetting?: () => void;
  onShowRecord?: () => void;
  // to disable button for some user: pass boolean value to the disable props
  onDisableEdit?: boolean;
  onDisableView?: boolean;
  onDisableDelete?: boolean;
  onDisableSetting?: boolean;
  onDisableShowRecord?: boolean;
}

export default TableActions;
