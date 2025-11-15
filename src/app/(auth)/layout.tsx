import "../globals.css";
export default function AuthLayout({ children }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col justify-center items-center gap-7 py-9 px-4">
            <div className="flex items-center gap-1">
<img src={'/header-image.png'} width={50} height={50}/>
<p className="text-4xl font-bold">ProConnect</p>
            </div>
          
            {children}</div>;
      </body>
    </html>
  );
}
