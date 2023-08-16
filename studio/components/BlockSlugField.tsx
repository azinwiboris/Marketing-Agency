import { slugify } from "../../helpers/utils/string";
import { Stack, Text } from "@sanity/ui";
import React from "react";
import { ComponentType } from "react";
import { Path, useFormValue } from "sanity";

export type BlockSlugFieldProps = {
  value?: string;
  document?: { _type: string; _id: string };
  renderDefault?: (props: any) => any;
  path: Path;
};

export const BlockSlugField: ComponentType<any> = (
  props: BlockSlugFieldProps,
) => {
  const { value, renderDefault } = props;

  const containerValue = useFormValue(props.path.slice(0, -1)) as any;

  return (
    <Stack space={2}>
      {renderDefault && <div>{renderDefault(props)}</div>}
      <Text muted size={1}>
        #{slugify((value as any)?.current || containerValue?.title)}
      </Text>
    </Stack>
  );
};

export default BlockSlugField;
