import { loginSchema } from "@/schemas/loginFormSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { FieldDescription } from "@/components/ui/field";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

type LoginValues = z.infer<typeof loginSchema>;

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    // Call your login API here
    console.log("Login payload:", values);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">This is your email address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">This is your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <span className="font-semibold underline-offset-4 hover:underline dark:text-primary-foreground">
                  <Link to="/register">Register now</Link>
                </span>
              </FieldDescription>

              <Button className="w-full hover:cursor-pointer" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

   
    </div>
  );
};

export default LoginForm;
