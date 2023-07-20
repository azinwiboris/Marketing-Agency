import { DownloadIcon, CloseIcon } from "@sanity/icons";
import { Button } from "@sanity/ui";
import { nanoid } from "nanoid";
import React from "react";
import { ComponentType } from "react";
import { set, unset } from "sanity";
import defaultConfig from "tailwindcss/defaultConfig";

const ThemeFontWeight: ComponentType<any> = (props) => {
  const importDefaults = () => {
    const newValue = Object.entries(defaultConfig.theme?.fontWeight || {}).map(
      ([name, value]) => ({
        name,
        value: +value,
        _key: nanoid(),
      }),
    );
    props.onChange(set([...(props.value || []), ...newValue]));
  };

  const clearAll = () => {
    props.onChange(unset([]));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 4 }}>
        <Button
          fontSize={1}
          icon={DownloadIcon}
          padding={2}
          text="Import defaults"
          mode="ghost"
          tone="primary"
          onClick={importDefaults}
        />
        <Button
          fontSize={1}
          icon={CloseIcon}
          padding={2}
          text="Clear all"
          mode="ghost"
          tone="caution"
          onClick={clearAll}
        />
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default ThemeFontWeight;
