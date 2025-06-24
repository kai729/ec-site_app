// src/components/ThemeToggleButton.tsx
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type Props = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeToggleButton = ({ isDarkMode, toggleDarkMode }: Props) => {
  return (
    <Tooltip title={isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"}>
      <IconButton color="inherit" onClick={toggleDarkMode}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
