type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: Props) => {
  // D-25: gutter 32 (mobile) / 48 (≥ 640), conteúdo até 1120
  return <div className={`container-page ${className}`}>{children}</div>;
};

export default Container;
