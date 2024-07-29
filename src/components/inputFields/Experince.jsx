import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const Experience = ({
  experiences = [],
  handleInputChange,
  addExperience,
  deleteExperience,
  company,
  end_date,
  location,
  position,
  dates
}) => {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [isExperienceComplete, setIsExperienceComplete] = useState(false);

  useEffect(() => {
    checkExperienceCompletion();
  }, [experiences]);

  const checkExperienceCompletion = () => {
    const complete = experiences.every(exp =>
      exp.Company &&
      exp.role &&
      exp.month1 &&
      (exp.month2 || isCurrentlyWorking) &&
      exp.companydescription
    );
    setIsExperienceComplete(complete);
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
  
    if (e.key === 'Enter' && value.length > 2) { // Check if Enter key is pressed
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
  
        const response = await fetch('https://api.perfectresume.ca/api/user/ai-resume-profexp-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            key: "professional_experience",
            keyword: "Cecklist of professional experience in manner of content and informations ",
            Content: value
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        const responsibilities = data.data.resume_analysis.responsibilities || [];
        setSearchResults(responsibilities);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  
  const handleDescriptionChange = (value, index) => {
    handleInputChange({ target: { name: 'companydescription', value } }, index, 'experiences');
  };
  
  const handleSearchResultSelect = (result, index) => {
    handleInputChange({ target: { name: 'companydescription', value: result } }, index, 'experiences');
    setSearchValue(''); // Clear search input after selection if needed
    setSearchResults([]); // Clear search results after selection
  };
  const handleSuggestionSelect = (result) => {
    // Handle selection of a suggestion and update state
    handleInputChange({ target: { name: 'companydescription', value: result } }, 0, 'experiences');
    setDropdownVisible(false); 
  }

  return (
    <div className='mt-4 text-xs sm:text-xs md:text-xs lg:text-xs'>
      <div className="px-5 w-full">
        {experiences.map((exp, index) => (
          <div key={index} className="flex mt-4">
            <div className="w-full">
              <h6 className='font-bold text-xs my-10 '>* indicates a required field</h6>
              <div className="flex gap-4">
                <div className="w-3/4">
                  <label htmlFor="Company" className="block text-xs font-medium text-gray-700 mb-2">
                    Who Did You Do This For?
                  </label>
                  <input 
                    type="text" 
                    name="Company" 
                    value={exp.Company || company}
                    onChange={(e) => handleInputChange(e, index, 'experiences')}
                    placeholder="Company Name" 
                    className="w-full p-3 mb-4 border border-black rounded-lg"
                  />
                </div>
                <div className="w-3/4">
                  <label htmlFor="role" className="block text-xs font-medium font-medium mb-2">
                    What Was Your Title? *
                  </label>
                  <input 
                    type="text" 
                    name="role" 
                    value={exp.role || position}
                    onChange={(e) => handleInputChange(e, index, 'experiences')}
                    placeholder="Role" 
                    className="w-full p-3 mb-4 border border-black rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 w-1/3 pe-2">
                <div className="w-3/4">
                  <label htmlFor="month1" className="block text-xs font-medium text-gray-700 mb-2">
                    Start Date: 
                  </label>
                  <input 
                    type="month" 
                    name="month1" 
                    value={exp.month1 }
                    onChange={(e) => handleInputChange(e, index, 'experiences')}
                    className="w-full p-3 mb-4 border border-black rounded-lg"
                  /> 
                </div>

                <div className="w-3/4">
                  <label htmlFor="month2" className="block text-xs font-medium text-gray-700 mb-2">
                    End Date: 
                  </label>
                  <input 
                    type="month" 
                    name="month2" 
                    value={exp.month2 }
                    onChange={(e) => handleInputChange(e, index, 'experiences')}
                    disabled={isCurrentlyWorking}
                    className="w-full p-3 mb-4 border border-black rounded-lg"
                  />
                </div>
              </div>

              <input
                type="checkbox" 
                id={`currentlyWorking${index}`}
                checked={isCurrentlyWorking}
                onChange={() => {
                  setIsCurrentlyWorking(!isCurrentlyWorking);
                  handleInputChange(
                    { target: { name: "month2", value: isCurrentlyWorking ? "" : "Present" } },
                    index,
                    "experiences"
                  );
                }}
                className="mr-2 mb-4"
              /> Currently Working

              <div className="w-3/4">
                <label htmlFor="companyplace" className="block text-xs text-gray-900 mb-2 font-semibold">
                  Company Location 
                </label>
                <input 
                  type="text" 
                  name="companyplace" 
                  value={exp.companyplace || location}
                  onChange={(e) => handleInputChange(e, index, 'experiences')}
                  placeholder="e.g. Delhi, India" 
                  className="w-full p-3 mb-4 border border-black rounded-lg"
                />
              </div>

              <div className="flex justify-between text-lg my-2">
                <h3>Description</h3>
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <svg
                      className="h-4 w-4 text-white bg-black rounded-full m-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <line x1="9" y1="12" x2="15" y2="12" stroke="white" />
                      <line x1="12" y1="9" x2="12" y2="15" stroke="white" />
                    </svg>
                    <h3>AI - Assist</h3>
                  </button>
                  {dropdownVisible && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="relative inline-block text-left">
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={handleSearchChange}
                          onKeyDown={handleSearchChange}
                        />
                        {!isLoading && !error && searchResults.length > 0 && (
                          <ul className="mt-2">
                            {searchResults.map((result, index) => (
                              <li
                                key={index}
                                className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionSelect(result, index)}
                              >
                                {result}
                              </li>
                            ))}
                          </ul>
                        )}
                        {error && <div className="text-red-500">{error}</div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
               <ReactQuill
                value={exp.companydescription || ''}
                onChange={(value) => handleDescriptionChange(value, index)}
                className="w-full h-40 p-2 mb-4 break-all"
              />

              <button
                type="button"
                onClick={() => deleteExperience(index)}
                className="mt-10 text-red-500"
              >
                Delete Experience
              </button>
            </div>
          </div>
        ))}
        <button className="font-bold text-lg flex items-center" onClick={addExperience}>
          <h3>Add Item</h3>
          <svg className="h-5 w-5 text-white bg-black rounded-full m-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <line x1="9" y1="12" x2="15" y2="12" stroke="white" />
            <line x1="12" y1="9" x2="12" y2="15" stroke="white" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Experience;
