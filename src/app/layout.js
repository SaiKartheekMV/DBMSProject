import { AuthProvider } from "./context/AuthContext";
import "./styles/globals.css";

export default function RootLayout ({children}){
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-gray-100" >
            {children}
        </body>
      </html>
    </AuthProvider>
  )
}