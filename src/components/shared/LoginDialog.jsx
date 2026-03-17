import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useGoogleAuth, loginWithEmailPassword, signUpWithEmailPassword } from "../../services/authApi";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LoginDialog = ({ open, onClose, onLoginSuccess}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = useGoogleAuth({
    onSuccess: () => {
      onClose();
      onLoginSuccess?.();
      toast.success("Login successfully!");
    }
  });

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    
    setLoading(true);
    const result = await loginWithEmailPassword(email, password);
    setLoading(false);
    
    if (result.success) {
      onClose();
      onLoginSuccess?.();
      toast.success("Login successfully!");
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    const result = await signUpWithEmailPassword(email, password, name);
    setLoading(false);
    
    if (result.success) {
      onClose();
      onLoginSuccess?.();
      toast.success("Account created successfully!");
    } else {
      toast.error(result.error || "Sign up failed");
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-94">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Create an account" : "Login to your account"}</DialogTitle>
          <DialogDescription>
            {isSignUp 
              ? "Sign up to unlock AI itineraries and save your plans."
              : "Log in to unlock AI itineraries and save your plans. Sync your travel schedules across all your devices."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={isSignUp ? handleSignUp : handleEmailLogin} className="flex flex-col gap-6">
            {isSignUp && (
              <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
              </div>
            )}
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {!isSignUp && (
                      <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                          Forgot your password?
                      </a>
                    )}
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <DialogFooter className="grid grid-cols-1 gap-3 mt-3">
              <Button type="submit" className="w-full rounded-md" disabled={loading}>
                    {loading ? (isSignUp ? "Creating account..." : "Logging in...") : (isSignUp ? "Sign Up" : "Login")}
              </Button>  
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button type="button" onClick={handleGoogleLogin} className="w-full rounded-md flex items-center gap-2">
                <FaGoogle /> Login with Google
              </Button>
            </DialogFooter>
        </form>
        <div className="text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="underline underline-offset-4 hover:text-primary"
          >
            {isSignUp ? "Login" : "Sign up"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;