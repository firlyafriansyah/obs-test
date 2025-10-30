import React from 'react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export default function ImageWithSkeleton({
  className,
  ...props
}: ImageWithSkeletonProps): React.ReactElement {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [props.src]);

  return (
    <div className="relative h-full w-full">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 h-full w-full animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
      )}
      <img
        {...props}
        src={props.src}
        alt={props.alt}
        loading={props.loading ?? 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full transition-opacity duration-300 ${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
