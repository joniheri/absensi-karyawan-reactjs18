# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Jon Doc

## Cara membuat Docker:

- Referensi: https://www.youtube.com/watch?v=Fgq6hsnKllQ&t=1559s. Batas tonton: 00.26.00
- Buat file "Dockerfile" di folder directory dalam folder root project
- Kemudian isi file "Dokcerfile" tersebut sesuai kebutuhan
- Buat juga file ".docker ignore" untuk mengabaikan beberapa file/folder agar tidak ikut saat build image docker
- Kemudian buka terminal di folder project tersebut, dan ketikkan sintak berikut untuk membuat image docker:
  - $ docker build -t reactjs/fe-absensikaryawan-reactjs18:1.0.0 .
  - $ docker build -t reactjs/fe-absensikaryawan-reactjs18:1.0.0 -f Dockerfile.stg . //--> -f adalah agar bisa spesifik file Dockerfile nya
- Setelah itu, file sudah ada di menjadi sebuah docker berupa image. Bisa cek menggunakan Docker Desktop yang sudah diinstal sebelumnya di pc kita
- Untuk runing, bisa gunakan sintak berikut di terminal yg sama seperti ini:
  - docker run -d -p portawal:portuntukrununing reactjs/fe-absensikaryawan-reactjs18:1.0.0
    example
  - docker run -d -p 3000:3000 reactjs/fe-absensikaryawan-reactjs18:1.0.0
- Jika sudah running, bisa cek di browser: "localhost:3000" atau bisa di cek di bagian menu "Containers" di Docker desktop
