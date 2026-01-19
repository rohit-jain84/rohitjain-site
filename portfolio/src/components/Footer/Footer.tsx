export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-200">
      <p className="text-center text-sm text-gray-500">
        &copy; {currentYear} Rohit Jain
      </p>
    </footer>
  );
}
