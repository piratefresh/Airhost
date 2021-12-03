type Props = {
  children?: React.ReactNode;
  linkHref?: string;
};

export const PrimaryButton = ({ children, linkHref }: Props) => {
  return (
    <a
      href={linkHref}
      className="inline-flex items-center justify-center px-8 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      {children}
    </a>
  );
};
