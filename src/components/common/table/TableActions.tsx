import { Flex, IconButton, Tooltip } from "@chakra-ui/react";

import {
  SettingTableIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  QuestionIcon,
} from "@sikaai/assets/svgs";
import { sikaai_colors } from "@sikaai/theme/color";

const TableActions = ({
  onEdit,
  onView,
  onDelete,
  onSetting,
  onShowQues,

  onDisableEdit,
  onDisableDelete,
  onDisableView,
  onDisableSetting,
  onDisableShowQues,
}: ITableActions) => {
  return (
    <Flex justifyItems="center" alignItems="center" justifyContent={"center"}>
      {!!onView && (
        <Tooltip
          hasArrow
          label="View"
          bg={sikaai_colors.tooltip_gray}
          color={sikaai_colors.white}
        >
          <IconButton
            disabled={onDisableView}
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            icon={<EyeIcon />}
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
        </Tooltip>
      )}

      {!!onEdit && (
        <Tooltip
          hasArrow
          label="Edit"
          bg={sikaai_colors.tooltip_gray}
          color={sikaai_colors.white}
        >
          <IconButton
            disabled={onDisableEdit}
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            onClick={onEdit}
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
      )}

      {!!onSetting && (
        <Tooltip
          hasArrow
          label="Settings"
          bg={sikaai_colors.tooltip_gray}
          color={sikaai_colors.white}
        >
          <IconButton
            disabled={onDisableSetting}
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            onClick={onSetting}
            icon={<SettingTableIcon />}
            sx={{
              "&:hover": {
                bgColor: "transparent",
              },
              "&:disabled": {
                background: "none !important",
              },
            }}
          />
        </Tooltip>
      )}

      {!!onShowQues && (
        <Tooltip
          hasArrow
          label="Add question"
          bg={sikaai_colors.tooltip_gray}
          color={sikaai_colors.white}
        >
          <IconButton
            disabled={onDisableShowQues}
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            icon={<QuestionIcon />}
            onClick={onShowQues}
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
      )}

      {!!onDelete && (
        <Tooltip
          hasArrow
          label="Delete"
          bg={sikaai_colors.tooltip_gray}
          color={sikaai_colors.white}
        >
          <IconButton
            disabled={onDisableDelete}
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            icon={<TrashIcon />}
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
        </Tooltip>
      )}
    </Flex>
  );
};
interface ITableActions {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onSetting?: () => void;
  onShowQues?: () => void;
  // To disable button for some user: pass boolean value to the disable props
  onDisableEdit?: boolean;
  onDisableView?: boolean;
  onDisableDelete?: boolean;
  onDisableSetting?: boolean;
  onDisableShowQues?: boolean;
}

export default TableActions;
