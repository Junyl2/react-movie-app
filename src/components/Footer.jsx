function Footer() {
  return (
    <>
      <footer className="bg-black p-6 text-gray-400 text-sm text-center">
        <div className="mb-2">© {new Date().getFullYear()} JFLIX </div>
        <div className="flex justify-center gap-4 mb-2">
          <a href="#">About</a> | <a href="#">Contact</a> |{' '}
          <a href="#">Terms</a> | <a href=""> 🌐 EN</a>
        </div>
      </footer>
    </>
  );
}
export default Footer;
