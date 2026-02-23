import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // abhi sirf demo login
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // later yahan backend API connect karenge
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Log in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right text-sm text-green-600 hover:underline cursor-pointer">
            Forgot your password?
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Log in
          </button>

        </form>

        <div className="my-6 text-center text-gray-400 text-sm">or</div>

        <button className="w-full bg-black text-white py-2 rounded-md mb-3">
          Sign in with Apple
        </button>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md">
          Continue with Facebook
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          New here?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

