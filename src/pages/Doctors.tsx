
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDoctors, DoctorFilters } from '@/services/api';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import DoctorCard from '@/components/DoctorCard';
import Pagination from '@/components/Pagination';
import { Skeleton } from "@/components/ui/skeleton";

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<DoctorFilters>({
    specialty: 'General Physician',
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Sync URL search params with filters
  useEffect(() => {
    const newFilters: DoctorFilters = {};
    
    // Get filters from URL
    const locationParam = searchParams.get('location');
    const experienceParam = searchParams.get('experience');
    const availableTodayParam = searchParams.get('availableToday');
    const maxFeeParam = searchParams.get('maxFee');
    const searchParam = searchParams.get('search');
    
    // Set specialty to General Physician by default
    newFilters.specialty = 'General Physician';
    
    if (locationParam) newFilters.location = locationParam;
    if (experienceParam) newFilters.experienceMin = parseInt(experienceParam);
    if (availableTodayParam) newFilters.availableToday = availableTodayParam === 'true';
    if (maxFeeParam) newFilters.maxFee = parseInt(maxFeeParam);
    if (searchParam) newFilters.searchQuery = searchParam;
    
    setFilters(newFilters);
  }, [searchParams]);

  // Update URL when filters change
  const updateFilters = (newFilters: DoctorFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.specialty) params.set('specialty', newFilters.specialty);
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.experienceMin) params.set('experience', newFilters.experienceMin.toString());
    if (newFilters.availableToday) params.set('availableToday', newFilters.availableToday.toString());
    if (newFilters.maxFee) params.set('maxFee', newFilters.maxFee.toString());
    if (newFilters.searchQuery) params.set('search', newFilters.searchQuery);
    
    setSearchParams(params);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Fetch doctors with the current filters
  const { data, isLoading, error } = useQuery({
    queryKey: ['doctors', filters, currentPage],
    queryFn: () => fetchDoctors(filters, currentPage),
  });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="mb-4">
          <Skeleton className="h-[250px] w-full rounded-lg" />
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          Home &gt; Find Doctors &gt; General Physician
        </div>
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">General Physician</h1>
          <p className="text-gray-600 mt-2">
            Consult with top general physicians for common health issues, preventive care, and chronic disease management.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Left Sidebar */}
          <div className="w-full md:w-1/4">
            <FilterPanel 
              filters={filters} 
              onChange={updateFilters} 
            />
          </div>
          
          {/* Doctor Listings - Right Content */}
          <div className="w-full md:w-3/4">
            {isLoading ? (
              // Loading state
              renderSkeletons()
            ) : error ? (
              // Error state
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                <p>Failed to load doctors. Please try again later.</p>
              </div>
            ) : data?.data.length === 0 ? (
              // Empty state
              <div className="bg-white p-8 rounded-lg text-center">
                <h3 className="font-bold text-xl mb-2">No doctors found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              // Doctor listings
              <div className="space-y-4">
                {/* Results summary */}
                <p className="text-sm text-gray-600">
                  Showing {data?.data.length} of {data?.total} doctors
                </p>
                
                {/* Doctor cards */}
                {data?.data.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
                
                {/* Pagination */}
                {data && data.totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} DocFinder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Doctors;
