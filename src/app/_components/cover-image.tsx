import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
  cutout?: boolean; // recorte com fundo removido → contorno FX-EDGE-01 (D-02)
};

const CoverImage = ({ title, src, slug, cutout = false }: Props) => {
  const image = (
    <Image
      src={src}
      alt=""
      className={`w-full rounded-md ${cutout ? "fx-edge-01" : ""}`}
      width={1300}
      height={630}
    />
  );
  return slug ? (
    <Link href={`/posts/${slug}`} aria-label={title} tabIndex={-1}>
      {image}
    </Link>
  ) : (
    image
  );
};

export default CoverImage;
