let globalPrincipal = null;

export const setGlobalPrincipal = (value) => {
  globalPrincipal = value;
};

export const getGlobalPrincipal = () => globalPrincipal;

export const clearGlobalPrincipal = () => {
  globalPrincipal = null; 
};
