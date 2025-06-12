let allowNavigationReset = false;

export const setAllowNavigationReset = (value: boolean) => {
    allowNavigationReset = value;
};

export const getAllowNavigationReset = () => {
    return allowNavigationReset;
};