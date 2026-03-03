
export default function Home(){
  return (
    <main>
      <section className="header-hero">
        <div className="container">
          <h1 style={{fontSize:36,margin:0}}>Your collection. Your story.</h1>
          <p style={{opacity:.8,marginTop:8,maxWidth:760}}>Build your collector identity, create collections, upload items, and connect your niche — with a clean, premium UI. This demo uses Supabase Auth + RLS to keep every user's data private.</p>
        </div>
      </section>
      <div className="grid grid-2" style={{marginTop:24}}>
        <div className="card">
          <h3>Start a Collection</h3>
          <p className="muted">Create collections across niches (TCG, watches, sneakers…)</p>
        </div>
        <div className="card">
          <h3>Add Your Items</h3>
          <p className="muted">Bulk upload coming later. For now, create and link items to collections.</p>
        </div>
      </div>
    </main>
  );
}
