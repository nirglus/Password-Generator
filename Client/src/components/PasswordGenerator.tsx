import { useState } from 'react';
import axios from 'axios';

const PasswordGenerator: React.FC = () => {
    const [length, setLength] = useState<number>(12);
    const [useSpecialChars, setUseSpecialChars] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    const generatePassword = async () => {
        try {
            const response = await axios.get<{ password: string }>(`${import.meta.env.VITE_API_URL}/password`, {
                params: {
                    length: length,
                    use_special_chars: useSpecialChars
                }
            });
            setPassword(response.data.password);
        } catch (error) {
            console.error('Error generating password:', error);
        }
    };

    return (
        <div>
            <h1>Password Generator</h1>
            <div>
                <label>
                    Length:
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={length}
                        onChange={(e) => setLength(+e.target.value)}
                    />
                    <span>{length}</span>
                </label>
            </div>
            <div>
                <label>
                    Use Special Characters:
                    <input
                        type="checkbox"
                        checked={useSpecialChars}
                        onChange={(e) => setUseSpecialChars(e.target.checked)}
                    />
                </label>
            </div>
            <button onClick={generatePassword}>Generate Password</button>
            {password && (
                <div>
                    <h2>Generated Password:</h2>
                    <p>{password}</p>
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
