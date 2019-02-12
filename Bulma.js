const Bulma = () => (
  <style jsx global>
    {`
      // ** Initial Variables **//
      // Colors
      $black: hsl(0, 0%, 4%) !default;
      $black-bis: hsl(0, 0%, 7%) !default;
      $black-ter: hsl(0, 0%, 14%) !default;
      $grey-darker: hsl(0, 0%, 21%) !default;
      $grey-dark: hsl(0, 0%, 29%) !default;
      $grey: hsl(0, 0%, 48%) !default;
      $grey-light: hsl(0, 0%, 71%) !default;
      $grey-lighter: hsl(0, 0%, 86%) !default;
      $white-ter: hsl(0, 0%, 96%) !default;
      $white-bis: hsl(0, 0%, 98%) !default;
      $white: hsl(0, 0%, 100%) !default;
      $orange: hsl(14, 100%, 53%) !default;
      $yellow: hsl(48, 100%, 67%) !default;
      $green: hsl(141, 71%, 48%) !default;
      $turquoise: hsl(171, 100%, 41%) !default;
      $cyan: hsl(204, 86%, 53%) !default;
      $blue: hsl(217, 71%, 53%) !default;
      $purple: hsl(271, 100%, 71%) !default;
      $red: hsl(348, 100%, 61%) !default;
      // Typography
      $family-sans-serif: BlinkMacSystemFont, -apple-system, "Segoe UI",
        "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", "Helvetica", "Arial", sans-serif !default;
      $family-monospace: monospace !default;
      $render-mode: optimizeLegibility !default;
      $size-1: 3rem !default;
      $size-2: 2.5rem !default;
      $size-3: 2rem !default;
      $size-4: 1.5rem !default;
      $size-5: 1.25rem !default;
      $size-6: 1rem !default;
      $size-7: 0.75rem !default;
      $weight-light: 300 !default;
      $weight-normal: 400 !default;
      $weight-medium: 500 !default;
      $weight-semibold: 600 !default;
      $weight-bold: 700 !default;
      // Responsiveness
      // The container horizontal gap, which acts as the offset for breakpoints
      $gap: 64px !default;
      // 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
      $tablet: 769px !default;
      // 960px container + 4rem
      $desktop: 960px + (2 * $gap) !default;
      // 1152px container + 4rem
      $widescreen: 1152px + (2 * $gap) !default;
      $widescreen-enabled: true !default;
      // 1344px container + 4rem;
      $fullhd: 1344px + (2 * $gap) !default;
      $fullhd-enabled: true !default;
      // Miscellaneous
      $easing: ease-out !default;
      $radius-small: 2px !default;
      $radius: 4px !default;
      $radius-large: 6px !default;
      $radius-rounded: 290486px !default;
      $speed: 86ms !default;
      // Flags
      $variable-columns: true !default;
      // ** Functions **//
      @function mergeColorMaps($bulma-colors, $custom-colors) {
        // we return at least bulma hardcoded colors
        $merged-colors: $bulma-colors; // we want a map as input
        @if type-of($custom-colors) == "map" {
          @each $name, $components in $custom-colors {
            // color name should be a string and colors pair a list with at least one element
            @if type-of($name) ==
              "string" and
              (
                type-of($components) ==
                  "list" or
                  type-of($components) ==
                  "color"
              ) and
              length($components) >=
              1
            {
              $color-base: null;
              // the param can either be a single color
              // or a list of 2 colors
              @if type-of($components) == "color" {
                $color-base: $components;
              } @else if type-of($components) == "list" {
                $color-base: nth($components, 1);
              }

              $color-invert: null;
              // is an inverted color provided in the list
              @if length($components) > 1 {
                $color-invert: nth($components, 2);
              }

              // we only want a color as base color
              @if type-of($color-base) == "color" {
                // if inverted color is not provided or is not a color we compute it
                @if type-of($color-invert) != "color" {
                  $color-invert: findColorInvert($color-base);
                }
                // we merge this colors elements as map with bulma colors (we can override them this way, no multiple definition for the same name)
                $merged-colors: map_merge(
                  $merged-colors,
                  (
                    $name: (
                      $color-base,
                      $color-invert
                    )
                  )
                );
              }
            }
          }
        }
        @return $merged-colors;
      }

      @function powerNumber($number, $exp) {
        $value: 1;
        @if $exp > 0 {
          @for $i from 1 through $exp {
            $value: $value * $number;
          }
        } @else if $exp < 0 {
          @for $i from 1 through -$exp {
            $value: $value / $number;
          }
        }
        @return $value;
      }

      @function colorLuminance($color) {
        $color-rgb: (
          "red": red($color),
          "green": green($color),
          "blue": blue($color)
        );
        @each $name, $value in $color-rgb {
          $adjusted: 0;
          $value: $value / 255;
          @if $value < 0.03928 {
            $value: $value / 12.92;
          } @else {
            $value: ($value + 0.055) / 1.055;
            $value: powerNumber($value, 2);
          }
          $color-rgb: map-merge(
            $color-rgb,
            (
              $name: $value
            )
          );
        }
        @return (map-get($color-rgb, "red") * 0.2126) +
          (map-get($color-rgb, "green") * 0.7152) +
          (map-get($color-rgb, "blue") * 0.0722);
      }
      @function findColorInvert($color) {
        @if (colorLuminance($color) > 0.55) {
          @return rgba(#000, 0.7);
        } @else {
          @return #fff;
        }
      }
      // ** Derived Variables ** //
      $primary: $turquoise !default;
      $info: $cyan !default;
      $success: $green !default;
      $warning: $yellow !default;
      $danger: $red !default;
      $light: $white-ter !default;
      $dark: $grey-darker !default;
      // Invert colors;
      $orange-invert: findColorInvert($orange) !default;
      $yellow-invert: findColorInvert($yellow) !default;
      $green-invert: findColorInvert($green) !default;
      $turquoise-invert: findColorInvert($turquoise) !default;
      $cyan-invert: findColorInvert($cyan) !default;
      $blue-invert: findColorInvert($blue) !default;
      $purple-invert: findColorInvert($purple) !default;
      $red-invert: findColorInvert($red) !default;
      $primary-invert: $turquoise-invert !default;
      $info-invert: $cyan-invert !default;
      $success-invert: $green-invert !default;
      $warning-invert: $yellow-invert !default;
      $danger-invert: $red-invert !default;
      $light-invert: $dark !default;
      $dark-invert: $light !default;
      // General colors;
      $background: $white-ter !default;
      $border: $grey-lighter !default;
      $border-hover: $grey-light !default;
      // Text colors;
      $text: $grey-dark !default;
      $text-invert: findColorInvert($text) !default;
      $text-light: $grey !default;
      $text-strong: $grey-darker !default;
      // Code colors;
      $code: $red !default;
      $code-background: $background !default;
      $pre: $text !default;
      $pre-background: $background !default;
      // Link colors;
      $link: $blue !default;
      $link-invert: $blue-invert !default;
      $link-visited: $purple !default;
      $link-hover: $grey-darker !default;
      $link-hover-border: $grey-light !default;
      $link-focus: $grey-darker !default;
      $link-focus-border: $blue !default;
      $link-active: $grey-darker !default;
      $link-active-border: $grey-dark !default;
      // Typography;
      $family-primary: $family-sans-serif !default;
      $family-secondary: $family-sans-serif !default;
      $family-code: $family-monospace !default;
      $size-small: $size-7 !default;
      $size-normal: $size-6 !default;
      $size-medium: $size-5 !default;
      $size-large: $size-4 !default;
      // Lists and maps;
      $custom-colors: null !default;
      $custom-shades: null !default;
      $colors: mergeColorMaps(
        (
          "white": (
            $white,
            $black
          ),
          "black": (
            $black,
            $white
          ),
          "light": (
            $light,
            $light-invert
          ),
          "dark": (
            $dark,
            $dark-invert
          ),
          "primary": (
            $primary,
            $primary-invert
          ),
          "link": (
            $link,
            $link-invert
          ),
          "info": (
            $info,
            $info-invert
          ),
          "success": (
            $success,
            $success-invert
          ),
          "warning": (
            $warning,
            $warning-invert
          ),
          "danger": (
            $danger,
            $danger-invert
          )
        ),
        $custom-colors
      ) !default;
      $shades: mergeColorMaps(
        (
          "black-bis": $black-bis,
          "black-ter": $black-ter,
          "grey-darker": $grey-darker,
          "grey-dark": $grey-dark,
          "grey": $grey,
          "grey-light": $grey-light,
          "grey-lighter": $grey-lighter,
          "white-ter": $white-ter,
          "white-bis": $white-bis
        ),
        $custom-shades
      ) !default;
      $sizes: $size-1 $size-2 $size-3 $size-4 $size-5 $size-6 $size-7 !default;

      // ** Minireset ** //
      /*! minireset.css v0.0.4 | MIT License | github.com/jgthms/minireset.css */
      // Blocks
      html,
      body,
      p,
      ol,
      ul,
      li,
      dl,
      dt,
      dd,
      blockquote,
      figure,
      fieldset,
      legend,
      textarea,
      pre,
      iframe,
      hr,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        padding: 0;
      }
      // Headings
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 100%;
        font-weight: normal;
      }
      // List
      ul {
        list-style: none;
      }
      // Form
      button,
      input,
      select,
      textarea {
        margin: 0;
      }
      // Box sizing
      html {
        box-sizing: border-box;
      }

      * {
        &,
        &::before,
        &::after {
          box-sizing: inherit;
        }
      }
      // Media
      img,
      embed,
      iframe,
      object,
      video {
        height: auto;
        max-width: 100%;
      }
      audio {
        max-width: 100%;
      }
      // Iframe
      iframe {
        border: 0;
      }
      // Table
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      td,
      th {
        padding: 0;
        text-align: left;
      }
      // ** Generic ** //
      $body-background-color: $white !default;
      $body-size: 16px !default;
      $body-rendering: optimizeLegibility !default;
      $body-family: $family-primary !default;
      $body-color: $text !default;
      $body-weight: $weight-normal !default;
      $body-line-height: 1.5 !default;

      $code-family: $family-code !default;
      $code-padding: 0.25em 0.5em 0.25em !default;
      $code-weight: normal !default;
      $code-size: 0.875em !default;

      $hr-background-color: $background !default;
      $hr-height: 2px !default;
      $hr-margin: 1.5rem 0 !default;

      $strong-color: $text-strong !default;
      $strong-weight: $weight-bold !default;

      html {
        background-color: $body-background-color;
        font-size: $body-size;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        min-width: 300px;
        overflow-x: hidden;
        overflow-y: scroll;
        text-rendering: $body-rendering;
        text-size-adjust: 100%;
      }

      article,
      aside,
      figure,
      footer,
      header,
      hgroup,
      section {
        display: block;
      }

      body,
      button,
      input,
      select,
      textarea {
        font-family: $body-family;
      }

      code,
      pre {
        -moz-osx-font-smoothing: auto;
        -webkit-font-smoothing: auto;
        font-family: $code-family;
      }

      body {
        color: $body-color;
        font-size: 1rem;
        font-weight: $body-weight;
        line-height: $body-line-height;
      }

      // Inline

      a {
        color: $link;
        cursor: pointer;
        text-decoration: none;
        strong {
          color: currentColor;
        }
        &:hover {
          color: $link-hover;
        }
      }

      code {
        background-color: $code-background;
        color: $code;
        font-size: $code-size;
        font-weight: $code-weight;
        padding: $code-padding;
      }

      hr {
        background-color: $hr-background-color;
        border: none;
        display: block;
        height: $hr-height;
        margin: $hr-margin;
      }

      img {
        height: auto;
        max-width: 100%;
      }

      input[type="checkbox"],
      input[type="radio"] {
        vertical-align: baseline;
      }

      small {
        font-size: 0.875em;
      }

      span {
        font-style: inherit;
        font-weight: inherit;
      }

      strong {
        color: $strong-color;
        font-weight: $strong-weight;
      }

      // Block

      fieldset {
        border: none;
      }

      pre {
        + overflow-touch {
          background-color: $pre-background;
          color: $pre;
          font-size: 0.875em;
          overflow-x: auto;
          padding: 1.25rem 1.5rem;
          white-space: pre;
          word-wrap: normal;
        }
        code {
          background-color: transparent;
          color: currentColor;
          font-size: 1em;
          padding: 0;
        }
      }

      table td,
      th {
        text-align: left;
        vertical-align: top;
      }
      th {
        color: $text-strong;
      }

      // ** Helpers ** //
      // Float

.is-clearfix
{
  +clearfix;
}

.is-pulled-left
{
  float: left !important;
}

.is-pulled-right {
  float: right !important;
}

// Overflow

.is-clipped
{
  overflow: hidden !important;
}

// Overlay

.is-overlay
{
  @extend %overlay;
}

// Typography

@mixin typography-size($target:'') {
  @each $size in $sizes {
    $i: index($sizes, $size);
    .is-size-#{$i}#{if($target == '', '', '-' + $target)}
      font-size: $size !important;
  }
}

+typography-size()

mobile {
  +typography-size('mobile')
}

+tablet
  +typography-size('tablet')

+touch
  +typography-size('touch')

+desktop
  +typography-size('desktop')

+widescreen
  +typography-size('widescreen')

+fullhd
  +typography-size('fullhd')

$alignments: ('centered': 'center', 'justified': 'justify', 'left': 'left', 'right': 'right')

@each $alignment, $text-align in $alignments
  .has-text-#{$alignment}
    text-align: #{$text-align} !important

@each $alignment, $text-align in $alignments
  +mobile
    .has-text-#{$alignment}-mobile
      text-align: #{$text-align} !important
  +tablet
    .has-text-#{$alignment}-tablet
      text-align: #{$text-align} !important
  +tablet-only
    .has-text-#{$alignment}-tablet-only
      text-align: #{$text-align} !important
  +touch
    .has-text-#{$alignment}-touch
      text-align: #{$text-align} !important
  +desktop
    .has-text-#{$alignment}-desktop
      text-align: #{$text-align} !important
  +desktop-only
    .has-text-#{$alignment}-desktop-only
      text-align: #{$text-align} !important
  +widescreen
    .has-text-#{$alignment}-widescreen
      text-align: #{$text-align} !important
  +widescreen-only
    .has-text-#{$alignment}-widescreen-only
      text-align: #{$text-align} !important
  +fullhd
    .has-text-#{$alignment}-fullhd
      text-align: #{$text-align} !important

.is-capitalized
  text-transform: capitalize !important

.is-lowercase
  text-transform: lowercase !important

.is-uppercase
  text-transform: uppercase !important

.is-italic
  font-style: italic !important

@each $name, $pair in $colors
  $color: nth($pair, 1)
  .has-text-#{$name}
    color: $color !important
  a.has-text-#{$name}
    &:hover,
    &:focus
      color: darken($color, 10%) !important
  .has-background-#{$name}
    background-color: $color !important

@each $name, $shade in $shades
  .has-text-#{$name}
    color: $shade !important
  .has-background-#{$name}
    background-color: $shade !important

.has-text-weight-light
  font-weight: $weight-light !important
.has-text-weight-normal
  font-weight: $weight-normal !important
.has-text-weight-semibold
  font-weight: $weight-semibold !important
.has-text-weight-bold
  font-weight: $weight-bold !important

.is-family-primary
  font-family: $family-primary !important

.is-family-secondary
  font-family: $family-secondary !important

.is-family-sans-serif
  font-family: $family-sans-serif !important

.is-family-monospace
  font-family: $family-monospace !important

.is-family-code
  font-family: $family-code !important

// Visibility

$displays: 'block' 'flex' 'inline' 'inline-block' 'inline-flex'

@each $display in $displays
  .is-#{$display}
    display: #{$display} !important
  +mobile
    .is-#{$display}-mobile
      display: #{$display} !important
  +tablet
    .is-#{$display}-tablet
      display: #{$display} !important
  +tablet-only
    .is-#{$display}-tablet-only
      display: #{$display} !important
  +touch
    .is-#{$display}-touch
      display: #{$display} !important
  +desktop
    .is-#{$display}-desktop
      display: #{$display} !important
  +desktop-only
    .is-#{$display}-desktop-only
      display: #{$display} !important
  +widescreen
    .is-#{$display}-widescreen
      display: #{$display} !important
  +widescreen-only
    .is-#{$display}-widescreen-only
      display: #{$display} !important
  +fullhd
    .is-#{$display}-fullhd
      display: #{$display} !important

.is-hidden
  display: none !important

.is-sr-only
  border: none !important
  clip: rect(0, 0, 0, 0) !important
  height: 0.01em !important
  overflow: hidden !important
  padding: 0 !important
  position: absolute !important
  white-space: nowrap !important
  width: 0.01em !important

+mobile
  .is-hidden-mobile
    display: none !important

+tablet
  .is-hidden-tablet
    display: none !important

+tablet-only
  .is-hidden-tablet-only
    display: none !important

+touch
  .is-hidden-touch
    display: none !important

+desktop
  .is-hidden-desktop
    display: none !important

+desktop-only
  .is-hidden-desktop-only
    display: none !important

+widescreen
  .is-hidden-widescreen
    display: none !important

+widescreen-only
  .is-hidden-widescreen-only
    display: none !important

+fullhd
  .is-hidden-fullhd
    display: none !important

.is-invisible
  visibility: hidden !important

+mobile
  .is-invisible-mobile
    visibility: hidden !important

+tablet
  .is-invisible-tablet
    visibility: hidden !important

+tablet-only
  .is-invisible-tablet-only
    visibility: hidden !important

+touch
  .is-invisible-touch
    visibility: hidden !important

+desktop
  .is-invisible-desktop
    visibility: hidden !important

+desktop-only
  .is-invisible-desktop-only
    visibility: hidden !important

+widescreen
  .is-invisible-widescreen
    visibility: hidden !important

+widescreen-only
  .is-invisible-widescreen-only
    visibility: hidden !important

+fullhd
  .is-invisible-fullhd
    visibility: hidden !important

// Other

.is-marginless
  margin: 0 !important

.is-paddingless
  padding: 0 !important

.is-radiusless
  border-radius: 0 !important

.is-shadowless
  box-shadow: none !important

.is-unselectable
  @extend %unselectable

    `}
  </style>
);

export default Bulma;
