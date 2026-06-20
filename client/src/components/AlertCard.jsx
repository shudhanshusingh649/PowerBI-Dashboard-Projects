function AlertCard({ zone, risk }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      {zone} - {risk}
    </div>
  );
}