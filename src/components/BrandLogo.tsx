import Image from "next/image";

export default function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/home-biogas-kenya-logo.png"
      alt="Home Biogas Kenya"
      width={460}
      height={219}
      priority
      unoptimized
      sizes="(max-width: 640px) 150px, 190px"
      className={`h-auto w-[160px] object-contain ${className}`}
    />
  );
}
