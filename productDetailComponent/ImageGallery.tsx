export function ImageGallery({
  images,
  name,
  selectedImage,
  onSelectImage,
}: {
  images: string[];
  name: string;
  selectedImage: number;
  onSelectImage: (i: number) => void;
}) {
  return (
    <div className="flex gap-4">
      {/* Thumbnails — vertical strip on left */}
      {images.length > 1 && (
        <div className="flex flex-col gap-3 w-16 shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelectImage(i)}
              style={{
                border:
                  selectedImage === i
                    ? "1px solid var(--gold)"
                    : "1px solid #2a2520",
                opacity: selectedImage === i ? 1 : 0.5,
                transition: "all 0.2s ease",
              }}
              className="aspect-square overflow-hidden hover:opacity-100"
            >
              <img
                src={img}
                alt={`${name} view ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ aspectRatio: "3/4", backgroundColor: "var(--surface)" }}
      >
        <img
          src={images[selectedImage]}
          alt={name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Image counter */}
        {images.length > 1 && (
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
              backdropFilter: "blur(4px)",
            }}
            className="absolute bottom-4 right-4 text-[10px] tracking-widest uppercase px-3 py-1"
          >
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
