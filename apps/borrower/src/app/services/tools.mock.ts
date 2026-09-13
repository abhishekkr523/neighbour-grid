export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  pricePerDay: number;
  securityDeposit: number;
  ownerId: string;
  ownerName: string;
  ownerRating: number;
  loanCount: number;
  imageUrl: string;
  lat: number;
  lng: number;
  distanceKm: number;
  hasVerifiedAudit: boolean;
}

export const MOCK_TOOLS: Tool[] = [
  {
    id: "t1",
    title: "Bosch Professional Hammer Drill",
    description: "Heavy duty rotary hammer drill. Includes SDS plus bits.",
    category: "Power Tools",
    pricePerDay: 250,
    securityDeposit: 1500,
    ownerId: "o1",
    ownerName: "Rahul Sharma",
    ownerRating: 4.9,
    loanCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop",
    lat: 12.971598,
    lng: 77.594566,
    distanceKm: 0.8,
    hasVerifiedAudit: true
  },
  {
    id: "t2",
    title: "Makita Angle Grinder 18V",
    description: "Cordless angle grinder. Battery and charger included.",
    category: "Power Tools",
    pricePerDay: 300,
    securityDeposit: 2000,
    ownerId: "o2",
    ownerName: "Priya Patel",
    ownerRating: 5.0,
    loanCount: 18,
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=600&auto=format&fit=crop",
    lat: 12.973598,
    lng: 77.592566,
    distanceKm: 1.2,
    hasVerifiedAudit: true
  },
  {
    id: "t3",
    title: "Kärcher High Pressure Washer",
    description: "Perfect for cleaning driveways and cars.",
    category: "Cleaning",
    pricePerDay: 400,
    securityDeposit: 3000,
    ownerId: "o3",
    ownerName: "Amit Kumar",
    ownerRating: 4.7,
    loanCount: 56,
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
    lat: 12.969598,
    lng: 77.596566,
    distanceKm: 2.1,
    hasVerifiedAudit: false
  },
  {
    id: "t4",
    title: "DeWalt Circular Saw",
    description: "7-1/4 inch circular saw with laser guide.",
    category: "Woodworking",
    pricePerDay: 350,
    securityDeposit: 2500,
    ownerId: "o4",
    ownerName: "Neha Gupta",
    ownerRating: 4.8,
    loanCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=600&auto=format&fit=crop",
    lat: 12.975598,
    lng: 77.598566,
    distanceKm: 2.5,
    hasVerifiedAudit: true
  }
];
