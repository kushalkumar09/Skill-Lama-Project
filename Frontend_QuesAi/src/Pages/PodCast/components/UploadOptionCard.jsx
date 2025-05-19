const UploadOptionCard = ({ title, icon , openModal}) => (
  <div className="upload-card" onClick={openModal}>
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
