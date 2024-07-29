import React, { useState, useEffect } from 'react';
import Formheader from '../forms/Formheader';

function Details({ details = [], handleInputChange, image, setImage, firstname ,address,phone,email,profession}) {
  const [showGithub, setShowGithub] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  //const [image, setImage] = useState(null);



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };
console.log(image);


  useEffect(() => {
    const imageInput = document.getElementById('profilePicture');
    if (imageInput) {
      imageInput.value = '';
    }
  }, [image]);

  const toggleGithub = (index) => {
    setShowGithub(!showGithub);
    if (!showGithub) {
      const updatedDetails = [...details];
      updatedDetails[index] = { ...updatedDetails[index], github: '' };
      handleInputChange({ target: { name: 'github', value: '' } }, index, 'details');
    }
  };
  
  const toggleProjects = (index) => {
    setShowProjects(!showProjects);
    if (!showProjects) {
      const updatedDetails = [...details];
      updatedDetails[index] = { ...updatedDetails[index], projects: '' };
      handleInputChange({ target: { name: 'projects', value: '' } }, index, 'details');
    }
  };

  const toggleLanguage = (index) => {
    setShowLanguage(!showLanguage);
    if (!showLanguage) {
      const updatedDetails = [...details];
      updatedDetails[index] = { ...updatedDetails[index], Language: '' };
      handleInputChange({ target: { name: 'Language', value: '' } }, index, 'details');
    }
  };

  const toggleAchievement = (index) => {
    setShowAchievement(!showAchievement);
    if (!showAchievement) {
      const updatedDetails = [...details];
      updatedDetails[index] = { ...updatedDetails[index], Achievement: '' };
      handleInputChange({ target: { name: 'Achievement', value: '' } }, index, 'details');
    }
  };

  const deleteText = (field, index) => {
    const updatedDetails = [...details];
    updatedDetails[index] = { ...updatedDetails[index], [field]: '' };
    handleInputChange({ target: { name: field, value: '' } }, index, 'details');
    if (field === 'github') {
      setShowGithub(false);
    } else if (field === 'projects') {
      setShowProjects(false);
    }
    else if (field === 'Language') {
      setShowLanguage(false);
    }
    else if (field === 'Achievement') {
      setShowAchievement(false);
    }
  };

  const areAllDetailsFilled = () => {
    return details.every(del => Object.values(del).every(val => val.trim() !== ''));
  };

  return (
    <>
      <div className="font-thin  text-xs sm:text-xs md:text-xs lg:text-xs">
        <div className='px-5 mt-7'>
          <h1 className='text-xl font-semibold mb-3 '>What’s the best way for employers to contact you?</h1>
          <h1 className='text-xs'>We suggest including an email and phone number.</h1>
          <h6 className='font-bold text-xs my-4 '>* indicates a required field</h6>
        </div>
        {areAllDetailsFilled() && (
          <div className=" top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-red-900 rounded-full"></div>
        )}
        {details.map((del, index) => (
          <div key={index} className=" mt-8 ">
            <div className="m-2 px-3 gap-3 w-full">
              <div className="">
                <div className="flex gap-10 justify-around ">
                  <div className="w-3/5 justify-center px-10">
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded Profile"
                        className="p-2"
                        style={{ height: '150px' }}
                      />
                    ) : (
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt="Dummy Profile"
                        className="p-2"
                        style={{ height: '150px' }}
                      />
                    )}
                    <label
                      htmlFor="profilePicture"
                      className="block text-sm font-medium   mb-4 text-center  py-2 rounded-full border-blue-950 border-2"
                    >
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="w-3/4">
                    <div className="">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        First/Last Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={del.name ||firstname || ""}
                        onChange={(e) => handleInputChange(e, index, 'details')}
                        placeholder="e.g. Ben, e.g. Dexter"
                        className="w-full p-2 mb-4 border border-black rounded-lg "
                      />
                    </div>
                    <div className="">
                      <label htmlFor="Profession" className="block text-sm font-medium text-gray-700 mb-2">
                        Profession
                      </label>
                      <input
                        type="text"
                        name="Profession"
                        value={del.Profession || profession ||""}
                        onChange={(e) => handleInputChange(e, index, 'details')}
                        placeholder="e.g. Software Engineer"
                        className="w-full p-2 mb-4 border border-black rounded-lg "
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-3/4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={del.address  || address ||""}
                      onChange={(e) => handleInputChange(e, index, 'details')}
                      placeholder="e.g. City, e.g. Country"
                      className="w-full p-2 mb-4 border border-black rounded-lg"
                    />
                  </div>
                  <div className="w-3/4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-black mb-2">
                      Phone
                    </label>
                    <input
  type="text"
  name="phoneNumber"
  value={del.phoneNumber || phone || ""}
  onChange={(e) => handleInputChange(e, index, 'details')}
  placeholder="e.g. +91 22 1234 5677"
  className="w-full p-2 mb-4 border border-black rounded-lg"
/>

                                      </div>
                                    </div>
                                    <div className="flex gap-6">
                                      <div className="w-3/4">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                          Email*
                                        </label>
                                        <input
                                          type="email"
                                          name="email"
                                          value={ del.email ||email ||""}
                                          onChange={(e) => handleInputChange(e, index, 'details')}
                                          placeholder="e.g. dexter.ben"
                                          className="w-full p-2 mb-4 border border-black rounded-lg"
                                          required
                                        />
                                      </div>
                                      <div className="w-3/4">
                                        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                                          Linkdin:
                                        </label>
                                        <input
                                          type="text"
                                          name="link"
                                          value={del.link}
                                          onChange={(e) => handleInputChange(e, index, 'details')}
                                          placeholder=" add link"
                                          className="w-full p-2 mb-4 border border-black rounded-lg"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <h3 className='my-4 font-bold'>Add additional information to your resume <span className='font-normal'>(optional)</span></h3>
                                  <div className='flex gap-7'>
                                    <div>
                                      <button className="font- text-lg flex items-center border-2 border-black rounded-full py-1 px-5 my-3" onClick={() => toggleGithub(index)}>
                                        <h3>GitHub +</h3>
                                      </button>
                                      {showGithub && (
                                        <>
                                          <div className="">
                                            <input
                                              type="text"
                                              name="github"
                                              value={del.github}
                                              onChange={(e) => handleInputChange(e, index, 'details')}
                                              placeholder=" add github"
                                              className="w-full p-2 mb-4 border border-black rounded-lg"
                                            />
                                          </div>
                                          <button
                                            className="font-bold text-lg flex items-center"
                                            onClick={() => deleteText('github', index)}
                                          >
                                            Delete
                                          </button>
                                        </>
                                      )}
                                    </div>
                                    <div>
                                      <button className=" text-lg flex items-center border-2 border-black rounded-full py-1 px-5 my-3" onClick={() => toggleLanguage(index)}>
                                        <h3>Language - Expertise +</h3>
                                      </button>
                                      {showLanguage && (
                                        <>
                                          <div className="">
                                            <input
                                              type="text"
                                              name="Language"
                                              value={del.Language}
                                              onChange={(e) => handleInputChange(e, index, 'details')}
                                              placeholder=" add Language"
                                              className="w-full p-2 mb-4 border border-black rounded-lg"
                                            />
                                          </div>
                                          <button
                                            className="font-bold text-lg flex items-center"
                                            onClick={() => deleteText('Language', index)}
                                          >
                                            Delete
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className='flex gap-9'>
                                    <div>
                                      <button className=" text-lg flex items-center border-2 border-black rounded-full py-1 px-5 my-3" onClick={() => toggleProjects(index)}>
                                        <h3>Projects +</h3>
                                      </button>
                                      {showProjects && (
                                        <>
                                          <div className="">
                                            <input
                                              type="text"
                                              name="projects"
                                              value={del.projects}
                                              onChange={(e) => handleInputChange(e, index, 'details')}
                                              placeholder=" add projects"
                                              className="w-full p-2 mb-4 border border-black rounded-lg"
                                            />
                                          </div>
                                          <button
                                            className="font-bold text-lg flex items-center"
                                            onClick={() => deleteText('projects', index)}
                                          >
                                            Delete
                                          </button>
                                        </>
                                      )}
                                    </div>
                                    <div>
                                      <button className=" text-lg flex items-center border-2 border-black rounded-full py-1 px-5 my-3" onClick={() => toggleAchievement(index)}>
                                        <h3>Awards & Achievement +</h3>
                                      </button>
                                      {showAchievement && (
                                        <>
                                          <div className="">
                                            <input
                                              type="text"
                                              name="Achievement"
                                              value={del.Achievement}
                                              onChange={(e) => handleInputChange(e, index, 'details')}
                                              placeholder=" add Achievement"
                                              className="w-full p-2 mb-4 border border-black rounded-lg"
                                            />
                                          </div>
                                          <button
                                            className="font-bold text-lg flex items-center"
                                            onClick={() => deleteText('Achievement', index)}
                                          >
                                            Delete
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    }
                    
                    export default Details;
                    
