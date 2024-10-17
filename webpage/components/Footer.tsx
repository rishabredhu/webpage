import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white-100 dark:bg-white-800 py-4">
      <div className="container mx-auto px-2">
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/rishabredhu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:text-gray-600" />
          </a>
          <a
            href="https://linkedin.com/in/rishabredhuu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-blue-600" />
          </a>
          <a
            href="https://twitter.com/r3dhuu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-blue-400" />
          </a>
          <a
            href="mailto:rishabredhu@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="text-2xl hover:text-gray-600" />
          </a>
        </div>
        <p className="text-center mt-2">
          © 2024 Rishab Singh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
