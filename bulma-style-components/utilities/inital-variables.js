const InitalVariables = () => (
  <style jsx global>{`
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
    $family-sans-serif: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
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
  `}</style>
);

export default InitalVariables;
