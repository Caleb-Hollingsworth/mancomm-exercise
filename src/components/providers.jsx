import { ThemeProvider } from "@mui/material";
import { theme } from "./ui/theme";


const Providers = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default Providers;