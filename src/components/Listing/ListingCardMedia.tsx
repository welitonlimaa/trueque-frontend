type Props = {
  src?: string;
  alt: string;
  className?: string;
};

export function ListingCardMedia({ src, alt, className }: Props) {
  if (!src) return null;

  return (
    <div
      className={`w-full aspect-square overflow-hidden rounded bg-gray-100 ${className ?? ''}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}