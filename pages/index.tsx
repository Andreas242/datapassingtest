import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [reversed, setReversed] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await axios.post('/api/reverse', { input });
    setReversed(response.data.reversed);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Reverse</button>
      </form>
      {reversed && <p>Reversed: {reversed}</p>}
    </div>
  );
}
