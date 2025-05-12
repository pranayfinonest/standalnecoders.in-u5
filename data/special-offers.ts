export interface SpecialOffer {
  id: string
  code: string
  description: string
  discount: string
  validUntil: string
  backgroundColor?: string
  textColor?: string
  priority?: number // Added priority field for sorting
}

// This can be replaced with data from a CMS or API
export const specialOffers: SpecialOffer[] = [
  {
    id: "offer1",
    code: "WELCOME10",
    description: "10% off your first order",
    discount: "10%",
    validUntil: "2025-12-31", // Updated date to ensure it shows in the demo
    backgroundColor: "#f0f9ff", // light blue
    textColor: "#0369a1",
    priority: 1,
  },
  {
    id: "offer2",
    code: "CYBER25",
    description: "25% off all cybersecurity services",
    discount: "25%",
    validUntil: "2025-11-30", // Updated date
    backgroundColor: "#f0fdf4", // light green
    textColor: "#166534",
    priority: 2,
  },
  {
    id: "offer3",
    code: "SUMMER15",
    description: "15% off website development",
    discount: "15%",
    validUntil: "2025-09-30", // Updated date
    backgroundColor: "#fff7ed", // light orange
    textColor: "#9a3412",
    priority: 3,
  },
  {
    id: "offer4",
    code: "BUNDLE20",
    description: "20% off when you bundle 3+ services",
    discount: "20%",
    validUntil: "2025-12-15", // Updated date
    backgroundColor: "#fdf4ff", // light purple
    textColor: "#86198f",
    priority: 4,
  },
  {
    id: "offer5",
    code: "FLASH30",
    description: "30% off - Today only!",
    discount: "30%",
    validUntil: "2025-08-15", // Updated date
    backgroundColor: "#fef2f2", // light red
    textColor: "#b91c1c",
    priority: 0, // Highest priority
  },
  {
    id: "offer6",
    code: "NEWCLIENT20",
    description: "20% off for new clients",
    discount: "20%",
    validUntil: "2025-12-31", // Updated date
    backgroundColor: "#f8fafc", // light slate
    textColor: "#334155",
    priority: 5,
  },
  {
    id: "offer7",
    code: "LOYALTY15",
    description: "15% off for returning customers",
    discount: "15%",
    validUntil: "2025-12-31", // Updated date
    backgroundColor: "#faf5ff", // light purple
    textColor: "#7e22ce",
    priority: 6,
  },
  {
    id: "offer8",
    code: "EARLYBIRD25",
    description: "25% off early bird discount",
    discount: "25%",
    validUntil: "2025-10-15", // Updated date
    backgroundColor: "#ecfdf5", // light green
    textColor: "#047857",
    priority: 7,
  },
]
