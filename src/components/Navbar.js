// components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Product Management
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/manufacturers">
          Manufacturers
        </Button>
        <Button color="inherit" component={Link} to="/price-sum">
          Price Sum
        </Button>
        <Button color="inherit" component={Link} to="/filter-unit">
          Filter by Unit
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
