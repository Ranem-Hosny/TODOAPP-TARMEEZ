import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import  { useTheme } from "./context/ThemeProvider";
import TOdolistProvider from "./context/TOdolistProvider";
import TOdolist from "./pages/TOdolist";
import ToggleTheme from "./components/ToggleTheme";

function App() {
  const {theme} = useTheme()
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: theme.palette.background.default,
        textAlign: "center",
      }}
    >
      <CssBaseline />
      <TOdolistProvider>
        <ToggleTheme />
        <TOdolist />
      </TOdolistProvider>
    </div>
  );
}

export default App;
