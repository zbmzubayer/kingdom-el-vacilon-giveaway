import { loginDto, type LoginDto } from "@/validations/auth.dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { setAuthToken } from "@/lib/auth-token.util";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginDto),
    defaultValues: { password: "" },
  });

  const { mutateAsync } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Logged in successfully", { description: "Welcome back!" });
      setAuthToken(data.data.token);
      setIsAuthenticated(true);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Login failed", {
        description: error.message || "Something went wrong",
      });
    },
  });

  const onSubmit = async (values: LoginDto) => {
    console.log(values);
    await mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
