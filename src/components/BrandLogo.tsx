import Image from "next/image";

export default function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/home-biogas-kenya-logo.png"
      alt="Home Biogas Kenya"
      width={460}
      height={219}
      priority
      className={`h-auto w-[150px] object-contain ${className}`}
    />
  );
}
