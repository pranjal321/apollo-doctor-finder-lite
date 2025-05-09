
import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { getLocations, getSpecialties, DoctorFilters } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  filters: DoctorFilters;
  onChange: (filters: DoctorFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [experienceValue, setExperienceValue] = useState<number>(filters.experienceMin || 0);
  const [feeValue, setFeeValue] = useState<number>(filters.maxFee || 2000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [locationsData, specialtiesData] = await Promise.all([
          getLocations(),
          getSpecialties()
        ]);
        setLocations(locationsData);
        setSpecialties(specialtiesData);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  const handleFilterChange = (key: keyof DoctorFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onChange(newFilters);
  };

  const handleExperienceChange = (value: number[]) => {
    setExperienceValue(value[0]);
    handleFilterChange('experienceMin', value[0]);
  };

  const handleFeeChange = (value: number[]) => {
    setFeeValue(value[0]);
    handleFilterChange('maxFee', value[0]);
  };

  const clearAllFilters = () => {
    setExperienceValue(0);
    setFeeValue(2000);
    onChange({});
  };

  const filterContent = (
    <>
      <div className="py-4">
        <h3 className="text-sm font-semibold mb-3">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="available-today" 
            checked={filters.availableToday || false}
            onCheckedChange={(checked) => 
              handleFilterChange('availableToday', checked === true)
            }
          />
          <label htmlFor="available-today" className="text-sm">
            Available Today
          </label>
        </div>
      </div>
      
      <div className="py-4 border-t">
        <h3 className="text-sm font-semibold mb-3">Location</h3>
        <div className="space-y-2">
          {locations.map(location => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox 
                id={`location-${location}`} 
                checked={filters.location === location}
                onCheckedChange={(checked) => 
                  handleFilterChange('location', checked ? location : undefined)
                }
              />
              <label htmlFor={`location-${location}`} className="text-sm">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="py-4 border-t">
        <h3 className="text-sm font-semibold mb-3">Experience</h3>
        <div className="px-2">
          <Slider
            defaultValue={[experienceValue]}
            max={25}
            step={1}
            onValueChange={handleExperienceChange}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">0 years</span>
            <span className="text-xs text-gray-500">{experienceValue}+ years</span>
          </div>
        </div>
      </div>

      <div className="py-4 border-t">
        <h3 className="text-sm font-semibold mb-3">Consultation Fee</h3>
        <div className="px-2">
          <Slider
            defaultValue={[feeValue]}
            max={2000}
            step={100}
            onValueChange={handleFeeChange}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">₹0</span>
            <span className="text-xs text-gray-500">Up to ₹{feeValue}</span>
          </div>
        </div>
      </div>

      <div className="py-4 border-t">
        <Button 
          variant="outline" 
          className="w-full text-docfinder-blue border-docfinder-blue"
          onClick={clearAllFilters}
        >
          Clear All Filters
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.location && (
          <Badge 
            variant="outline" 
            className="filter-badge cursor-pointer"
            onClick={() => handleFilterChange('location', undefined)}
          >
            Location: {filters.location} ×
          </Badge>
        )}
        {filters.experienceMin && filters.experienceMin > 0 && (
          <Badge 
            variant="outline" 
            className="filter-badge cursor-pointer"
            onClick={() => {
              setExperienceValue(0);
              handleFilterChange('experienceMin', undefined);
            }}
          >
            {filters.experienceMin}+ years experience ×
          </Badge>
        )}
        {filters.availableToday && (
          <Badge 
            variant="outline" 
            className="filter-badge cursor-pointer"
            onClick={() => handleFilterChange('availableToday', undefined)}
          >
            Available Today ×
          </Badge>
        )}
        {filters.maxFee && filters.maxFee < 2000 && (
          <Badge 
            variant="outline" 
            className="filter-badge cursor-pointer"
            onClick={() => {
              setFeeValue(2000);
              handleFilterChange('maxFee', undefined);
            }}
          >
            Up to ₹{filters.maxFee} ×
          </Badge>
        )}
      </div>
      
      {/* Mobile Filters (Collapsible) */}
      {showMobileFilters && (
        <div className="md:hidden bg-white rounded-lg shadow-lg p-4 mb-4">
          {filterContent}
        </div>
      )}
      
      {/* Desktop Filters (Always visible) */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg p-4">
        <h2 className="font-bold text-lg mb-4">Filters</h2>
        {filterContent}
      </div>
    </>
  );
};

export default FilterPanel;
