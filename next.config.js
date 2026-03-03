
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Login(){
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
  }, []);

  async function sendLink(e){
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if(!error) setSent(true); else alert(error.message);
  }

  async function signOut(){
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div className="card" style={{maxWidth:520, margin:'24px auto'}}>
      <h2>Login</h2>
      {user ? (
        <>
          <p>Signed in as {user.email}</p>
          <button className="btn" onClick={signOut}>Sign out</button>
        </>
      ) : (
        <form onSubmit={sendLink} className="grid">
          <label>Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
          <button className="btn" type="submit">Send magic link</button>
          {sent && <p>Check your inbox for the sign-in link.</p>}
        </form>
      )}
    </div>
  );
}
