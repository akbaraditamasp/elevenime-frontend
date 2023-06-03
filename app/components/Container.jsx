export default function Container({
  element: Element = "div",
  containerClassName = "",
  className = "",
  children,
  ...props
}) {
  return (
    <div className={`flex justify-center px-5 lg:px-8 ${containerClassName}`}>
      <Element
        className={`w-full lg:w-[640px] xl:w-[1024px] 2xl:w-[1280px] ${className}`}
        {...props}
      >
        {children}
      </Element>
    </div>
  );
}
