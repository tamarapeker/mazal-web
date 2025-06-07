import Layout from "@/components/Layout";

export default function Contacto() {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Contacto</h1>
      <p>Teléfono: +549 11 4537-6452</p>
      <p>Email: info@mazalimportaciones.com.ar</p>
      <div className="mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d821.0002285237113!2d-58.453654930476034!3d-34.60413839445222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca05ea81e545%3A0x1a41358bcb957449!2sDr.%20Nicol%C3%A1s%20Repetto%201655%2C%20C1416CLK%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2ses!4v1749316593696!5m2!1ses-419!2ses"
          width="100%"
          height="300"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </Layout>
  );
}
