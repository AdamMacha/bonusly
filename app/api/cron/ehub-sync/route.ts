import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { syncEhubTransactions } from "@/lib/ehub-api";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized cron invocation" },
      { status: 401 }
    );
  }

  const result = await syncEhubTransactions({
    trigger: "cron",
    lookbackDays: 90,
  });

  if (result.createdCount > 0 || result.updatedCount > 0) {
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    revalidatePath("/admin/provize");
    revalidatePath("/admin/uzivatele");
  }

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}
