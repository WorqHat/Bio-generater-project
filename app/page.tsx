"use client"
import { IconSquareRoundedNumber1Filled, IconSquareRoundedNumber2Filled, IconSquareRoundedNumber3Filled } from "@tabler/icons-react";
import React, { useEffect, useState } from 'react';
import Layout from './layout';
import Image from 'next/image';
const socialMediaLinks = [
  { name: 'Instagram', icon: '/instagram-icon.svg', url: 'https://instagram.com/worqhat' },
  { name: 'Discord', icon: '/discord-icon.svg', url: 'https://discord.gg/KHh9mguKBx' },
  { name: 'LinkedIn', icon: '/linkedin-icon.svg', url: 'https://linkedin.com/company/worqhat' },
  { name: 'Twitter', icon: '/twitter-icon.svg', url: 'https://twitter.com/worqhat' },
  { name: 'GitHub', icon: '/github-icon.svg', url: 'https://github.com/worqhat' },
];
async function fetchBioData(question: string,
  preserveHistory: boolean,
  historyObject: any,
  randomness: boolean) {
  const API_ENDPOINT = 'https://api.worqhat.com/api/ai/content/v2';
  const API_KEY = 'U2FsdGVkX187FPQxzgbmIVjXh3O1+xyor30KWVrIBMuFEqGv8NfzXPjE53e3Ju+T';
  const ORG_KEY = 'U2FsdGVkX19lq3bhhF5TRouMiyL2HvEBD2V5j5nNl6dNL9JWPbsXW0rqlzssW8GieFki6oRVDKTb/z01Hc7m+Q==';

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'x-org-key': ORG_KEY,
    },
    body: JSON.stringify({
      question,
      preserve_history: preserveHistory,
      history_object: historyObject,
      randomness,
    }),
  };

  const response = await fetch(API_ENDPOINT, requestOptions);
  const data = await response.json();
  return data;
}

const MyPage = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [vibeValue, setVibeValue] = useState('');
  const [platformValue, setPlatformValue] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');

  const handleGenerateBioClick = async () => {
    let question = '';

    // Create the question based on the input values
    if (platformValue === 'Linkedin') {
      question = `Generate a ${vibeValue.toLowerCase()} LinkedIn bio: ${textAreaValue}`;
    } else if (platformValue === 'Twitter') {
      question = `Create a ${vibeValue.toLowerCase()} Twitter bio: ${textAreaValue}`;
    }

    const responseData = await fetchBioData(question, true, {}, false);

    setGeneratedBio(responseData?.content || '');
  };

  return (
    <Layout>
      <div className="container">
      <div className='logo' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'initial', marginLeft: '10px', marginTop: "30px" }}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} />

          <div className='social-icons' style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px', marginTop: "-30px" }}>
            {socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>
                <Image src={link.icon} alt={link.name} width={20} height={20} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h1>Generate your next Twitter bio using Chatgpt</h1>
        </div>

        <div className="icon-heading">
          <IconSquareRoundedNumber1Filled size={32} />
          <h2 className="steps">Copy your current bio</h2>
        </div>
        <textarea
          className="my-textarea"
          placeholder="eg. Senior Developer Advocate @Worqhat. Tweeting about web development, AI, and React / Next.js, Writing nutlope.substack.com."
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />

        <div className="icon-heading">
          <IconSquareRoundedNumber2Filled size={32} />
          <h2 className="steps">Select your vibe</h2>
        </div>
        <div>
          <select
            className="menuvibe"
            value={vibeValue}
            onChange={(e) => setVibeValue(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Funny">Funny</option>
          </select>
        </div>

        <div className="icon-heading">
          <IconSquareRoundedNumber3Filled size={32} />
          <h2 className="steps">Select the platform</h2>
        </div>
        <div>
          <select
            className="menuplatform"
            value={platformValue}
            onChange={(e) => setPlatformValue(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Linkedin">Linkedin</option>
            <option value="Twitter">Twitter</option>
          </select>
        </div>

        <button className="generatebtn" onClick={handleGenerateBioClick}>
          Generate your bio
        </button>
        {generatedBio && (
  <div 
  className="generated-bio-container">
    <h2 className="generated-bio-heading">Your Generated Bio</h2>
    <p className="generated-bio">
      {generatedBio}
    </p>
  </div>
)}
      </div>
    </Layout>
  );
};

export default MyPage;
