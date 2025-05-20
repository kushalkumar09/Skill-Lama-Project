const UploadOptionCard = ({ title, icon , onClick}) => (
  <div className="upload-card" onClick={onClick}>
    <div>
      <h3>{title}</h3>
      <p>Lorem ipsum dolor sit.</p>
    </div>
    <div className="upload-icon">
      <img src={icon} alt="Icon" />
    </div>
  </div>
);

export default UploadOptionCard;
