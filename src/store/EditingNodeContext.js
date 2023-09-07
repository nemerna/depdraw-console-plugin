import React, { createContext, useContext } from 'react';

const EditingNodeContext = createContext();

export const useEditingNode = () => {
  return useContext(EditingNodeContext);
};

export default EditingNodeContext;
