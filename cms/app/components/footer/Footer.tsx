import Link from "next/link";

export default function Footer() {
  // const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   event.preventDefault();
  //   window.open('https://www.intellier.com/', '_blank');
  // };

  return (
    <footer className="footer-wrapper">
      <p style={{color: "#28A745", marginRight:5}}>RAB HQ</p>
      <p style={{color:'#000'}}>© 2024, Developed By</p>
      <Link target="_blank" href="https://www.intellier.com/" 
      // onClick={handleClick}
      style={{color: "#28A745", marginLeft:5, textDecoration:'none'}}>Intellier Limited</Link>
    </footer>
  );
}
