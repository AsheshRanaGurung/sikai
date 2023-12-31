import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FilterIcon } from "@sikaai/assets/svgs";
import FormControl from "@sikaai/components/form/FormControl";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

export interface IFilterParams {
  type: string;
  filterOptions?: ISelectOptions[];
  setFilter?: (value: string) => void | Dispatch<SetStateAction<string>>;
}

interface ISelectOptions {
  label: string;
  value: string | number;
}

const Filter = ({ filter }: { filter: IFilterParams[] }) => {
  const { register } = useForm();
  return (
    <Menu>
      <MenuButton as={Button} variant={"secondary"}>
        <Flex justifyContent="center" alignItems="center" gap={1}>
          <Icon as={FilterIcon}></Icon>
          <Text> Filter </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <Tabs>
          <TabList>
            {filter.map(({ type }: IFilterParams, index: number) => {
              return <Tab key={index}>{type}</Tab>;
            })}
          </TabList>

          <TabPanels>
            {filter.map(({ type }: IFilterParams, index: number) => {
              return type === "Status" ? (
                <TabPanel key={index}>
                  <FormControl
                    control="radio"
                    options={[
                      { label: "Active", value: "active" },
                      { label: "Inactive", value: "inactive" },
                    ]}
                    size="md"
                    register={register}
                    name="Status"
                    // label={"Status"}
                    // error={t(errors.code?.message ?? "")}
                  />
                  <Button size={"lg"} mt={4}>
                    Filter
                  </Button>
                </TabPanel>
              ) : (
                <TabPanel key={index}>
                  <p>{type}</p>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </MenuList>
    </Menu>
  );
};

export default Filter;
