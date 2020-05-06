const bp = {
  xs: 1,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1300,
};

const mediaQueries = {
  xs: `(min-width: ${bp.xs}px) and (max-width: ${bp.sm - 1}px)`,
  sm: `(min-width: ${bp.sm}px) and (max-width: ${bp.md - 1}px)`,
  md: `(min-width: ${bp.md}px) and (max-width: ${bp.lg - 1}px)`,
  lg: `(min-width: ${bp.lg}px) and (max-width: ${bp.xl - 1}px)`,
  xl: `(min-width: ${bp.xl}px)`,
};

// const mediaQueries = {
//   xs: `(max-width: ${bp.sm - 1}px)`,
//   sm: `(max-width: ${bp.md - 1}px)`,
//   md: `(max-width: ${bp.lg - 1}px)`,
//   lg: `(max-width: ${bp.xl - 1}px)`,
//   xl: `(min-width: ${bp.xl}px)`,
// };

export { bp, mediaQueries };
