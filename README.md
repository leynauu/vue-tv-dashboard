TV Show Dasboard

Bu proje, popüler TV şovlarını listeleyen ve şovların detaylarını modal penceresinde gösteren bir uygulamadır.

Proje 4 temel özelliği karşılamaktadır. 

TV şovlarını türlere göre listeleme
Popüler şovları gösterme
TV şov detaylarını modal ile açma
Arama yapma ve sonuçları gösterme

KURULUM 
Depoyu klonlayın: git clone https://github.com/leynauu/vue-tv-dashboard.git
Bağımlılıkları yükleyin: npm install
Uygulamayı başlatın: npm run serve

KULLANILAN TEKNOLOJİLER
Vue.js
Bootstrap 4.5
Axios
TVMaze API

KULLANIM
Uygulamayı başlattıktan sonra, ana sayfada popüler şovları göreceksiniz.
Arama bölümünde şovları arayabilirsiniz. Size 10 adet filtrelenmiş sonuçlar gelecek. Burada sonuçlara göre tv shownun varsa posterini, ismini, yayın tarihini ve puanını görebilirsiniz. Detaylar için başlığa tıkladığınız da açılan modal pencerede show hakkında özet bir yazı, oyuncular, show türü, yayın tarihi ve puanı görüntüleyebilirsiniz.

Aynı şekilde bir sonraki sectionda solda show türlerini ve ilgili türe tıklandığında sağ tarafta en popüler 5 showu görüntüleyeceksiniz. Showlar varsa poster, showun ismi, türü ve yayın tarihi ile ekrana gelecektir. Detay butonuna tıklandığında ise açılan modal pencerede show hakkında özet bir yazı, oyuncular, show türü, yayın tarihi ve puanı görüntüleyebilirsiniz.

PROJE DETAYLARI

Projede toplamda beş adet bileşen kullanıldı ve daha önce geliştirilen Bootstrap ile SCSS kütüphaneleri bu bileşenlere entegre edildi. Bu entegrasyon, tasarımı her projeye uygun bir şekilde kolayca değiştirmeye olanak tanırken, aynı zamanda tasarımda önemli bir esneklik sağlıyor. Header.vue ve Footer.vue bileşenleri, sayfanın menü ve alt menü alanlarını yönetiyor. Proje kapsamındaki kullanım detaylı olmasa da, bu alanlar mobil ve responsive olarak yönetilebilir bir yapıya sahip.

3 temel componentimiz var. 

Search.vue
Bu bileşen, kullanıcının TV şovu araması yapmasına olanak tanır. Bileşen içerisindeki temel yapılar şu şekildedir:

data(): Bu fonksiyon, bileşenin yerel verilerini döndürür. Burada query ve filteredShows isimli iki değişken bulunmaktadır.

query: Kullanıcının arama alanına girdiği metni saklar.
filteredShows: TVMaze API'sinden gelen ve arama sonuçlarına uyan şovların listesini tutar.
searchShows(): Kullanıcı "Ara" butonuna tıkladığında çalışır. Bu fonksiyon TVMaze API'sine bir istek gönderir ve API'den dönen sonuçları filteredShows içerisine yerleştirir. Eğer arama sonuçları bulunamazsa, kullanıcıya "Aradığınız şov bulunamadı." mesajı gösterilir.

selectShow(): Kullanıcı bir TV şovunu seçtiğinde çalışır. Bu fonksiyon, seçilen şovun detaylarını üst bileşene iletmek için select-show event'ini tetikler.

Kullanımı:
Search.vue bileşeni, kullanıcının arama yapabilmesi için aşağıdaki şekilde App.vue içerisine yerleştirilmiştir:

<AppSearch @select-show="selectShow" @update:filteredShows="filteredShows = $event" />

@select-show: Arama sonuçlarından birine tıklandığında çalışır ve seçilen şovun detaylarını almak için selectShow() fonksiyonunu çağırır.
@update: Arama sonuçları güncellendiğinde filteredShows verisi güncellenir ve App.vue bileşeninde arama sonuçları gösterilir.

App.vue
Arama işlemi, App.vue dosyasında Search.vue bileşeni ile entegrasyon yapılarak gerçekleştirilmiştir. Search.vue bileşeni App.vue içerisine dahil edilmiştir ve kullanıcının arama sonuçlarını görüntülemesi sağlanmıştır.

selectShow(show): Arama sonucunda seçilen şovun detay bilgilerini alır ve ShowDetails bileşeni üzerinden gösterir.
Bu yapı, kullanıcının hem arama yapmasına hem de sonuçları anlık olarak görmesine olanak tanır.

