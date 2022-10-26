import { motion } from 'framer-motion';
import { FiXCircle } from 'react-icons/fi';
import { MdOutlineError } from 'react-icons/md';
import './styles.css';

function AlertApp({ text, body, click }: any) {
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
        <p>{text}</p>
        <p>{body}</p>
      </div>
      <div className="button-alert">
        <button onClick={click}>
          <FiXCircle size={20} color="#ffffff" />
        </button>
      </div>
    </motion.div>
  );
}

export { AlertApp };

