
import { toast } from "@/components/ui/sonner";

// Doctor types
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  qualifications: string[];
  location: string;
  consultationFee: number;
  rating: number;
  availableToday: boolean;
  nextAvailable: string;
  imageUrl: string;
}

export interface DoctorFilters {
  specialty?: string;
  location?: string;
  experienceMin?: number;
  availableToday?: boolean;
  minRating?: number;
  maxFee?: number;
  searchQuery?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Mock doctors data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rakesh Sharma",
    specialty: "General Physician",
    experience: 15,
    qualifications: ["MBBS", "MD - Internal Medicine"],
    location: "Mumbai",
    consultationFee: 800,
    rating: 4.8,
    availableToday: true,
    nextAvailable: "Today, 2:30 PM",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    id: "2",
    name: "Dr. Priya Patel",
    specialty: "General Physician",
    experience: 8,
    qualifications: ["MBBS", "DNB - Family Medicine"],
    location: "Delhi",
    consultationFee: 600,
    rating: 4.5,
    availableToday: false,
    nextAvailable: "Tomorrow, 10:00 AM",
    imageUrl: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    id: "3",
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    experience: 20,
    qualifications: ["MBBS", "MD - General Medicine", "DM - Cardiology"],
    location: "Bangalore",
    consultationFee: 1200,
    rating: 4.9,
    availableToday: true,
    nextAvailable: "Today, 5:15 PM",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "4",
    name: "Dr. Anjali Gupta",
    specialty: "General Physician",
    experience: 12,
    qualifications: ["MBBS", "MD - Internal Medicine"],
    location: "Chennai",
    consultationFee: 900,
    rating: 4.6,
    availableToday: true,
    nextAvailable: "Today, 1:00 PM",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "5",
    name: "Dr. Vikram Singh",
    specialty: "General Physician",
    experience: 18,
    qualifications: ["MBBS", "MD - General Medicine"],
    location: "Hyderabad",
    consultationFee: 1000,
    rating: 4.7,
    availableToday: false,
    nextAvailable: "Tomorrow, 11:30 AM",
    imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: "6",
    name: "Dr. Meena Reddy",
    specialty: "General Physician",
    experience: 10,
    qualifications: ["MBBS", "FCGP"],
    location: "Mumbai",
    consultationFee: 750,
    rating: 4.3,
    availableToday: true,
    nextAvailable: "Today, 6:45 PM",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "7",
    name: "Dr. Sanjay Verma",
    specialty: "General Physician",
    experience: 25,
    qualifications: ["MBBS", "MD - Internal Medicine", "FRCP"],
    location: "Delhi",
    consultationFee: 1500,
    rating: 4.9,
    availableToday: false,
    nextAvailable: "Day After Tomorrow, 9:00 AM",
    imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: "8",
    name: "Dr. Pooja Shah",
    specialty: "General Physician",
    experience: 7,
    qualifications: ["MBBS", "DNB - Family Medicine"],
    location: "Pune",
    consultationFee: 550,
    rating: 4.2,
    availableToday: true,
    nextAvailable: "Today, 4:00 PM",
    imageUrl: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    id: "9",
    name: "Dr. Alok Mishra",
    specialty: "General Physician",
    experience: 16,
    qualifications: ["MBBS", "MD - General Medicine"],
    location: "Kolkata",
    consultationFee: 850,
    rating: 4.6,
    availableToday: false,
    nextAvailable: "Tomorrow, 2:00 PM",
    imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: "10",
    name: "Dr. Nina Joshi",
    specialty: "General Physician",
    experience: 13,
    qualifications: ["MBBS", "MD - Internal Medicine"],
    location: "Ahmedabad",
    consultationFee: 700,
    rating: 4.4,
    availableToday: true,
    nextAvailable: "Today, 7:30 PM",
    imageUrl: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    id: "11",
    name: "Dr. Rohit Agarwal",
    specialty: "General Physician",
    experience: 22,
    qualifications: ["MBBS", "MD - General Medicine", "DM - Endocrinology"],
    location: "Bangalore",
    consultationFee: 1300,
    rating: 4.8,
    availableToday: false,
    nextAvailable: "Tomorrow, 12:15 PM",
    imageUrl: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    id: "12",
    name: "Dr. Sunita Kapoor",
    specialty: "General Physician",
    experience: 14,
    qualifications: ["MBBS", "DNB - General Medicine"],
    location: "Chennai",
    consultationFee: 950,
    rating: 4.5,
    availableToday: true,
    nextAvailable: "Today, 3:30 PM",
    imageUrl: "https://randomuser.me/api/portraits/women/57.jpg",
  },
];

// Simulate API calls with delays
const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get filtered doctors with pagination
export const fetchDoctors = async (
  filters: DoctorFilters = {},
  page: number = 1,
  limit: number = 4
): Promise<PaginatedResponse<Doctor>> => {
  try {
    await simulateDelay(800); // Simulate network delay

    let filteredDoctors = [...mockDoctors];

    // Apply filters
    if (filters.specialty) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.specialty.toLowerCase() === filters.specialty?.toLowerCase()
      );
    }

    if (filters.location) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.location.toLowerCase() === filters.location?.toLowerCase()
      );
    }

    if (filters.experienceMin !== undefined) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.experience >= filters.experienceMin!
      );
    }

    if (filters.availableToday !== undefined) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.availableToday === filters.availableToday
      );
    }

    if (filters.minRating !== undefined) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.rating >= filters.minRating!
      );
    }

    if (filters.maxFee !== undefined) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.consultationFee <= filters.maxFee!
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredDoctors = filteredDoctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialty.toLowerCase().includes(query) ||
          doctor.location.toLowerCase().includes(query)
      );
    }

    // Calculate pagination
    const total = filteredDoctors.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

    return {
      data: paginatedDoctors,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    toast.error("Failed to load doctors. Please try again later.");
    throw error;
  }
};

// Simulate adding a new doctor
export const addDoctor = async (doctor: Omit<Doctor, "id">): Promise<Doctor> => {
  try {
    await simulateDelay(1000); // Simulate network delay
    
    // Generate a random ID
    const newDoctor: Doctor = {
      ...doctor,
      id: Math.floor(Math.random() * 10000).toString(),
    };
    
    // In a real app, we'd make a POST request to an API endpoint
    console.log("Added new doctor:", newDoctor);
    toast.success("Doctor added successfully");
    
    return newDoctor;
  } catch (error) {
    console.error("Error adding doctor:", error);
    toast.error("Failed to add doctor. Please try again later.");
    throw error;
  }
};

// Get available specialties
export const getSpecialties = async (): Promise<string[]> => {
  await simulateDelay(300);
  return ["General Physician", "Cardiologist", "Dermatologist", "Pediatrician", "Gynecologist"];
};

// Get available locations
export const getLocations = async (): Promise<string[]> => {
  await simulateDelay(300);
  return [...new Set(mockDoctors.map(doctor => doctor.location))];
};
