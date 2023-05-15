import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { sikaai_colors } from "@sikaai/theme/color";

export interface IEditor {
  data?: string;
  height?: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  onChange?: (data: string) => void;
  onBlur?: (data: string | undefined) => void;
  onInit?: (editor: ClassicEditor) => void;
}

const Editor = ({
  data,
  height,
  onInit,
  onChange,
  onBlur,
  label,
  helperText,
  required,
  error,
}: IEditor) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel fontWeight={600} fontSize={"18px"}>
          {label}
          {required && (
            <span style={{ color: sikaai_colors.black }}>&nbsp;*</span>
          )}
        </FormLabel>
      )}

      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={{
          removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"],
        }}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
          editor?.editing.view.change(writer => {
            writer.setStyle(
              "height",
              `${height ?? 200}px`,
              editor.editing.view.document.getRoot()
            );
          });
          onInit && onInit(editor);
        }}
        onChange={(_event, editor) => {
          const data = editor.getData();
          onChange && onChange(data);
        }}
        onBlur={(_event, editor) => {
          const data = editor.getData();
          onChange && onChange(data);
          onBlur && onBlur(data);
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
export default Editor;
