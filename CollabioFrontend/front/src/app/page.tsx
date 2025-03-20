import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-6">Collabia ile Projelerinizi Yönetin</h1>
            <p className="text-xl mb-8">Modern ve kullanıcı dostu proje yönetim platformu</p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors">
              Ücretsiz Başla
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Görev Yönetimi</h3>
              <p className="text-gray-600">Projelerinizi kolayca organize edin ve takip edin</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Ekip İşbirliği</h3>
              <p className="text-gray-600">Ekibinizle gerçek zamanlı işbirliği yapın</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Raporlama</h3>
              <p className="text-gray-600">Detaylı raporlar ve analizlerle projenizi takip edin</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Hemen Başlayın</h2>
          <p className="text-xl text-gray-600 mb-8">Collabia ile projelerinizi daha verimli yönetin</p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
            Ücretsiz Deneyin
          </button>
        </div>
      </section>
    </main>
  );
}
