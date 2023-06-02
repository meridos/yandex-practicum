export const removeRouteState = (state: { url: string }[], url: string) => {
  const index = state.findIndex(({ url: route }) => route === url);
  return state.slice(0, index);
};
