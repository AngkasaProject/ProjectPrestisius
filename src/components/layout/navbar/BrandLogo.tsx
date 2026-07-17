type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
};

export default function BrandLogo({ size = "md" }: BrandLogoProps) {
  const sizeClass = {
    sm: "h-8",
    md: "h-9",
    lg: "h-11",
  };

  return (
    <a href="/" className="inline-flex items-center">
      <img
        src="/brand/logo.png"
        alt="TRIMIT"
        draggable={false}
        className={`${sizeClass[size]} w-auto`}
      />
    </a>
  );
}
