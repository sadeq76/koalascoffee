export default {
  screenSize(state) {
    return {
      xsOnly: state.size.xs,
      smOnly: state.size.sm,
      smAndDown: (state.size.xs || state.size.sm) && !(state.size.md || state.size.lg || state.size.xl),
      smAndUp: !state.size.xs && (state.size.sm || state.size.md || state.size.lg || state.size.xl),
      mdOnly: state.size.md,
      mdAndDown: (state.size.xs || state.size.sm || state.size.md) && !(state.size.lg || state.size.xl),
      mdAndUp: !(state.size.xs || state.size.sm) && (state.size.md || state.size.lg || state.size.xl),
      lgOnly: state.size.lg,
      lgAndDown: (state.size.xs || state.size.sm || state.size.md || state.size.lg) && !state.size.xl,
      lgAndUp: !(state.size.xs || state.size.sm || state.size.md) && (state.size.lg || state.size.xl), 
      xlOnly: state.size.xl,
    };
  },
};
