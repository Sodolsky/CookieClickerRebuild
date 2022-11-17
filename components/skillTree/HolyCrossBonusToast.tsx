import Image from "next/image";

interface HolyCrossBonusToastInterface {
  imagePath: string;
  text: string;
}
export const HolyCrossBonusToast: React.FC<HolyCrossBonusToastInterface> = ({
  imagePath,
  text,
}) => {
  return (
    <span className="flex gap-1 justify-center items-center">
      <Image width={16} height={16} src={imagePath} />
      <span>{text}</span>
    </span>
  );
};
