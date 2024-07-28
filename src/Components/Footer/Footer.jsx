import React from "react";
import { Box, Typography, Link, Container, styled } from "@mui/material";

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3, 2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "center",
}));

const PassionText = styled('span')(({ theme }) => ({
  color: theme.palette.warning.main,  
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Created With "}
          <PassionText>passion 🔥 </PassionText>
          {" by "}
          <Link
            style={{ color: "blue" }}
            href="https://www.linkedin.com/in/sanjanasharma14/"
            target="_blank"
          >
            Sanjana Sharma
          </Link>
          {" © "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
