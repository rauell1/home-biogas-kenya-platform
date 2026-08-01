import ProjectForm from "@/components/admin/ProjectForm";
import { requirePermission } from "@/lib/guard";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function NewProject() {
  await requirePermission("projects.write");
  return (
    <div>
      <AdminHeader eyebrow="Draft → source review → technical review → media rights → published" title="New project" description="Create the record first; review states and media rights are managed after saving." />
      <div className="mt-8"><ProjectForm /></div>
    </div>
  );
}
