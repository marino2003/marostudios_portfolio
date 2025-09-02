export default function Container({ children, className = "", ...props }) {
  return (
    <div className={`pt-6 max-w-7xl mx-auto px-12 ${className}`} {...props}>
      {children}
    </div>
  );
}
