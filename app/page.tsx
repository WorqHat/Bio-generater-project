"use client"
import { IconSquareRoundedNumber1Filled, IconSquareRoundedNumber2Filled, IconSquareRoundedNumber3Filled } from "@tabler/icons-react";
import React, { useEffect, useState } from 'react';
import Layout from './layout';
import Image from 'next/image';
import { IconCopy } from "@tabler/icons-react";

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
  const BEARER_TOKEN = `Bearer sk-815f9a4836b44791b0b44ac4f4212842`;
  const requestOptions = {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': BEARER_TOKEN,
        },
    body: JSON.stringify({
      question,
      randomness,
    }),
  };
  console.log("requestOptions",requestOptions)
  const response = await fetch(API_ENDPOINT, requestOptions);
  const data = await response.json();
  return data;
}

const MyPage = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [vibeValue, setVibeValue] = useState('');
  const [platformValue, setPlatformValue] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');
  const [bioCopied, setBioCopied] = useState(false);
  
  const handleCopyBio = () => {
    navigator.clipboard.writeText(generatedBio);
    setBioCopied(true);
    setTimeout(() => {
      setBioCopied(false);
    }, 2000);
  };

  const handleGenerateBioClick = async () => {
    let question = '';
  
    if (platformValue === 'Linkedin') {
      question = `Generate a ${vibeValue.toLowerCase()} LinkedIn bio: ${textAreaValue}`;
    } else if (platformValue === 'Twitter') {
      question = `Create a ${vibeValue.toLowerCase()} Twitter bio: ${textAreaValue}`;
    }
  
    setGeneratedBio('Generating your bio, please wait!!!');
  
    const responseData = await fetchBioData(question, true, {}, false);
  
    setGeneratedBio(responseData?.content || '');
  };
  

  return (
    <Layout>
      <div className='logo' style={{ display: 'right', justifyContent: 'flex-start', alignItems: 'initial', marginLeft: '2%', marginTop: "2.5%", fontSize: "medium" }}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} />

          <div className='social-icons' style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px', marginTop: "-60px", fontSize: "medium" }}>
            {socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>
                <Image src={link.icon} alt={link.name} width={20} height={20} />
              </a>
            ))}
          </div>
        </div>
      <div className="container">

        <div style={{marginBottom: "-3%", marginTop: "1%" }}>
          <h1>Generate your BIO using Worqhat API's.</h1>
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

        <button className="generatebtn" style={{ marginTop: "2%", marginBottom: "-.05%"}} onClick={handleGenerateBioClick}>
          Generate your bio
        </button>

        {generatedBio && (
        <div className="generated-bio-container">
          <div className="bio-header">
            <h2 className="generated-bio-heading">Your Generated Bio</h2>
            <button className="copy-icon" style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', width: '100%'  }} onClick={handleCopyBio}>
            {bioCopied && (
               <div className="bio-copied-message" style={{ marginLeft: '15px', border: '2px solid black', borderRadius: '10px', padding: '2px', marginTop: "-0.7%" }}>BIO Copied!!!</div>
            )}
              <IconCopy size={18} />
            </button>
          </div>
          <p className="generated-bio">{generatedBio}</p>
        </div>
      )}




      </div>
      <div className='footer' style={{ textAlign: 'center', marginTop: '-45px', left: '0', bottom: '10px', width: '100%' }}>
          <p>&copy; 2023 Worqhat. All rights reserved.</p>
        </div>
    </Layout>
  );
};

export default MyPage;
