export const conditionalWrapper = (props) => {
  if (props.show)
    return <props.modal {...props.config}>{props.children}</props.modal>;
  return props.children;
};
