import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, AppBar } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import * as React from 'react';


function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return children
        ? React.cloneElement(children, {
            elevation: trigger ? 4 : 0,
        })
        : null;
}

ElevationScroll.propTypes = {
    children: PropTypes.element,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};


export default function Header(props) {
    const navigate = useNavigate();

    // map routes to tab index
    const pages = [{ title: 'Home', path: '/' }, { title: 'About', path: '/about' }, { title: 'Contact', path: '/contact' }, { title: 'Editable Table', path: '/editable-table' }];
    return (
        <ElevationScroll {...props}>
            <AppBar position="static">
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page.title}
                            onClick={() => navigate(page.path)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.title}
                        </Button>
                    ))}
                </Box>
            </AppBar>
        </ElevationScroll>
    );
}