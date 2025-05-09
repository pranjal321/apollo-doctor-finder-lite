
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Doctor } from '@/services/api';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="doctor-card overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Doctor Image and Availability */}
          <div className="relative">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name} 
              className="h-40 w-full md:w-40 object-cover"
            />
            {doctor.availableToday && (
              <Badge className="absolute top-3 left-3 bg-docfinder-green text-white">
                Available Today
              </Badge>
            )}
          </div>
          
          {/* Doctor Details */}
          <div className="p-4 flex-grow">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-bold text-lg">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-600">{doctor.experience} years experience</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-semibold">{doctor.rating}</span>
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold">{doctor.qualifications.join(", ")}</p>
                  <p className="text-sm text-gray-600">{doctor.location}</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 text-right">
                <p className="font-bold text-lg text-docfinder-blue">₹{doctor.consultationFee}</p>
                <p className="text-xs text-gray-500">Consultation Fee</p>
              </div>
            </div>
            
            {/* Next Available Slot and Book Button */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium">Next Available</p>
                <p className="text-sm text-docfinder-blue">{doctor.nextAvailable}</p>
              </div>
              <Button className="mt-2 sm:mt-0 w-full sm:w-auto bg-docfinder-blue hover:bg-docfinder-darkblue">
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
