import { motion } from 'framer-motion';
import { FaUserMd, FaUser, FaPills } from 'react-icons/fa';
import './RegistrationForm.css';

function RegistrationForm({ fields, formData, setFormData, handleSubmit, userType }) {
  const icons = {
    doctor: FaUserMd,
    patient: FaUser,
    pharmacist: FaPills
  };

  const Icon = icons[userType];

  return (
    <motion.div 
      className="registration-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="registration-icon" />
      <form onSubmit={handleSubmit} className="registration-form">
        {fields.map((field) => (
          <motion.div 
            key={field.name}
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                value={formData[field.name]}
                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                required
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                value={formData[field.name]}
                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                required
              />
            )}
          </motion.div>
        ))}
        <motion.button 
          type="submit"
          className="btn register-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default RegistrationForm;