
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CollectionDetail({ params }){
  const id = params.id;
  const [col, setCol] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(()=>{ load(); }, [id]);

  async function load(){
    const { data: c } = await supabase.from('collections').select('id,title,niche').eq('id', id).maybeSingle();
    setCol(c);
    const { data: it } = await supabase.from('items').select('id,title,category,photo_url').eq('collection_id', id).order('created_at', { ascending:false });
    setItems(it||[]);
  }

  return (
    <div className="grid" style={{gap:16}}>
      {col && <div className="card"><h2>{col.title}</h2><div className="muted">{col.niche}</div></div>}
      <div className="card">
        <h3>Items in this collection</h3>
        {items.length===0 && <p>No items yet.</p>}
        <div className="grid">
          {items.map(it => (
            <div key={it.id} className="card" style={{display:'flex',gap:12,alignItems:'center'}}>
              {it.photo_url && <img src={it.photo_url} alt="" width={64} height={64} style={{borderRadius:8,objectFit:'cover'}}/>}
              <div>
                <strong>{it.title}</strong>
                <div className="muted">{it.category||'—'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
