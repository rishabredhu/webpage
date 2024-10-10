"use client"; // Ensure this is a client component

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Define FormData type to match your schema
type FormData = {
  subject?: string;
  name: string;
  email: string;
  message: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string(),
  message: yup.string().required("Message is required"),
});

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log("Email sent successfully");
      } else {
        // Handle error
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <section className="contact bg-gray-100 py-20" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1">
                Subject (Optional)
              </label>
              <Input id="subject" type="text" {...register("subject")} />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                className="w-full p-2 border rounded"
                rows={4}
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
          <div className="contact-info">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:rishabredhu@gmail.com"
                className="text-blue-600 hover:underline"
              >
                rishabredhu@gmail.com
              </a>
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <div className="social-links mt-4">
              <h4 className="text-lg font-semibold mb-2">Connect with me:</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/rishabredhu"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rishabredhu"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com/rishabredhu"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
