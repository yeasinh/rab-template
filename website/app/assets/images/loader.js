export default function myImageLoader({ src, width, quality }) {
  if (src.startsWith("https")) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }
  if(src.startsWith(`${process.env.NEXT_PUBLIC_SERVER_FILE_PATH}`)){
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  // Default case for local images
  return `${process.env.NEXT_PUBLIC_LOCAL_FILE_PATH}${src}?w=${width}&q=${quality || 75}`;
}
