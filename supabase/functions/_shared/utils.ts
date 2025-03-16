export const calculateEndDate = (plan: string): string => {
  const today = new Date();
  let endDate: Date | null;

  switch (plan) {
    case "free":
      endDate = new Date(today.setDate(today.getDate() + 3)); // 3 days from now
      break;
    case "pro":
      endDate = new Date(today.setMonth(today.getMonth() + 1)); // 1 month from now
      break;
    case "pro_3months":
      endDate = new Date(today.setMonth(today.getMonth() + 3)); // 3 months from now
      break;
    default:
      endDate = today; // Fallback, should not happen
      break;
  }

  // Reset time to 00:00:00 to avoid time zone issues
  endDate?.setHours(0, 0, 0, 0);

  return endDate.toISOString();
};
