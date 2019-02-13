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

      // ** Animations ** //
      @keyframes spinAround {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(359deg);
        }
      }

      // ** Mixins ** //
      @mixin clearfix {
        &::after {
          clear: both;
          content: " ";
          display: table;
        }
      }

      @mixin center($width, $height: 0) {
        position: absolute;
        @if $height != 0 {
          left: calc(50% - (#{$width} / 2));
          top: calc(50% - (#{$height} / 2));
        } @else {
          left: calc(50% - (#{$width} / 2));
          top: calc(50% - (#{$width} / 2));
        }
      }

      @mixin fa($size, $dimensions) {
        display: inline-block;
        font-size: $size;
        height: $dimensions;
        line-height: $dimensions;
        text-align: center;
        vertical-align: top;
        width: $dimensions;
      }

      @mixin hamburger($dimensions) {
        cursor: pointer;
        display: block;
        height: $dimensions;
        position: relative;
        width: $dimensions;
        span {
          background-color: currentColor;
          display: block;
          height: 1px;
          left: calc(50% - 8px);
          position: absolute;
          transform-origin: center;
          transition-duration: $speed;
          transition-property: background-color, opacity, transform;
          transition-timing-function: $easing;
          width: 16px;
          &:nth-child(1) {
            top: calc(50% - 6px);
          }
          &:nth-child(2) {
            top: calc(50% - 1px);
          }
          &:nth-child(3) {
            top: calc(50% + 4px);
          }
        }
        &:hover {
          background-color: rgba(black, 0.05);
        }
        // Modifers
        &.is-active {
          span {
            &:nth-child(1) {
              transform: translateY(5px) rotate(45deg);
            }
            &:nth-child(2) {
              opacity: 0;
            }
            &:nth-child(3) {
              transform: translateY(-5px) rotate(-45deg);
            }
          }
        }
      }

      @mixin overflow-touch {
        -webkit-overflow-scrolling: touch;
      }

      @mixin placeholder {
        $placeholders: ":-moz" ":-webkit-input" "-moz" "-ms-input";
        @each $placeholder in $placeholders {
          &:#{$placeholder}-placeholder {
            @content;
          }
        }
      }

      @mixin from($device) {
        @media screen and (min-width: $device) {
          @content;
        }
      }

      @mixin until($device) {
        @media screen and (max-width: $device - 1px) {
          @content;
        }
      }

      @mixin mobile {
        @media screen and (max-width: $tablet - 1px) {
          @content;
        }
      }

      @mixin tablet {
        @media screen and (min-width: $tablet), print {
          @content;
        }
      }

      @mixin tablet-only {
        @media screen and (min-width: $tablet) and (max-width: $desktop - 1px) {
          @content;
        }
      }

      @mixin touch {
        @media screen and (max-width: $desktop - 1px) {
          @content;
        }
      }

      @mixin desktop {
        @media screen and (min-width: $desktop) {
          @content;
        }
      }

      @mixin desktop-only {
        @if $widescreen-enabled {
          @media screen and (min-width: $desktop) and (max-width: $widescreen - 1px) {
            @content;
          }
        }
      }

      @mixin until-widescreen {
        @if $widescreen-enabled {
          @media screen and (max-width: $widescreen - 1px) {
            @content;
          }
        }
      }

      @mixin widescreen {
        @if $widescreen-enabled {
          @media screen and (min-width: $widescreen) {
            @content;
          }
        }
      }

      @mixin widescreen-only {
        @if $widescreen-enabled and $fullhd-enabled {
          @media screen and (min-width: $widescreen) and (max-width: $fullhd - 1px) {
            @content;
          }
        }
      }

      @mixin until-fullhd {
        @if $fullhd-enabled {
          @media screen and (max-width: $fullhd - 1px) {
            @content;
          }
        }
      }

      @mixin fullhd {
        @if $fullhd-enabled {
          @media screen and (min-width: $fullhd) {
            @content;
          }
        }
      }
      // Placeholders

      @mixin unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      %unselectable {
        @include unselectable;
      }

      @mixin arrow($color: transparent) {
        border: 3px solid $color;
        border-radius: 2px;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
        height: 0.625em;
        margin-top: -0.4375em;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: rotate(-45deg);
        transform-origin: center;
        width: 0.625em;
      }

      %arrow {
        @include arrow;
      }

      @mixin block {
        &:not(:last-child) {
          margin-bottom: 1.5rem;
        }
      }

      %block {
        @include block;
      }

      @mixin delete {
        @extend %unselectable;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-color: rgba($black, 0.2);
        border: none;
        border-radius: $radius-rounded;
        cursor: pointer;
        pointer-events: auto;
        display: inline-block;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 0;
        height: 20px;
        max-height: 20px;
        max-width: 20px;
        min-height: 20px;
        min-width: 20px;
        outline: none;
        position: relative;
        vertical-align: top;
        width: 20px;
        &::before,
        &::after {
          background-color: $white;
          content: "";
          display: block;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
          transform-origin: center center;
        }
        &::before {
          height: 2px;
          width: 50%;
        }
        &::after {
          height: 50%;
          width: 2px;
        }
        &:hover,
        &:focus {
          background-color: rgba($black, 0.3);
        }
        &:active {
          background-color: rgba($black, 0.4);
        }
        // Sizes
        &.is-small {
          height: 16px;
          max-height: 16px;
          max-width: 16px;
          min-height: 16px;
          min-width: 16px;
          width: 16px;
        }
        &.is-medium {
          height: 24px;
          max-height: 24px;
          max-width: 24px;
          min-height: 24px;
          min-width: 24px;
          width: 24px;
        }
        &.is-large {
          height: 32px;
          max-height: 32px;
          max-width: 32px;
          min-height: 32px;
          min-width: 32px;
          width: 32px;
        }
      }

      @mixin delete {
        @include delete;
      }

      @mixin loader {
        animation: spinAround 500ms infinite linear;
        border: 2px solid $grey-lighter;
        border-radius: $radius-rounded;
        border-right-color: transparent;
        border-top-color: transparent;
        content: "";
        display: block;
        height: 1em;
        position: relative;
        width: 1em;
      }

      @mixin loader {
        @include loader;
      }

      @mixin overlay($offset: 0) {
        bottom: $offset;
        left: $offset;
        position: absolute;
        right: $offset;
        top: $offset;
      }

      %overlay {
        @include overlay;
      }

      // ** Controlls ** //

      $control-radius: $radius !default;
      $control-radius-small: $radius-small !default;

      $control-border-width: 1px !default;

      $control-height: 2.25em !default;
      $control-line-height: 1.5 !default;

      $control-padding-vertical: calc(
        0.375em - #{$control-border-width}
      ) !default;
      $control-padding-horizontal: calc(
        0.625em - #{$control-border-width}
      ) !default;

      @mixin control {
        -moz-appearance: none;
        -webkit-appearance: none;
        align-items: center;
        border: $control-border-width solid transparent;
        border-radius: $control-radius;
        box-shadow: none;
        display: inline-flex;
        font-size: $size-normal;
        height: $control-height;
        justify-content: flex-start;
        line-height: $control-line-height;
        padding-bottom: $control-padding-vertical;
        padding-left: $control-padding-horizontal;
        padding-right: $control-padding-horizontal;
        padding-top: $control-padding-vertical;
        position: relative;
        vertical-align: top;
        // States
        &:focus,
        &.is-focused,
        &:active,
        &.is-active {
          outline: none;
        }
        &[disabled],
        fieldset[disabled] & {
          cursor: not-allowed;
        }
      }

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

      .is-clearfix {
        @include clearfix;
      }

      .is-pulled-left {
        float: left !important;
      }

      .is-pulled-right {
        float: right !important;
      }

      // Overflow

      .is-clipped {
        overflow: hidden !important;
      }

      // Overlay

      .is-overlay {
        @extend %overlay;
      }

      @mixin control {
        -moz-appearance: none;
        -webkit-appearance: none;
        align-items: center;
        border: $control-border-width solid transparent;
        border-radius: $control-radius;
        box-shadow: none;
        display: inline-flex;
        font-size: $size-normal;
        height: $control-height;
        justify-content: flex-start;
        line-height: $control-line-height;
        padding-bottom: $control-padding-vertical;
        padding-left: $control-padding-horizontal;
        padding-right: $control-padding-horizontal;
        padding-top: $control-padding-vertical;
        position: relative;
        vertical-align: top;
        // States
        &:focus,
        &.is-focused,
        &:active,
        &.is-active {
          outline: none;
        }
        &[disabled],
        fieldset[disabled] & {
          cursor: not-allowed;
        }
      }

      @mixin control {
        @include control;
      }

      // The controls sizes use mixins so they can be used at different breakpoints
      @mixin control-small {
        border-radius: $control-radius-small;
        font-size: $size-small;
      }
      @mixin control-medium {
        font-size: $size-medium;
      }
      @mixin control-large {
        font-size: $size-large;
      }

      // ** Box ** //
      $box-color: $text !default;
      $box-background-color: $white !default;
      $box-radius: $radius-large !default;
      $box-shadow: 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1) !default;
      $box-padding: 1.25rem !default;

      $box-link-hover-shadow: 0 2px 3px rgba($black, 0.1), 0 0 0 1px $link !default;
      $box-link-active-shadow: inset 0 1px 2px rgba($black, 0.2),
        0 0 0 1px $link !default;

      .box {
        @extend %block;
        background-color: $box-background-color;
        border-radius: $box-radius;
        box-shadow: $box-shadow;
        color: $box-color;
        display: block;
        padding: $box-padding;
      }

      a.box {
        &:hover,
        &:focus {
          box-shadow: $box-link-hover-shadow;
        }
        &:active {
          box-shadow: $box-link-active-shadow;
        }
      }

      // ** Section ** //
      $section-padding: 3rem 1.5rem !default;
      $section-padding-medium: 9rem 1.5rem !default;
      $section-padding-large: 18rem 1.5rem !default;

      .section {
        padding: $section-padding;
        // Responsiveness
        + desktop {
          // Sizes
          &.is-medium {
            padding: $section-padding-medium;
          }
          &.is-large {
            padding: $section-padding-large;
          }
        }
      }
    `}
  </style>
);

export default Bulma;
