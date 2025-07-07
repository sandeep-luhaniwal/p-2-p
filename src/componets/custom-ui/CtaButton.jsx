import Link from "next/link";

const CtaButton = ({
  children,
  left,
  onClick,
  className,
  transparent,
  url,
  blank,
  ...rest
}) => {
  return url ? (
    <Link {...rest}
      onClick={onClick}
      href={url}
      target={blank}
      className={`${className} ${left ? "ml-0 mr-auto text-left w-full" : "mx-auto w-full text-center flex justify-center"
        } text-white font-normal text-base leading-100 bg-purple py-3 lg:py-4 rounded-[10px] hover:bg-purple-light duration-300`}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${className} ${left ? "ml-0 mr-auto text-left w-full" : "mx-auto w-full text-center flex justify-center"
        } text-white font-normal text-base cursor-pointer leading-100 bg-purple py-3 lg:py-4 rounded-[10px] hover:bg-purple-light duration-300`}
    >
      {children}
    </button>
  );
};

export default CtaButton