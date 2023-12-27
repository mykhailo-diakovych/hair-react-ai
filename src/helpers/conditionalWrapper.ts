export const ConditionalWrapper = ({
  wrapper,
  children
}: {
  wrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
}) => wrapper(children);
