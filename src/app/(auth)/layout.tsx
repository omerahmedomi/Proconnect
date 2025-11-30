import "../globals.css";
export const metadata = {
  title:"Create or Log In Account"
}
import {Dancing_Script,Roboto} from 'next/font/google';

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable:'--font-roboto',
  subsets:['latin']
})

export default function AuthLayout({ children }) {
  return (
    <html>
      <body className={`${dancing.variable} ${roboto.className}`}>
        <div className="min-h-svh flex flex-col justify-center items-center gap-7 py-9 px-4">
            <div className="flex items-center gap-1">
<img src={'/header-image.png'} width={50} height={50}/>
<p className="text-4xl font-bold font-dancing">ProConnect</p>
            </div>
          
            {children}</div>;
      </body>
    </html>
  );
}
