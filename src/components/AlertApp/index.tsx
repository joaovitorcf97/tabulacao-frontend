import { motion } from 'framer-motion';
import { MdOutlineError } from 'react-icons/md';
import './styles.css';

function AlertApp() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}

      className="box-alert">
      <div className="header-alert">
        <MdOutlineError size={34} color='#fff' />
      </div>
      <div className="body-alert">
        <p>Erro ao realizar login</p>
        <p>Tente novamente</p>
      </div>
    </motion.div>
  );
}

export { AlertApp };

