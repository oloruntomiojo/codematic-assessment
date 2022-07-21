import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [value, setValue] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [error, setError] = useState(null);

  const FRONTEND_URL = 'http://localhost:3000' || process.env.NEXT_PUBLIC_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === '') {
      setError('Please select a timezone');
      return false;
    }

    try {
      const req = await fetch(
        `${FRONTEND_URL}/api/african-time?timezone=${value}`
      );

      const res = await req.json();
      const { time } = await res;
      setTimeZone(time);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Test this api</h1>
        {process.env.URL}

        <form onSubmit={handleSubmit}>
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            <option value='' hidden>
              Select a TimeZone
            </option>
            <option value='CVT'>Cape Verde Time ( GMT-1 )</option>
            <option value='GMT'>Greenwich Mean Time ( GMT )</option>
            <option value='WAT'>West Africa Time ( GMT+1 )</option>
            <option value='CAT'>Central Africa Time ( GMT+2 )</option>
            <option value='EAT'>East Africa Time ( GMT+3 )</option>
            <option value='MT'>
              Mauritius Time & Seychelles Time ( GMT+4 )
            </option>
          </select>

          <button>Check timezone</button>
        </form>

        {timeZone && (
          <div>
            <p>TimeZone: {timeZone}</p>
          </div>
        )}

        {null ?? (
          <div>
            <p>{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}
