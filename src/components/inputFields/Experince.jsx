import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    if (e.key === 'Enter' && value.length > 2) {
      setIsLoading(true);
      try {
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GENAI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(value);
        const response = result.response;
        const responsibilities = response.text().split('\n').filter(line => line.trim() !== '');
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
    const currentDescription = experiences[index].companydescription || '';
    const newDescription = currentDescription ? `${currentDescription}\n${result}` : result;
    handleInputChange({ target: { name: 'companydescription', value: newDescription } }, index, 'experiences');
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
              <h6 className='font-bold text-xs my-10'>* indicates a required field</h6>
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
                    value={exp.month1}
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
                    value={exp.month2}
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
               
              </div>
              <ReactQuill
                theme="snow"
                value={exp.companydescription}
                onChange={(value) => handleDescriptionChange(value, index)}
                placeholder="Write something about the company..."
                className="mb-4"
              />
               <div className="flex justify-between text-lg my-2">
                <h3></h3>
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
                      <line x1="9" y1="12" x2="15" y="12" stroke="white" />
                      <line x1="12" y1="9" x2="12" y="15" stroke="white" />
                    </svg>
                    <h3>AI - Assist</h3>
                  </button>
                  {dropdownVisible && (
                    <div className="origin-top-left absolute right-0 mt-3 w-80 rounded-md shadow-lg bg-white">
                      <div className="absolute inline-block text-left">
                        
                        <input
                          type="text"
                          className="block w-80 px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={handleSearchChange}
                          onKeyDown={handleSearchChange}
                        />
                        {!isLoading && !error && searchResults.length > 0 && (
                          <ul className="mt-2">
                            {searchResults.map((result, idx) => (
                              <li
                                key={idx}
                                className="px-4 py-2 hover:bg-gray-100 hover:text-black bg-gray-800 text-white cursor-pointer text-xs"
                                onClick={() => handleSearchResultSelect(result, index)}
                              >
                                {result}
                              </li>
                            ))}
                          </ul>
                        )}
                        {isLoading && <div>Loading...</div>}
                        {error && <div className="text-red-500">{error}</div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteExperience(index)}
                className="text-red-500 hover:text-red-700 text-xs mb-4"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default Experience;
