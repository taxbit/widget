import { ListItem } from "../types";

const utils = {
  getItemTitle: (item: ListItem, visibleFields: string[]) => {
    return visibleFields.length
      ? visibleFields.map((field) => item[field]).join(", ")
      : "";
  },
};

export default utils;
