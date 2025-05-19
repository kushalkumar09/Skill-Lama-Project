const files = [
  { no: 1, name: "THE SIDEPOD S2 EPISODE 15", time: "25 Oct 23 | 09:04" },
  { no: 2, name: "THE SIDEPOD S2 EPISODE 17", time: "27 Oct 23 | 11:08" },
  { no: 3, name: "THE SIDEPOD S2 EPISODE 20", time: "31 Oct 23 | 20:28" },
];

const FileList = () => (
  <div className="file-list">
    <h2>Your Files</h2>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Upload Date & Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => (
          <tr key={file.no}>
            <td>{file.no}</td>
            <td>{file.name}</td>
            <td>{file.time}</td>
            <td>
              <button className="view-btn">View</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FileList;
