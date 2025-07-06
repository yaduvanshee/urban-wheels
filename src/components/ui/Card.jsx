import '../styles/Card.css'
const Card = ({ 
  children, 
  title, 
  className = '', 
  titleClassName = '', 
  bodyClassName = '' 
}) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className={`card-header ${titleClassName}`}>
          <h3>{title}</h3>
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;