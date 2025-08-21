import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="bg-white/20 px-6 py-2 rounded-lg">
              <span className="text-xl font-black tracking-wide">reelo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-primary"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 85%)'
          }}
        />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="text-white space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                    Grow With Reelo!
                  </h1>
                  <p className="text-xl md:text-2xl font-medium opacity-95">
                    Be a Part of Building Something Great!
                  </p>
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3 font-semibold"
                    >
                      Join Our Team
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Content - Team Photo */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src="/lovable-uploads/05e482be-a482-430a-b812-a23ad23b624e.png"
                    alt="Reelo team members - diverse group of young professionals smiling together"
                    className="w-full max-w-lg rounded-2xl shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary-foreground/30 rounded-full blur-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Gallery */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Our Workspace
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Placeholder office images */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div 
                  key={index}
                  className="aspect-square bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-primary/60 group-hover:text-primary/80 transition-colors duration-300">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Grow With Us?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our innovative team and be part of building the future. 
              We're always looking for talented individuals who share our passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                View Open Positions
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary font-semibold"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="bg-primary/20 px-4 py-2 rounded-lg inline-block mb-4">
                  <span className="text-lg font-black text-primary">reelo</span>
                </div>
                <p className="text-background/70">
                  Building innovative solutions for tomorrow's challenges.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-background/70">
                  <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">News</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-background/70">
                  <li><a href="#" className="hover:text-primary transition-colors">Solutions</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Services</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-background/70">
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
              <p>&copy; 2024 Reelo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
