import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    include: { offer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  // UTF-8 BOM for Excel compatibility in Czech
  const bom = "\uFEFF";
  const header = "Jmeno,Email,Telefon,Nabidka,Datum,Stav\n";
  const rows = leads
    .map((l) => {
      const name = `"${l.name.replace(/"/g, '""')}"`;
      const email = `"${l.email.replace(/"/g, '""')}"`;
      const phone = `"${(l.phone || "").replace(/"/g, '""')}"`;
      const offer = `"${(l.offer?.name || "Tipsport").replace(/"/g, '""')}"`;
      const date = `"${l.createdAt.toISOString()}"`;
      const status = `"${l.status}"`;
      return `${name},${email},${phone},${offer},${date},${status}`;
    })
    .join("\n");

  const csvContent = bom + header + rows;
  const dateStr = new Date().toISOString().split("T")[0];

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bonusly-leady-${dateStr}.csv"`,
    },
  });
}
