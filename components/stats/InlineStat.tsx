import Image from "next/image";

export interface inlineStatInterface {
  img: StaticImageData | StaticImageData[];
  text: string;
}
export const InlineStat: React.FC<inlineStatInterface> = ({ img, text }) => {
  return (
    <span className="flex gap-2 justify-center items-center">
      {Array.isArray(img) ? (
        img.map((x) => <Image {...x} key={x.src} height={16} width={16} />)
      ) : (
        <Image src={img} height={16} width={16} />
      )}
      <span>{text}</span>
    </span>
  );
};
