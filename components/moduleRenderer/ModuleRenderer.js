import React from "react";
import Text from "../m-text";
import List from "../m-list";
import Stage from "../m-stage";
import Hero from "../m-hero";

const ModuleRenderer = ({module}) => {

  const contentTypeId = module.sys.contentType.sys.id;

  switch (contentTypeId) {
    case "m-list":
      return <List content={module} />
    case "m-text":
      return <Text content={module} />;
    case "m-hero":
      return <Hero content={module} />
    case "m-stage":
      return <Stage content={module} />
    default:
      console.warn(`${contentTypeId} is not yet implemented`);
      return null;
  }
};

export default ModuleRenderer;