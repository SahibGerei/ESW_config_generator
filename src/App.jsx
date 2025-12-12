import React, { useState } from 'react';
import FormInput from './components/FormInput';
import Confirmation from './components/Confirmation';
import ConfigOutput from './components/ConfigOutput';

export default function App() {
  const [data, setData] = useState({});
  const [step, setStep] = useState(1);

  return (
    <div className="container">
      <h1>Switch Config Generator</h1>
      {step === 1 && <FormInput setData={setData} next={() => setStep(2)} />}
      {step === 2 && <Confirmation data={data} back={() => setStep(1)} next={() => setStep(3)} />}
      {step === 3 && <ConfigOutput data={data} />}
    </div>
  );
}