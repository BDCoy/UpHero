export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-12">
        <div className="grid gap-8 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
          <aside className="hidden md:block">
            <nav className="grid gap-2 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2">
                  <h3 className="font-medium">Account</h3>
                </div>
                <div className="px-4 py-3">
                  <div className="font-medium">Profile</div>
                  <div className="text-sm text-muted-foreground">
                    Manage your account settings
                  </div>
                </div>
              </div>
            </nav>
          </aside>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-muted-foreground">
                Manage your profile information and account settings.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
