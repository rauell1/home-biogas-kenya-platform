import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES } from "../page";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return {};
  return pageMetadata({ locale, path: `/training/${slug}`, title: course.name, description: course.summary });
}

export default async function CourseDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <PageHeader
      eyebrow={`Course · ${course.days} days`}
      title={course.name}
      lede={course.summary}
      meta={[
        { label: "Duration", value: `${course.days} days` },
        { label: "Format", value: "Practical, on a working plant" },
        { label: "Language", value: "English · Kiswahili" },
        { label: "Certificate", value: "Issued on completion" },
      ]}
      actions={[
        { label: "Register interest", href: `/${locale}/contact`, accent: true },
        { label: "All courses", href: `/${locale}/training` },
      ]}
    />
  );
}
