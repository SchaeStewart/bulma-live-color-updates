import Bulma from "../Bulma";
export default () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Hello world</h1>
      <input
        type="text"
        on={() => {
          console.log("test");
        }}
      />
      <div
        style={{
          width: "200px",
          height: "200px",
          border: "1px solid black"
        }}
      />
      <style jsx global>
        {`
          // Set your brand colors
          // $purple: #8a4d76;
          // $pink: #fa7c91;
          // $brown: #757763;
          // $beige-light: #d0d1cd;
          // $beige-lighter: #eff0eb;

          // Update Bulma's Global variables
          // $family-sans-serif: "Nunito", sans-serif;
          // $grey-dark: $brown;
          // $grey-light: $beige-light;
          // $primary: $purple;
          // $link: $pink;
          // $widescreen-enabled: false;
          // $fullhd-enabled: false;
        `}
      </style>
      <Bulma />
    </div>
  </section>
);