ShowDetailse.vue
Bu bileşen, bir TV şovunun detaylarını modal şeklinde gösterir. Modal, şovun adı, özeti, oyuncu kadrosu, türü, yayın tarihi ve puan bilgilerini içerir. Bileşenin içindeki yapılar ve işlevler şu şekildedir:

Template:
Modal Yapısı: modal sınıfına sahip bir div, modal penceresinin HTML yapısını oluşturur. Kullanıcı dış bölgeye tıkladığında veya kapatma butonuna bastığında modal kapanır.
modal-header: Şovun adı burada görüntülenir. Kapatma butonu da bu kısımda bulunur.
modal-body: TV şovunun detay bilgileri (özet, oyuncular, tür, yayın tarihi ve puanı) burada gösterilir.
modal-footer: Kullanıcıya modalı kapatma imkanı sunan buton burada yer alır.

Props:
show: Modalda gösterilecek şovun tüm detaylarını içeren bir obje olarak alınır. Bu prop zorunludur.
onClose: Modalı kapatmak için kullanılan bir fonksiyondur. Kullanıcı kapatma butonuna tıkladığında ya da modal dışına tıkladığında çalışır.

Computed:
cast: Eğer şovun oyuncu kadrosu _embedded verisi içerisinde mevcutsa, tüm oyuncuların isimlerini birleştirerek gösterir. Aksi takdirde boş bir string döndürür.

Kullanımı:
ShowDetails.vue, App.vue'de bir TV şovu seçildiğinde modal olarak açılır. App.vue dosyasında şu şekilde kullanılmıştır:

<AppShowDetails v-if="selectedShow" :show="selectedShow" @onClose="selectedShow = null" />

v-if="selectedShow": Modal yalnızca bir şov seçildiğinde açılır.
="selectedShow": Seçilen şovun detayları modalda gösterilir.
@onClose="selectedShow = null": Modal kapandığında seçili şov sıfırlanır ve modal kapanır.

Fonksiyonlar:
onClose(): Modalı kapatmak için kullanılır. Kapatma işlemi onClose fonksiyonu tetiklenerek gerçekleştirilir.

PopularShows.vue
Bu bileşen, popüler TV şovlarını kart yapısında listelemek ve her bir şov için detaylarını açmak üzere bir buton eklemek amacıyla oluşturulmuştur. Şovların türleri, puanları ve resimleri gibi bilgileri içerir.

Template:
Ana Yapı: h3 başlığı altında popüler şovlar başlığı eklenmiş ve bir grid yapısında her şov için kartlar oluşturulmuştur.
v-for: popularShows dizisinde yer alan her bir şov, v-for direktifi ile sıralanarak görüntülenir. show.id kullanılarak her kart için benzersiz bir key atanır.
Card Yapısı: Her şov için Bootstrap kart yapısı kullanılarak şovun ismi, puanı, türleri ve resmi gösterilir.
Resim: Eğer şovun resmi varsa v-if="show.image" ile kontrol edilir ve resmi gösterilir.
Başlık: Şovun adı card-title olarak eklenir.
Puan ve Tür Bilgisi: Şovun puanı show.rating.average özelliği ile, tür bilgileri ise show.genres dizisi ile gösterilir. Puan bilgisi yoksa "Bilinmiyor" ifadesi eklenir.
Detay Butonu: Kullanıcı bir şovun detaylarını görmek istediğinde, Detaylar butonuna tıklayarak ilgili şovun bilgilerini modalda açmak üzere selectShow(show) fonksiyonunu tetikleyebilir.

Props:
popularShows: Popüler şovları içeren bir dizi olarak tanımlanmıştır. Her bir şovun bilgilerini içerir (isim, tür, puan, resim, vs.). Bu prop zorunlu olarak tanımlanmıştır.
selectShow: Bir şovun detaylarının gösterilmesi için tetiklenen bir fonksiyon prop'tur. Kullanıcı bir şovun Detaylar butonuna tıkladığında, bu fonksiyon çağrılarak ilgili şov bilgisi modalda açılır.

Kullanımı:
PopularShows.vue, App.vue gibi ana bileşenlerde popüler şovların listelenmesi için şu şekilde kullanılır:

<AppPopularShows :popularShows="currentPopularShows" @selectShow="selectShow" />

