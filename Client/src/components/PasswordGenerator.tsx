import { useEffect, useState } from "react";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [useSpecialChars, setUseSpecialChars] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const generatePassword = async () => {
    try {
      const response = await axios.get<{ password: string }>(
        `${import.meta.env.VITE_API_URL}/password`,
        {
          params: {
            length: length,
            use_special_chars: useSpecialChars,
          },
        }
      );
      setPassword(response.data.password);
      setHasError(false);
    } catch (error) {
      console.error("Error generating password:", error);
      setHasError(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error("Failed to copy:", err));
  };

  useEffect(() => {
    setCopySuccess(false);
  }, [length, password]);

  return (
    <div className="flex flex-col mx-auto min-h-80 p-6 bg-opacity-65 bg-slate-950 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-green-300 mb-4">
        Password Generator
      </h1>
      <div className="mb-4">
        <label className="block">
          <span className="text-gray-200">Length: {length}</span>
          <input
            type="range"
            min="1"
            max="50"
            value={length}
            onChange={(e) => setLength(+e.target.value)}
            className="          
              appearance-none 
              w-full 
              h-2 
              bg-[#2ec946]/10 
              [&::-webkit-slider-runnable-track]:bg-transparent 
              [&::-moz-range-track]:bg-transparent 
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:bg-[#15803d]
              [&::-webkit-slider-thumb]:hover:bg-[#1d9e49]
              [&::-webkit-slider-thumb]:cursor-pointer 
              [&::-moz-range-thumb]:appearance-none 
              [&::-moz-range-thumb]:h-4 
              [&::-moz-range-thumb]:w-4 
              [&::-moz-range-thumb]:bg-[#15803d]
              [&::-moz-range-thumb]:hover:bg-[#1d9e49]  
              [&::-moz-range-thumb]:cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(21 128 61) ${
                length * 2
              }%, #d1d5db ${length * 2}%)`,
            }}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useSpecialChars}
            onChange={(e) => setUseSpecialChars(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-200">Use Special Characters</span>
        </label>
      </div>
      <button
        onClick={generatePassword}
        className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Generate Password
      </button>
      {hasError &&(
        <p className="text-red-500 mt-5 text-center">Error generating password</p>
      )}
      {password && !hasError && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-green-300 mb-2">
            Generated Password:
          </h2>
          <div className="flex justify-between items-center mb-2 bg-slate-800 bg-opacity-65 w-full gap-3 rounded px-1">
            <p className="text-gray-200">{password}</p>
            <button
              onClick={copyToClipboard}
              className="text-green-700 hover:text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FaCopy />
            </button>
          </div>
          {copySuccess && (
            <span className="text-green-500 ml-2 flex items-center gap-1">
              <IoMdCheckboxOutline /> Copied!
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
