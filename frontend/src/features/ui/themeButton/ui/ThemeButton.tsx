import React, { useEffect } from "react";

import styles from './ThemeButton.module.scss';

import { ThemeButtonProps } from "./ThemeButton.props";

import { IconButton } from "@mui/material";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import clsx from "clsx";

import { Themes } from "@shared/types";
import { useTheme } from "@entities/theme";

export const ThemeButton: React.FC<ThemeButtonProps> = ({hover, disableRipple, size}) => {
    const { theme, toggle, setTheme } = useTheme();

    const themeIcons = {
        light: <LightModeIcon />,
        dark: <DarkModeIcon />,
    };

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme(Themes.LIGHT);
        } else {
            setTheme(Themes.DARK);
        }
    }, []);

    return <IconButton
        onClick={toggle}
        className={clsx({
            [styles.hover]: hover,
        })}

        disableRipple={disableRipple}
        size={size}
        >
        {themeIcons[theme]}
    </IconButton>
}