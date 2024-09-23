const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
  

  export default Button;