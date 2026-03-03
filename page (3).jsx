
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Collections(){
  const [session, setSession] = useState(null);
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState('');

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if(session) load();
    })();
  }, []);

  async function load(){
    const { data, error } = await supabase
      .from('collections')
      .select('id, title, niche, created_at')
      .order('created_at', { ascending:false });
    if(!error) setRows(data || []);
  }

  async function create(e){
    e.preventDefault();
    if(!session) return alert('Login required');
    const { error } = await supabase.from('collections').insert({ title, niche, user_id: session.user.id });
    if(error) return alert(error.message);
    setTitle(''); setNiche('');
    await load();
  }

  async function update(id, newTitle){
    const { error } = await supabase.from('collections').update({ title:newTitle }).eq('id', id);
    if(error) alert(error.message); else load();
  }

  async function remove(id){
    if(!confirm('Delete this collection?')) return;
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if(error) alert(error.message); else load();
  }

  if(!session) return <p>Please <a href="/login">login</a> to manage collections.</p>;

  return (
    <div className="grid" style={{gap:24}}>
      <div className="card">
        <h2>Create a collection</h2>
        <form onSubmit={create} className="grid grid-2">
          <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input className="input" placeholder="Niche (e.g., Watches)" value={niche} onChange={e=>setNiche(e.target.value)} />
          <button className="btn" type="submit">Create</button>
        </form>
      </div>

      <div className="card">
        <h2>Your collections</h2>
        <div className="grid">
          {rows.map(r => (
            <div key={r.id} className="card" style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{flex:1}}>
                <strong>{r.title}</strong>
                <div className="muted">{r.niche}</div>
              </div>
              <a className="btn" href={`/collections/${r.id}`}>Open</a>
              <button className="btn" onClick={()=>{
                const nt = prompt('New title', r.title);
                if(nt!==null) update(r.id, nt);
              }}>Rename</button>
              <button className="btn" onClick={()=>remove(r.id)}>Delete</button>
            </div>
          ))}
          {rows.length===0 && <p>No collections yet.</p>}
        </div>
      </div>
    </div>
  );
}
