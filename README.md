
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Profile(){
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [legacy, setLegacy] = useState('');

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if(!session){ setLoading(false); return; }
      const { data, error } = await supabase
        .from('profiles')
        .select('username, display_name, bio, legacy_number')
        .eq('id', session.user.id)
        .maybeSingle();
      if(!error && data){
        setUsername(data.username || '');
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setLegacy(data.legacy_number || '');
      }
      setLoading(false);
    })();
  }, []);

  async function saveProfile(e){
    e.preventDefault();
    if(!session) return;
    const up = {
      id: session.user.id,
      username: username || null,
      display_name: displayName || null,
      bio: bio || null,
      legacy_number: legacy ? Number(legacy) : null
    };
    const { error } = await supabase.from('profiles').upsert(up, { onConflict:'id' });
    if(error) alert(error.message); else alert('Saved');
  }

  if(loading) return <p>Loading…</p>;
  if(!session) return <p>Please <a href="/login">login</a> to edit your profile.</p>;

  return (
    <div className="card" style={{maxWidth:720, margin:'24px auto'}}>
      <h2>Your Profile</h2>
      <form className="grid" onSubmit={saveProfile}>
        <label>Username</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="stacy" />
        <label>Display name</label>
        <input className="input" value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Stacy Pearce" />
        <label>Bio</label>
        <textarea className="textarea" rows={4} value={bio} onChange={e=>setBio(e.target.value)} placeholder="Collector of…" />
        <label>Legacy number (optional)</label>
        <input className="input" value={legacy} onChange={e=>setLegacy(e.target.value)} placeholder="#1, #2…" />
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  );
}
