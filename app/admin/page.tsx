import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [offerCount, articleCount, clickCount, subscriberCount, leadCount, recentClicks] = await Promise.all([
    prisma.offer.count({ where: { active: true } }),
    prisma.article.count(),
    prisma.click.count(),
    prisma.newsletterSubscriber.count({ where: { unsubscribed: false } }),
    prisma.lead.count(),
    prisma.click.findMany({
      include: { offer: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const stats = [
    { label: "Aktivní nabídky", value: offerCount, icon: "🎯" },
    { label: "Články", value: articleCount, icon: "📝" },
    { label: "Celkem kliknutí", value: clickCount, icon: "🖱️" },
    { label: "Zájemci (Leady)", value: leadCount, icon: "📋" },
    { label: "Newsletter odběratelé", value: subscriberCount, icon: "📧" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold text-navy">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-navy">Poslední kliknutí</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {recentClicks.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-slate-400">Zatím žádná kliknutí.</div>
          ) : (
            recentClicks.map((click) => (
              <div key={click.id} className="px-5 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-navy">{click.offer.name}</span>
                <span className="text-xs text-slate-400">
                  {new Date(click.createdAt).toLocaleString("cs-CZ")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
