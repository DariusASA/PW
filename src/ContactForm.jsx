import { useState } from 'react';
function ContactForm() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [feedback, setFeedback] = useState('');
const handleAdd = () => {
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      setFeedback('lipseste ceva ');
    } else {
      setFeedback(`ai pus tot ce trebe`);
    }
  };
 return (
 <div>
 <h3>ContactForm</h3>
 <input
 value={name}
 onChange={(e) => setName(e.target.value)}
 />
 <p>Ai scris: {name}</p>
 
 <input
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 />
 <p>Ai scris: {email}</p>

 <textarea
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 />
 <p>Ai scris: {message}</p>

  <button onClick={handleAdd}>Submit</button>

<h1>{feedback}</h1>

 </div>
 );
}
export default ContactForm;