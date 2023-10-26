import { MantineThemeOverride } from "@mantine/core";

export default {
  colors: {
    victoria: [],
  },
  primaryColor: "victoria",
  components: {
    Modal: {
      styles: (theme) => ({
        title: {
          fontSize: theme.fontSizes.lg,
          fontWeight: 700,
        },
      }),
    },
  },
} as MantineThemeOverride;
