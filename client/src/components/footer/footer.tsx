import './style.css';

function Footer() {
  return (
    <div
      className="footer"
    >
      <div style={{
        display: 'flex',
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        color: '#fff',
      }}
      >
        <div
          className="footerCont"
        >
          <ol>
            <h1>Used cars by brand</h1>
            Link
            <li>Toyota Cars</li>
            <li>Nissan Cars</li>
            <li>Ford Cars</li>
            <li>BMW Cors</li>
          </ol>
          <ol>
            <h1>Used cars by Type</h1>
            <li>Toyota Cars </li>
            <li>Nissan Cars </li>
            <li>Ford Cars </li>
            <li>BMW Cors </li>
          </ol>
          <ol>
            <h1>Used Cars by Year</h1>
            <li>2020</li>
            <li>2019</li>
            <li>2018</li>
            <li>2017</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
export default Footer;
