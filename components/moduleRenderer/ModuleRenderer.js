import React from "react";
import Text from "../m-text";
import List from "../m-list";
import Stage from "../m-stage";

const ModuleRenderer = ({module}) => {

  const contentTypeId = module.sys.contentType.sys.id;

  switch (contentTypeId) {
    case "m-list":
      return <List />;
    case "m-text":
      return <Text />;
    case "m-stage":
      return <Stage />;
    default:
      console.warn(`${contentTypeId} is not yet implemented`);
      return null;
  }
};

export default ModuleRenderer;