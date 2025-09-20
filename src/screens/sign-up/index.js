import { registerUser } from "@/actions/authActions";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Link from "next/link";

const SignUp = ({ searchParams }) => {
  const { errorMessage } = searchParams;

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md rounded-xl shadow-md p-8 border border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Register</h1>
        <p className="mb-6 text-gray-600">
          Or{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            login
          </Link>
        </p>

        {errorMessage && (
          <div className="border border-red-500 rounded-lg p-3 bg-red-50 text-center mb-6">
            <span className="text-red-600 text-sm font-medium">
              {errorMessage}
            </span>
          </div>
        )}

        <form className="space-y-5" action={registerUser}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full p-4 rounded-md border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-4 rounded-md border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              minLength={8}
              required
              className="w-full p-4 rounded-md border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
