export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dashboard-fade-in">{children}</div>;
}
