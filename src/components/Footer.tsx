export default function Footer() {
  return (
    <footer className="bg-primary py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="font-display text-lg font-bold text-primary-foreground">
              White Wolf <span className="text-ice">Shepherds</span>
            </span>
            <p className="mt-1 text-sm text-primary-foreground/50">
              Premium White German Shepherd Bloodlines
            </p>
          </div>
          <div className="flex gap-8 text-sm text-primary-foreground/50">
            <a href="#about" className="hover:text-primary-foreground transition-colors">
              About
            </a>
            <a href="#puppies" className="hover:text-primary-foreground transition-colors">
              Puppies
            </a>
            <a href="#gallery" className="hover:text-primary-foreground transition-colors">
              Gallery
            </a>
            <a href="#contact" className="hover:text-primary-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/30">
          © {new Date().getFullYear()} White Wolf Shepherds. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
