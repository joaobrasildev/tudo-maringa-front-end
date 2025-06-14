import Typography from '@mui/material/Typography';
import { FooterContainer } from './footer.style';

const Footer = () => {
  return (
    <FooterContainer as="footer">
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Minha Aplicação
      </Typography>
    </FooterContainer>
  );
};

export default Footer;