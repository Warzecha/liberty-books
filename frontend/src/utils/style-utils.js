export const getThemeColorForKey = (theme, key) => {
    switch (key) {
        case 'primary': {
            return theme.palette.primary.main;
        }
        case 'textPrimary': {
            return theme.palette.text.primary;
        }
        case 'textSecondary': {
            return theme.palette.text.secondary;
        }
        default: {
            return null;
        }
    }
};
