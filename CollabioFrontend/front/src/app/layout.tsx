import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collabia - Modern Proje Yönetim Platformu",
  description: "Collabia ile projelerinizi daha verimli yönetin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-purple-600">Collabia</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-purple-600">Özellikler</a>
                <a href="#" className="text-gray-600 hover:text-purple-600">Fiyatlandırma</a>
                <a href="#" className="text-gray-600 hover:text-purple-600">İletişim</a>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
                  Giriş Yap
                </button>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Collabia</h3>
                <p className="text-gray-600">Modern proje yönetim platformu</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Ürün</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">Özellikler</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">Fiyatlandırma</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">Entegrasyonlar</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Şirket</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">Hakkımızda</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">Kariyer</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">Destek</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">İletişim</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-purple-600">SSS</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-12 pt-8 text-center text-gray-600">
              <p>&copy; 2024 Collabia. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
