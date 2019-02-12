import Bulma from "../Bulma";
export default () => (
  <div className="hello">
    <button className="is-primary">Hello World</button>
    {/* TODO: Dump everything bulma right into this style component. I hate myself */}
    <style jsx global>
      {`
        // Set your brand colors
        $purple: #8a4d76;
        $pink: #fa7c91;
        $brown: #757763;
        $beige-light: #d0d1cd;
        $beige-lighter: #eff0eb;

        // Update Bulma's Global variables
        $family-sans-serif: "Nunito", sans-serif;
        $grey-dark: $brown;
        $grey-light: $beige-light;
        $primary: $purple;
        $link: $pink;
        $widescreen-enabled: false;
        $fullhd-enabled: false;

        // Update some of Bulma's component variables

        // Import only what you need from bulma.
        // - We need everything - Schaffer
        // @import "../sass/utilities/_all.sass";
        // @import "../node_modules/bulma/sass/base/_all.sass";
        // @import "../node_modules/bulma/sass/elements/button.sass";
        // @import "../node_modules/bulma/sass/elements/container.sass";
        // @import "../node_modules/bulma/sass/elements/form.sass";
        // @import "../node_modules/bulma/sass/elements/title.sass";
        // @import "../node_modules/bulma/sass/components/navbar.sass";
        // @import "../node_modules/bulma/sass/layout/hero.sass";
        // @import "../node_modules/bulma/sass/layout/section.sass";
        // Copied from: https://bulma.io/documentation/customize/with-webpack/
      `}
    </style>
    <Bulma />
  </div>
);
