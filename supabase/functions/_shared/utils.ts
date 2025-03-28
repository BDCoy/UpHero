export const calculateEndDate = (plan: string): string => {
  const today = new Date();
  let endDate: Date | null;

  switch (plan) {
    case "free":
      endDate = new Date(today.setDate(today.getDate() + 3)); // 3 days from now
      break;
    case "freelancer":
      endDate = new Date(today.setMonth(today.getMonth() + 1)); // 1 month from now
      break;
    case "freelancer_pro":
      endDate = new Date(today.setMonth(today.getMonth() + 1)); // 1 month from now
      break;
    case "freelancer_agency":
      endDate = new Date(today.setMonth(today.getMonth() + 1)); // 1 month from now
      break;
    default:
      endDate = new Date(today.setMonth(today.getMonth() + 1)); // Fallback, should not happen
      break;
  }

  // Reset time to 00:00:00 to avoid time zone issues
  endDate?.setHours(0, 0, 0, 0);

  return endDate.toISOString();
};
