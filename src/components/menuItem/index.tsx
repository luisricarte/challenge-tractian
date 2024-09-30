import React from "react";
import { TreeNode } from "../../types/response";

export const MenuItem: React.FC<TreeNode> = (item) => {
  return (
    <div
      key={`item-list-${item.id}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <img src="./images/component.svg " alt="Component" />
      <span>{item.name}</span>
    </div>
  );
};
