import Input from "./Input";
import Select from "./Select";
import FileUpload from "./FileUpload";
import Radio from "./Radio";
import Password from "./Password";
import TextArea from "./TextArea";
import Editor from "./Editor";
import MultiSelect from "./MultiSelect";

function FormControl(props: any) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "password":
      return <Password {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "file":
      return <FileUpload {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "textArea":
      return <TextArea {...rest} />;
    case "editor":
      return <Editor {...rest} />;
    case "multiSelect":
      return <MultiSelect {...rest} />;

    default:
      return null;
  }
}

export default FormControl;
