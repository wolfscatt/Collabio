# Backend API Endpoints
## Base Endpoint
* ```http://localhost:5000/api``` -> Default port şuanda 5000 ve base route api
## Kullanıcı için Endpointler
* ```/auth/register``` -> kullanıcı kayıt işlemi için gerekli endpoint
  * içerisinde username, email ve password alıyor. Bu bilgileri post etmeliyiz.
* ```/auth/login``` -> kullanıcı giriş işlemi için kullanılan endpoint.
  * body kısmında email ve password değerlerini alıyor.

## Proje için Endpointler
* ```/projects```
  * get işlemi -> tüm projeleri getirir.
  * post işlemi -> yeni bir proje oluşturmak için kullanılan endpoint.
* ```/projects/id``` -> buraya mevcut projenin id'si gelecek.
  * put işlemi -> id si verilen projeyi güncelleme işlemi.
  * delete işlemi -> seçilen projeyi silmek için kullanılan endpoint.