="currentPopularShows": Popüler şovlar bileşene bir prop olarak gönderilir ve listelenir.
@selectShow="selectShow": Şov seçildiğinde modal açılır ve şovun detayları gösterilir.

Fonksiyonlar:
selectShow(show): Kullanıcı Detaylar butonuna tıkladığında, bu fonksiyon tetiklenir ve ilgili şovun detaylarını görüntülemek için gerekli veriler alınır. Bu fonksiyon App.vue'de tanımlanmış olup, ShowDetails.vue bileşeni ile modal şeklinde şov detayları gösterilir.

App.vue
Bu dosya uygulamanın ana bileşenidir ve header, footer, popüler şovlar, arama işlevi gibi farklı bileşenleri bir araya getirir. Popüler TV şovlarının listelenmesi, şov detaylarının gösterilmesi, ve şovların türlerine göre gruplandırılması gibi işlevleri içerir.

Template:
AppHeader: Sayfanın üst kısmında uygulama başlığını ve genel bilgileri barındıran header bileşenini içerir.

Ana İçerik (main): Uygulamanın ana içeriği burada yer alır:

Arka Plan Görseli: İlk bölümde arka plan görseli bgImage prop'u ile dinamik olarak ayarlanır.
Arama Bileşeni: AppSearch bileşeni, kullanıcının TV şovları arayabilmesi için eklenmiştir. Arama sonuçları ve seçilen şov bilgileri App.vue'deki metodlar ile yönetilir.
@select-show="selectShow": Kullanıcı bir şovu seçtiğinde, bu metod tetiklenir ve seçilen şov detayları modal içinde gösterilir.
@update:filteredShows="filteredShows = $event": Arama sonuçları güncellendiğinde filteredShows verisi güncellenir.
Popüler Şovlar ve Türler: TV şovları türlerine göre listelenir ve her türdeki şovlar gösterilir.
Türler Listesi: v-for ile popularShowsByGenre üzerinden türler sıralanır ve kullanıcı tıklayınca o türe ait şovlar gösterilir.
Popüler Şovlar Bileşeni: AppPopularShows bileşeni, o an seçili olan türe ait popüler şovları gösterir. selectShow metodu, kullanıcı bir şovun detaylarına ulaşmak istediğinde tetiklenir ve detaylar modal içinde görüntülenir.
ShowDetails Modal: Kullanıcı bir şov seçtiğinde detaylarını modal içerisinde görüntülemek için ShowDetails bileşeni kullanılır. v-if="selectedShow" koşulu ile seçilen bir şov varsa modal açılır ve detayları gösterilir.

Data:
popularShowsByGenre: TV şovlarını türlerine göre gruplayan bir nesne. Her tür için bir dizi popüler şov içerir.
currentPopularShows: O an seçili türe ait popüler şovların listesi.
filteredShows: Arama sonucu listelenen şovlar.
selectedShow: Kullanıcı tarafından seçilen şovun detayları.
bgImage: Arka plan resmi olarak kullanılan görsel.

Lifecycle Hook:
created: Uygulama yüklendiğinde fetchPopularShows() metodu çağrılır ve TV şovları API'den çekilerek türlerine göre gruplandırılır.

Methods:
fetchPopularShows(): TV şovlarını API üzerinden çeker ve groupShowsByGenre() ile türlerine göre gruplandırır. İlk türü seçerek ilgili popüler şovları görüntüler.
groupShowsByGenre(shows): Şovları türlerine göre ayırır ve her tür için sadece 5 popüler şovu saklar.
selectGenre(genre): Kullanıcının seçtiği türe göre o türün popüler şovlarını currentPopularShows değişkenine atar ve seçilen şov detayını sıfırlar.
updatePopularShows(genre): Türe tıklandığında o türün popüler şovlarını günceller.
selectShow(show): Kullanıcı bir şovu seçtiğinde, şovun detaylarını API'den çeker ve selectedShow değişkenine atar.
closeModal(): Modalı kapatmak için selectedShow değişkenini sıfırlar.

Computed Properties:
sortedGenres(): Türleri alfabetik olarak sıralar.

Kullanım:
AppSearch: Arama fonksiyonu kullanılarak şovlar filtrelenir ve selectShow() ile detayları gösterilir.
AppPopularShows: Kullanıcıya popüler şovlar gösterilir ve detaylarına ulaşmak için selectShow() kullanılır.
ShowDetails: Seçilen şovun detayları modal şeklinde açılır.

Bu şekilde App.vue, uygulamanın merkezi kontrolünü sağlar ve farklı bileşenler arasında veri akışını yönetir.
