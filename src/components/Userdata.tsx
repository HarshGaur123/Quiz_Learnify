


"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/quiz/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Form submitted successfully");
        setSubmitted(true);
        router.push(result.redirectTo);
        localStorage.setItem("userEmail", data.email);
      } else {
        setErrorMessage(result.message || "Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex  md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6 flex-col-reverse">
      {/* Left Side - Image & Quote */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex flex-col items-center text-center space-y-4 p-6"
      >
        <Image 
          src="/LearnifyReal.jpg" 
          alt= "Image" 
          width={400} 
          height={300} 
          className="rounded-lg shadow-xl"
        />
        <p className="mt-4 text-lg font-semibold text-gray-700 italic leading-relaxed max-w-md">
          "The only way to do great work is to love what you do."  
          <span className="block text-purple-600 font-bold">– Steve Jobs</span>
        </p>
      </motion.div>

      {/* Right Side - Contact Form */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 bg-white shadow-xl rounded-2xl border border-gray-200 p-10 max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Get in Touch
        </h2>
        
        {submitted ? (
          <p className="text-green-600 text-center font-medium text-lg">
            ✅ Form submitted successfully! Redirecting to quiz...
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 text-gray-900"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 text-gray-900"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be exactly 10 digits",
                  },
                })}
                type="tel"
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 text-gray-900"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg text-lg"
            >
              Submit
            </motion.button>

            {errorMessage && <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>}
          </form>
        )}
      </motion.div>
    </div>
  );
}
