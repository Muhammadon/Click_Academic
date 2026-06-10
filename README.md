
<h1 align="center">
Clik Academic
</h1>


### Structure App 
![structure app]( ./app.png) 


### Fitur 

fitur utanma : 
1. Authentikasi
2. Konsultasi untuk mahasiswa 
3. managent kelas untuk mahasiswa 



### Api 
##### Auth
```json
{
    username : "nama anggota",
    email : "example.com",
    password : "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
}
```


##### Kelas & Konsultasi
```json
{
    id: 1,
    title: "UI/UX Design Fundamental",
    description:
      "Belajar dasar UI/UX design mulai dari wireframe, design system, hingga prototyping.",
    category: "desain",

    mentor: "Dr. Ahmad Fauzi",
    mentorImage: "/mentor/ahmad-fauzi.png",

    schedule: "Selasa & Jumat • 19:00 WIB",
    duration: "8 Minggu",

    quota: 30,
    totalStudents: 120,

    level: "Beginner",

    price: "200.000",

    // thumbnail: "/kelas/uiux.jpg",

    color: "from-hijau-zamrud to-deep-teal",

    status: "Open",

    rating: 4.8,
    totalReviews: 320,

    // hasCertificate: true,

    createdAt: "2026-01-10",
    updatedAt: "2026-05-20",
  },

```

#### Midtrant
