
export default function Home() {
  return (
    <main style={{ padding: 40, minHeight: '100vh', background: '#000', color: '#fff' }}>
      <h1>It works 🎉</h1>
      <p>This is the homepage served from <code>app/page.jsx</code>.</p>
      <p>
        Try: <a href="/login">/login</a> · <a href="/collections">/collections</a> ·
        <a href="/items">/items</a> · <a href="/profile">/profile</a>
      </p>
    </main>
  );
}
