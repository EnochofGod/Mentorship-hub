import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-8 mt-8 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center space-x-3">
          <span className="inline-flex w-10 h-10 bg-white rounded-full items-center justify-center text-indigo-600 font-extrabold text-2xl shadow-md">M</span>
          <span className="font-extrabold text-xl tracking-wide ml-2">MentorMatch</span>
          <span className="text-white/70 ml-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0 items-center">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition-colors" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.092-.646.35-1.088.636-1.339-2.221-.253-4.555-1.111-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.36.309.68.92.68 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a href="mailto:support@mentormatch.com" className="hover:text-yellow-200 transition-colors font-semibold">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
