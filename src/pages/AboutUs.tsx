export default function AboutUs() {
  return (
    <div className="bg-[#2e0249] text-white font-sans min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between py-4 px-6 bg-[#2e0249] border-b border-white">
        <div className="flex space-x-8 text-white font-medium text-sm md:text-base">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="underline">About us</a>
          <a href="/breakbus" className="hover:underline">Break Bus</a>
          <a href="/studentstorage" className="hover:underline">Student Storage</a>
        </div>
        <img src="/images/insurespectre-logo.png" alt="InsureSpectre Logo" className="h-10 md:h-12" />
      </header>

      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To empower students—especially international ones—by simplifying their journey with smart, trusted, and accessible
              solutions for insurance, banking, housing, and more. We are committed to creating a platform that not only solves problems
              but truly understands them.
            </p>
          </section>

          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">How We Started</h2>
            <p className="text-lg leading-relaxed">
              InsureSpectre was born out of personal frustration. As international students ourselves, we spent hours figuring out insurance,
              mobile plans, and housing—all while balancing school, jobs, and cultural transitions. What started as a simple shared spreadsheet
              evolved into a data-powered platform that now serves students across multiple universities.
            </p>
          </section>

          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Challenges We Faced</h2>
            <p className="text-lg leading-relaxed">
              From decoding complex insurance documents to comparing hidden fees across service providers, the path was never smooth.
              Lack of centralized information, limited guidance, and misleading third-party websites often added to the confusion.
              But these roadblocks became our building blocks. Each challenge helped shape a feature on InsureSpectre.
            </p>
          </section>

          <section className="bg-[#2e0249] rounded-xl p-8 shadow-lg text-left">
            <h2 className="text-3xl font-bold mb-6 text-center">What Students Said That Inspired Us</h2>
            <div className="border-l-4 border-white pl-6 italic mb-6">
              “I almost gave up after getting rejected for a basic mobile SIM. This platform not only helped me get one but explained why the rejection happened.”
            </div>
            <div className="border-l-4 border-white pl-6 italic mb-6">
              “Your onboarding checklist was my lifeline. I had no idea where to start as a new student. I’m so grateful.”
            </div>
            <div className="border-l-4 border-white pl-6 italic">
              “I saved over $250 on insurance because of your recommendations. I didn't even know students had other options.”
            </div>
          </section>
        </div>
      </div>

      <footer className="bg-[#f4f4f4] text-[#2e0249] py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 items-start">
          <div>
            <h3 className="font-bold text-lg mb-2">InsureSpectre</h3>
            <p>Empowering student success</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><a href="/faqs" className="underline">FAQs</a></li>
              <li><a href="/contact" className="underline">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Company</h3>
            <ul className="space-y-1">
              <li><a href="/about" className="underline">About Us</a></li>
            </ul>
          </div>
          <div className="flex space-x-4 items-center justify-center md:justify-end">
            <a href="https://instagram.com" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5a4.25 4.25 0 0 1-4.25-4.25v-8.5A4.25 4.25 0 0 1 7.75 3.5ZM17 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm0 1.5a2 2 0 1 1 0 4a2 2 0 0 1 0-4Z" />
              </svg>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.11 2.48 2.5zM0 8h5v15H0V8zm7.53 0h4.73v2.21h.07c.66-1.24 2.28-2.53 4.7-2.53 5.02 0 5.95 3.31 5.95 7.61V23H17v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.53 1.72-2.53 3.5V23H7.53V8z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-8">© 2025 InsureSpectre. All rights reserved.</div>
      </footer>
    </div>
  );
}
